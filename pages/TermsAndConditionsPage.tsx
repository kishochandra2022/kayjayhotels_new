

import * as React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Helmet } from 'react-helmet-async'; // Import Helmet

const TermsAndConditionsPage: React.FC = () => {
  const pageTitle = "Terms & Conditions | Kayjay Hotels";
  const pageDescription = "Read the terms and conditions for booking and staying at Kayjay Hotels properties. Information on reservations, cancellations, and policies.";
  const canonicalUrl = `${window.location.origin}/#/terms-and-conditions`;
  const imageUrl = `${window.location.origin}/public/images/kayjay-amorea/hero.jpg`; // Generic image

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
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Kayjay Hotels" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(pageSchema)}
        </script>
      </Helmet>
      <div className="bg-brand-gray py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto bg-brand-light p-10 rounded-xl shadow-md">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">Terms & Conditions</h1>
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

                <p>Please read these Terms and Conditions carefully before making a booking with Kayjay Hotels. Your booking is a contract, and these terms outline our policies and your obligations.</p>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">1. Bookings and Reservations</h2>
                <p>All bookings made through our website are considered inquiries. A booking is not confirmed until you have been contacted by one of our customer care agents and have received a formal booking confirmation. All accommodations are subject to availability.</p>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">2. Pricing and Payment</h2>
                <p>Prices for rooms will be quoted by our reservations team upon inquiry. The final price may include applicable taxes and service charges. Payment policies, including deposit requirements, will be communicated to you by our agent during the confirmation process.</p>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">3. Cancellation Policy</h2>
                <p>Our cancellation policy will be provided to you at the time of booking. Policies may vary depending on the rate, season, and property. Failure to arrive at the hotel on the scheduled date without prior notice will be considered a "No Show" and may result in the cancellation of your entire reservation and the forfeiture of any deposit paid.</p>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">4. Check-in and Check-out</h2>
                <ul className="list-disc list-inside pl-4 mt-2">
                  <li>Standard check-in time is 2:00 PM.</li>
                  <li>Standard check-out time is 12:00 PM (noon).</li>
                  <li>Early check-in or late check-out requests are subject to availability and may incur additional charges.</li>
                  <li>A valid government-issued photo identification may be required at check-in.</li>
                </ul>

                <h2 className="text-xl font-serif font-bold text-brand-dark pt-4">5. Guest Conduct</h2>
                <p>Guests are expected to conduct themselves in an orderly and acceptable manner and not to disrupt the enjoyment of other guests. We reserve the right to immediately terminate the</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;