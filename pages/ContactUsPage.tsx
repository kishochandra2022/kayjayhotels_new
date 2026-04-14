
import * as React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { saveContactSubmission } from '../lib/supabase';
import LocationMap from '../components/LocationMap';
import { Helmet } from 'react-helmet-async'; // Import Helmet

// Add EmailJS type declaration
declare global {
  interface Window {
    emailjs: {
      send: (
        serviceID: string,
        templateID: string,
        templateParams: Record<string, unknown>,
        publicKey: string
      ) => Promise<any>;
    };
  }
}

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = React.useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [errors, setErrors] = React.useState<Partial<typeof formData>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    const { name, email, phone, message } = formData;

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone validation (optional, but validates if filled)
    if (phone.trim() && !/^[+]?[\d\s()-]{7,20}$/.test(phone)) {
        newErrors.phone = 'Please enter a valid phone number format.';
    }

    // Message validation
    if (!message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    } else if (message.trim().length > 1000) {
        newErrors.message = 'Message cannot exceed 1000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setFormStatus('submitting');
    setStatusMessage('Sending your message...');
    setErrors({});

    try {
      // Step 1: Save to Supabase (primary, critical action)
      await saveContactSubmission(formData);

      // Step 2: Send email via EmailJS (secondary notification)
      const serviceID = 'service_bi9iwvb';
      const templateID = 'template_udm68ad';
      const publicKey = 'mT_76Q8nVkBYvW123';
      const templateParams = {
        ...formData,
        time: new Date().toLocaleString(),
      };

      try {
        await window.emailjs.send(serviceID, templateID, templateParams, publicKey);
      } catch (emailError) {
        // Log the email error but don't show a failure message to the user,
        // as the primary data capture was successful.
        console.warn(
          'EmailJS submission failed, but data was saved to Supabase:',
          emailError
        );
      }

      // If we reach here, the Supabase submission was successful.
      setFormStatus('success');
      setStatusMessage(
        'Thank you for your message! We have received it and will get back to you shortly.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Submission failed:', error);
      setFormStatus('error');
      const rawMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      setStatusMessage(`Submission failed: ${rawMessage}`);
    }
  };

  const pageTitle = "Contact Us | Luxury in Every Detail | Kayjay Hotels";
  const pageDescription = "Get in touch with Kayjay Hotels. Find our contact details, office address, and send us an inquiry. We look forward to hearing from you.";
  const canonicalUrl = `${window.location.origin}/#/contact`;
  const imageUrl = `${window.location.origin}/public/images/kayjay-amorea/pool.jpg`; // Generic image

  const corporateOfficeLocation =
    '100E Bopitiya Road, Uswetakeiyawa 11328, Wattala, Sri Lanka';
  
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: pageTitle,
    url: canonicalUrl,
    description: pageDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "100E Bopitiya Road",
      "addressLocality": "Uswetakeiyawa, Wattala",
      "postalCode": "11328",
      "addressCountry": "LK"
    },
    "telephone": "+94742021777",
    "email": "info@kayjayhotels.com"
  };


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
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Kayjay Hotels" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(pageSchema)}
        </script>
      </Helmet>
      <div className="bg-brand-light">
        <div className="container mx-auto px-6 py-20">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">
                Get In Touch
              </h1>
              <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                We're here to help you plan your perfect Sri Lankan getaway.
                Contact us with any questions or for booking assistance.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Contact Info */}
            <AnimatedSection>
              <div className="bg-white p-8 rounded-xl shadow-lg h-full">
                <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">
                  Contact Information
                </h2>
                <address className="not-italic text-gray-700 space-y-6">
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-primary mr-4 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      <strong className="block">Corporate Office</strong>
                      Kay Jay Hotels (Pvt) Ltd.
                      <br />
                      {corporateOfficeLocation}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-primary mr-4 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    <span>
                      <strong className="block">Email</strong>
                      <a
                        href="mailto:info@kayjayhotels.com"
                        className="hover:text-brand-primary transition-colors"
                      >
                        info@kayjayhotels.com
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-primary mr-4 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                    <span>
                      <strong className="block">Phone / WhatsApp</strong>
                      +94 74 20 21 700
                      <br />
                      +94 74 20 21 777
                    </span>
                  </div>
                </address>
              </div>
            </AnimatedSection>
            
            {/* Right Column: Form */}
            <AnimatedSection>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">
                  Send a Message
                </h2>
                {formStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center bg-green-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-green-800">
                      Message Sent!
                    </h3>
                    <p className="mt-2 text-green-700">{statusMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 w-full text-base px-4 py-3 border rounded-xl focus:ring-brand-primary focus:border-brand-primary ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 w-full text-base px-4 py-3 border rounded-xl focus:ring-brand-primary focus:border-brand-primary ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`mt-1 w-full text-base px-4 py-3 border rounded-xl focus:ring-brand-primary focus:border-brand-primary ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                       {errors.phone && (
                        <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subject (Optional)
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-1 w-full text-base px-4 py-3 border border-gray-300 rounded-xl focus:ring-brand-primary focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`mt-1 w-full text-base px-4 py-3 border rounded-xl focus:ring-brand-primary focus:border-brand-primary ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      ></textarea>
                      {errors.message && (
                        <p id="message-error" className="text-red-500 text-xs mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-brand-secondary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {formStatus === 'submitting'
                          ? 'Sending...'
                          : 'Send Message'}
                      </button>
                      {formStatus === 'error' && (
                        <p className="text-red-500 text-sm mt-4 text-center">
                          {statusMessage}
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>

           {/* Full-width Map Section */}
          <AnimatedSection>
            <div className="max-w-6xl mx-auto mt-16">
              <LocationMap 
                  location={corporateOfficeLocation} 
                  hotelName="Kay Jay Hotels Corporate Office"
                  showHeading={true}
                  showButton={true}
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;