

import * as React from 'react';
// FIX: Replaced useLocation with useSearchParams for v6 compatibility.
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { useSearchParams } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { saveInquirySubmission } from '../lib/supabase';
import WhatsAppButton from '../components/WhatsAppButton';
import InquiryDisclaimer from '../components/InquiryDisclaimer';
import { Helmet } from 'react-helmet-async'; // Import Helmet

// Ensure emailjs is typed for window
declare global {
  interface Window {
    emailjs: {
      send: (serviceID: string, templateID: string, templateParams: Record<string, unknown>, publicKey: string) => Promise<any>;
    };
  }
}

const EmailInquiryPage: React.FC = () => {
  // FIX: Replaced useLocation and URLSearchParams with useSearchParams for v6 compatibility.
  const [searchParams] = useSearchParams();
  
  // Use useMemo to parse search params only once
  const inquiryData = React.useMemo(() => {
    return {
      hotelName: searchParams.get('hotelName') || '',
      roomName: searchParams.get('roomName') || '',
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      adults: searchParams.get('adults') || '1',
      children: searchParams.get('children') || '0',
      notes: searchParams.get('notes') || '',
      mealPlan: searchParams.get('mealPlan') || 'RO',
      isCustom: searchParams.get('custom') === 'true',
      name: searchParams.get('name') || '',
      email: searchParams.get('email') || '',
      phone: searchParams.get('phone') || '',
    };
  }, [searchParams]);

  const [formData, setFormData] = React.useState({
    name: inquiryData.name,
    email: inquiryData.email,
    phone: inquiryData.phone,
  });

  const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [errors, setErrors] = React.useState<Partial<typeof formData>>({});
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = React.useState(false);


  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setFormStatus('submitting');
    setStatusMessage('Sending your inquiry...');
    setErrors({});

    try {
        const dbPayload = {
            ...formData,
            hotel_name: inquiryData.hotelName,
            room_name: inquiryData.roomName,
            check_in: inquiryData.checkIn,
            check_out: inquiryData.checkOut,
            adults: parseInt(inquiryData.adults, 10),
            children: parseInt(inquiryData.children, 10),
            meal_plan: inquiryData.mealPlan,
            is_custom_inquiry: inquiryData.isCustom,
            submission_type: 'EMAIL' as const,
        };
        await saveInquirySubmission(dbPayload);

        const serviceID = 'service_bi9iwvb';
        const templateID = 'template_piuerfs';
        const publicKey = 'mT_76Q8nVkBYvW123';
        const emailTemplateParams = {
            ...formData,
            ...inquiryData,
            checkIn: inquiryData.checkIn || 'Not specified',
            checkOut: inquiryData.checkOut || 'Not specified',
            time: new Date().toLocaleString(),
            custom_inquiry_note: inquiryData.isCustom ? 'This is a custom inquiry as the number of guests exceeds the standard room capacity.' : ''
        };

        try {
            await window.emailjs.send(serviceID, templateID, emailTemplateParams, publicKey);
        } catch (emailError) {
            console.warn('EmailJS submission failed, but inquiry was saved to Supabase:', emailError);
        }

        setFormStatus('success');
        setStatusMessage('Thank you for your inquiry! Our team will get back to you shortly.');

    } catch (error) {
        console.error('Submission failed:', error);
        setFormStatus('error');
        const rawMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        setStatusMessage(`Submission failed: ${rawMessage}`);
    }
  };

  const handleWhatsAppInquiry = async () => {
    if (!validateForm()) {
        return;
    }

    const dbPayload = {
        ...formData,
        hotel_name: inquiryData.hotelName,
        room_name: inquiryData.roomName,
        check_in: inquiryData.checkIn,
        check_out: inquiryData.checkOut,
        adults: parseInt(inquiryData.adults, 10),
        children: parseInt(inquiryData.children, 10),
        meal_plan: inquiryData.mealPlan,
        is_custom_inquiry: inquiryData.isCustom,
        submission_type: 'WHATSAPP' as const,
    };

    try {
        await saveInquirySubmission(dbPayload);
    } catch (error) {
        console.warn('Supabase submission failed for WhatsApp inquiry, but proceeding to open WhatsApp:', error);
    }

    const message = generateWhatsAppMessage();
    const phoneNumber = "94742021777";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const generateWhatsAppMessage = () => {
    const customNote = inquiryData.isCustom ? `\n\n(Note: This is a custom inquiry as guest count exceeds standard room capacity.)` : "";

    let message = `*New Inquiry - Kayjay Hotels*

Hello, I would like to inquire about the following booking:

*Property:* ${inquiryData.hotelName}`;

    if (inquiryData.roomName) {
      message += `\n*Room:* ${inquiryData.roomName}`;
    }

    message += `
*Check-in:* ${inquiryData.checkIn || 'Not specified'}
*Check-out:* ${inquiryData.checkOut || 'Not specified'}
*Guests:* ${inquiryData.adults} Adults, ${inquiryData.children} Children`;
    
    if (inquiryData.mealPlan) {
        message += `\n*Meal Plan:* ${inquiryData.mealPlan}`;
    }

    message += `

Please let me know about availability and pricing.${customNote}

*My Details:*
Name: ${formData.name || '...'}
Email: ${formData.email || '...'}
Phone: ${formData.phone || '...'}

Thank you.`;

    return message;
  };

  const inputClasses = "w-full text-base px-4 py-3 border rounded-xl focus:ring-brand-primary focus:border-brand-primary";
  const disabledButtonClasses = "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70";

  const pageTitle = "Booking Inquiry | Luxury in Every Detail | Kayjay Hotels";
  const pageDescription = `Finalize your booking inquiry for ${inquiryData.roomName ? inquiryData.roomName + ' at ' + inquiryData.hotelName : inquiryData.hotelName}. Confirm your details and send the request to our reservations team.`;
  const canonicalUrl = `${window.location.origin}/#/inquire${window.location.search}`; // Keep search params for canonical of inquiry page.


  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${window.location.origin}/public/images/kayjay-amorea/hero.jpg`} />
        <meta property="og:site_name" content="Kayjay Hotels" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={`${window.location.origin}/public/images/kayjay-amorea/hero.jpg`} />
      </Helmet>
      <div className="bg-brand-gray py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto bg-brand-light p-8 md:p-10 rounded-xl shadow-xl">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-2">Confirm Your Inquiry</h1>
              <p className="text-gray-600 mb-8">Please provide your contact information below to send your inquiry to our reservations team.</p>
              
              <div className="bg-brand-gray/50 p-6 rounded-xl mb-8 border border-brand-gray">
                <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">Inquiry Summary</h2>
                {inquiryData.isCustom && (
                   <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-xl">
                        <p className="font-bold">This is a Custom Inquiry</p>
                        <p className="text-sm">Your guest selection exceeds the standard room capacity. Our team will review your request for special arrangements.</p>
                    </div>
                )}
                <div className="space-y-3 text-gray-800">
                  <p><strong>Hotel:</strong> {inquiryData.hotelName}</p>
                  {inquiryData.roomName && <p><strong>Room:</strong> {inquiryData.roomName}</p>}
                  <p><strong>Check-in:</strong> {inquiryData.checkIn || 'Not specified'}</p>
                  <p><strong>Check-out:</strong> {inquiryData.checkOut || 'Not specified'}</p>
                  <p><strong>Guests:</strong> {inquiryData.adults} Adults, {inquiryData.children} Children</p>
                  {inquiryData.mealPlan && <p><strong>Meal Plan:</strong> {inquiryData.mealPlan}</p>}
                </div>
              </div>

              {formStatus === 'success' ? (
                <div className="text-center p-6 bg-green-50 border-l-4 border-green-500 rounded-xl">
                    <h3 className="text-xl font-semibold text-green-800">Inquiry Sent Successfully!</h3>
                    <p className="mt-2 text-green-700">{statusMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} noValidate>
                  <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">Your Contact Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`${inputClasses} ${errors.name ? 'border-red-500' : 'border-gray-300'}`} required />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`${inputClasses} ${errors.email ? 'border-red-500' : 'border-gray-300'}`} required />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`${inputClasses} border-gray-300`} />
                    </div>
                  </div>
                  
                  <InquiryDisclaimer isChecked={isDisclaimerAccepted} onToggle={setIsDisclaimerAccepted} />

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button type="submit" disabled={formStatus === 'submitting' || !isDisclaimerAccepted} className={`w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-brand-secondary transition-all duration-300 flex items-center justify-center ${disabledButtonClasses}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Email Inquiry'}
                    </button>
                     <WhatsAppButton
                        onClick={handleWhatsAppInquiry}
                        disabled={!isDisclaimerAccepted}
                        className={`w-full bg-green-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition-colors duration-300 flex items-center justify-center ${disabledButtonClasses}`}
                    >
                        Send via WhatsApp
                    </WhatsAppButton>
                  </div>
                   {formStatus === 'error' && <p className="text-red-500 text-sm mt-4 text-center">{statusMessage}</p>}
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default EmailInquiryPage;