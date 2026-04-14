

import * as React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Helmet } from 'react-helmet-async'; // Import Helmet

const PrivacyPolicyPage: React.FC = () => {
  const pageTitle = "Privacy Policy | Luxury in Every Detail | Kayjay Hotels";
  const pageDescription = "Read the privacy policy for Kayjay Hotels. We are committed to protecting your personal information and being transparent about the technology we use and what we do with your data.";
  const canonicalUrl = `${window.location.origin}/#/privacy-policy`;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "url": canonicalUrl,
    "description": pageDescription
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
        {/* You might want a specific image for this page if available, otherwise a generic one */}
        <meta property="og:image" content={`${window.location.origin}/public/images/kayjay-amorea/hero.jpg`} /> 
        <meta property="og:site_name" content="Kayjay Hotels" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={`${window.location.origin}/public/images/kayjay-amorea/hero.jpg`} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(pageSchema)}
        </script>
      </Helmet>
      <div className="bg-brand-gray py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto bg-brand-light p-10 rounded-xl shadow-md">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">Privacy Policy</h1>
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">1. Introduction</h2>
                <p>Welcome to Kayjay Hotels ("we", "our", "us"). We are committed to protecting your privacy and handling your personal data in an open and transparent manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">2. Information We Collect</h2>
                <p>We may collect personal information that you voluntarily provide to us when you make a booking inquiry or contact us. This information includes:</p>
                <ul className="list-disc list-inside pl-4 mt-2">
                    <li><strong>Contact Information:</strong> Your name, email address, and phone number.</li>
                    <li><strong>Inquiry Details:</strong> Your desired hotel, room type, check-in/check-out dates, number of guests, chosen meal plan, and any message or subject you provide.</li>
                </ul>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">3. How We Use Your Information</h2>
                <p>We use the information we collect primarily to provide our services to you. Specifically, we use your data to:</p>
                <ul className="list-disc list-inside pl-4 mt-2">
                    <li>Store your inquiry in our secure database for record-keeping and to ensure we have a reliable copy of your request.</li>
                    <li>Respond to your booking inquiries and contact you to confirm availability and finalize your reservation.</li>
                    <li>Communicate with you regarding your stay or any questions you may have.</li>
                    <li>Improve our website and services for a better user experience.</li>
                </ul>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">4. Third-Party Services and Data Processing</h2>
                <p>To operate our website and services, we rely on a few trusted third-party providers. It's important for you to know how they are involved in handling data:</p>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-3">
                    <li>
                        <strong>Supabase:</strong> When you submit a contact or inquiry form, your submission data is stored in our database, which is hosted by Supabase. This serves as our primary record of your inquiry to ensure it is not lost. Supabase is a secure, enterprise-grade platform. You can view their privacy policy on their website.
                    </li>
                    <li>
                        <strong>EmailJS:</strong> To provide our team with timely notifications, we use EmailJS to securely transmit your form data to our reservations team via email. EmailJS acts as a data processor on our behalf.
                    </li>
                    <li>
                        <strong>Google Fonts:</strong> Our website uses Google Fonts to display typography. To serve these fonts, your browser may send requests to Google's servers, which can include your IP address. This is governed by Google's Privacy Policy.
                    </li>
                    <li>
                        <strong>Currency Conversion API:</strong> To provide real-time currency conversion, our website makes requests to a third-party currency data provider. Your IP address may be visible to this service when your browser fetches the latest rates. We do not send any personal information to this service.
                    </li>
                </ul>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">5. Data Security & Retention</h2>
                <p>We are committed to protecting your data. We implement a variety of security measures, including the use of secure platforms like Supabase and enabling Row Level Security on our database tables. We retain your data for as long as necessary to fulfill the services you have requested and for our operational and legal records. However, no method of data transmission can be guaranteed to be 100% secure.</p>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">6. Your Rights</h2>
                <p>You have the right to request access to, correct, or delete your personal information that we hold. If you wish to exercise these rights, please contact us using the information below.</p>
                
                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">7. Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                <p><a href="mailto:info@kayjayhotels.com" className="text-brand-primary hover:underline">info@kayjayhotels.com</a></p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;