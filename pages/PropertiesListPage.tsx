

import * as React from 'react';
import { hotelsData } from '../data/hotels';
import PropertyCard from '../components/PropertyCard';
import AnimatedSection from '../components/AnimatedSection';
import { Helmet } from 'react-helmet-async'; // Import Helmet

const PropertiesListPage: React.FC = () => {
  const pageTitle = "Our Properties | Luxury in Every Detail | Kayjay Hotels";
  const pageDescription = "Explore all properties by Kayjay Hotels and discover luxury in every detail. View our collection of hotels, resorts, and villas in Pasikuda, Wilpattu, and Uswetakeiyawa.";
  const canonicalUrl = `${window.location.origin}/#/properties`;
  const imageUrl = `${window.location.origin}/public/images/kayjay-amorea/hero.jpg`; // Generic image

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "url": canonicalUrl,
    "description": pageDescription,
    "mainEntity": hotelsData.map(hotel => ({
      "@type": "Hotel",
      "name": hotel.name,
      "description": hotel.tagline,
      "url": `${window.location.origin}/#/hotels/${hotel.slug}`,
      "image": `${window.location.origin}${hotel.images[0]}`
    }))
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
      <div className="bg-brand-light py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">Our Properties</h1>
              <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                Discover a collection of unique hotels, each offering a distinct experience of Sri Lanka's diverse beauty.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {hotelsData.map(hotel => (
                <AnimatedSection key={hotel.id}>
                    <PropertyCard hotel={hotel} />
                </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesListPage;