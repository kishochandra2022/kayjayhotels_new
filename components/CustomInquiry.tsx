

import * as React from 'react';
// FIX: Replaced useHistory with useNavigate for v6 compatibility.
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { useNavigate } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import InquiryDisclaimer from './InquiryDisclaimer';
import { saveInquirySubmission } from '../lib/supabase';

// Ensure emailjs is typed for window
declare global {
  interface Window {
    emailjs: {
      send: (serviceID: string, templateID: string, templateParams: Record<string, unknown>, publicKey: string) => Promise<any>;
    };
  }
}

interface CustomInquiryProps {
    hotelName: string;
    checkIn: string;
    checkOut: string;
    adults: string;
    children: string;
}

const CustomInquiry: React.FC<CustomInquiryProps> = ({ hotelName, checkIn, checkOut, adults, children }) => {
    // FIX: Replaced useHistory with useNavigate for v6 compatibility.
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        message: '', // Adding a message field for custom inquiries
    });
    const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = React.useState('');
    const [errors, setErrors] = React.useState<Partial<typeof formData>>({});
    const [isDisclaimerAccepted, setIsDisclaimerAccepted] = React.useState(false);

    const validateForm = () => {
        const newErrors: Partial<Record<keyof typeof formData, string>> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.message.trim()) newErrors.message = 'Please provide details about your inquiry.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setFormStatus('submitting');
        setStatusMessage('Sending your custom inquiry...');
        setErrors({});

        try {
            const dbPayload = {
                ...formData,
                hotel_name: hotelName,
                room_name: 'Custom Inquiry (No suitable rooms found)',
                check_in: checkIn || null,
                check_out: checkOut || null,
                adults: parseInt(adults, 10),
                children: parseInt(children, 10),
                meal_plan: 'N/A', // No specific meal plan for custom inquiry
                is_custom_inquiry: true,
                submission_type: 'EMAIL' as const,
            };
            await saveInquirySubmission(dbPayload);

            // Reusing EmailJS credentials from ContactUsPage and EmailInquiryPage
            const serviceID = 'service_bi9iwvb';
            const templateID = 'template_piuerfs'; // Using general inquiry template
            const publicKey = 'mT_76Q8nVkBYvW123';

            const emailTemplateParams = {
                ...formData,
                hotelName,
                roomName: 'Custom Inquiry (No suitable rooms found)',
                checkIn: checkIn || 'Not specified',
                checkOut: checkOut || 'Not specified',
                adults,
                children,
                mealPlan: 'N/A',
                time: new Date().toLocaleString(),
                custom_inquiry_note: 'This is a custom inquiry as no suitable standard rooms were found or the guest count is outside normal capacity. User message: ' + formData.message,
            };

            try {
                await window.emailjs.send(serviceID, templateID, emailTemplateParams, publicKey);
            } catch (emailError) {
                console.warn('EmailJS submission failed for custom inquiry, but data was saved to Supabase:', emailError);
            }

            setFormStatus('success');
            setStatusMessage('Thank you for your custom inquiry! Our team will get back to you shortly.');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Custom inquiry submission failed:', error);
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
            hotel_name: hotelName,
            room_name: 'Custom Inquiry (No suitable rooms found)',
            check_in: checkIn || null,
            check_out: checkOut || null,
            adults: parseInt(adults, 10),
            children: parseInt(children, 10),
            meal_plan: 'N/A',
            is_custom_inquiry: true,
            submission_type: 'WHATSAPP' as const,
        };

        try {
            await saveInquirySubmission(dbPayload);
        } catch (error) {
            console.warn('Supabase submission failed for WhatsApp custom inquiry, but proceeding to open WhatsApp:', error);
        }

        const message = `*New Custom Inquiry - Kayjay Hotels*

Hello, I would like to send a custom inquiry:

*Property:* ${hotelName}
*Check-in:* ${checkIn || 'Not specified'}
*Check-out:* ${checkOut || 'Not specified'}
*Guests:* ${adults} Adults, ${children} Children
*My Message:* ${formData.message || 'No specific message provided.'}

Please let me know about availability and pricing for custom arrangements.

*My Details:*
Name: ${formData.name || '...'}
Email: ${formData.email || '...'}
Phone: ${formData.phone || '...'}

Thank you.`;

        const phoneNumber = "94742021777";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const inputClasses = "w-full text-base px-4 py-3 border rounded-xl focus:ring-brand-primary focus:border-brand-primary";
    const disabledButtonClasses = "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70";


    return (
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-dashed border-gray-300">
            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4 text-center">No Suitable Rooms Found</h2>
            <p className="text-gray-600 mb-8 text-center max-w-xl mx-auto">
                Based on your selected dates and number of guests ({adults} Adults, {children} Children)
                for {hotelName}, we couldn't find any rooms that perfectly match.
                Please send us a custom inquiry, and our team will personally assist you with special arrangements or alternative options.
            </p>

            {formStatus === 'success' ? (
                <div className="text-center p-6 bg-green-50 border-l-4 border-green-500 rounded-xl">
                    <h3 className="text-xl font-semibold text-green-800">Custom Inquiry Sent Successfully!</h3>
                    <p className="mt-2 text-green-700">{statusMessage}</p>
                </div>
            ) : (
                <form onSubmit={handleEmailSubmit} noValidate>
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">Your Details & Message</h3>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="custom-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" id="custom-name" name="name" value={formData.name} onChange={handleChange} className={`${inputClasses} ${errors.name ? 'border-red-500' : 'border-gray-300'}`} required />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="custom-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" id="custom-email" name="email" value={formData.email} onChange={handleChange} className={`${inputClasses} ${errors.email ? 'border-red-500' : 'border-gray-300'}`} required />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="custom-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                            <input type="tel" id="custom-phone" name="phone" value={formData.phone} onChange={handleChange} className={`${inputClasses} border-gray-300`} />
                        </div>
                        <div>
                            <label htmlFor="custom-message" className="block text-sm font-medium text-gray-700 mb-1">Your Message / Requirements</label>
                            <textarea id="custom-message" name="message" rows={4} value={formData.message} onChange={handleChange} className={`${inputClasses} ${errors.message ? 'border-red-500' : 'border-gray-300'}`} required></textarea>
                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
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
    );
};

export default CustomInquiry;