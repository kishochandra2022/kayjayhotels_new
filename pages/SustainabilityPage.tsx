

import * as React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import LazyImage from '../components/LazyImage';
import { Helmet } from 'react-helmet-async'; // Import Helmet

const SustainabilityPage: React.FC = () => {
  const pageTitle = "Sustainability | Luxury in Every Detail | Kayjay Hotels";
  const pageDescription = "Learn about our commitment to sustainable and responsible tourism. Kayjay Hotels is dedicated to preserving Sri Lanka's natural beauty and supporting local communities.";
  const canonicalUrl = `${window.location.origin}/#/sustainability`;
  const imageUrl = `${window.location.origin}/public/images/kay-jay-palms/garden.jpg`;

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
        {/* Hero Section */}
        <div className="relative bg-brand-dark text-white text-center py-32 px-6">
          <div className="absolute inset-0">
            <LazyImage 
              src="/public/images/kay-jay-palms/garden.jpg" 
              alt="Lush green gardens at a Kayjay Hotel" 
              className="w-full h-full object-cover opacity-30" 
            />
          </div>
          <div className="relative z-10">
            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl font-extrabold font-serif">Our Commitment to Sustainability</h1>
              <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
                Preserving Paradise for Generations to Come
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-12">
            
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">Responsible Tourism, Authentic Experiences</h2>
                <div className="space-y-6">
                    <p>
                        At Kayjay Hotels, we believe that true hospitality goes hand-in-hand with a deep respect for the environment and the local communities that make Sri Lanka so special. Our commitment to sustainability is woven into every aspect of our operations, from the design of our properties to the experiences we offer our guests. We are dedicated to minimizing our ecological footprint while maximizing our positive social impact.
                    </p>
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
                <AnimatedSection>
                    <div className="bg-white p-6 rounded-xl shadow-md h-full">
                        <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">Environmental Stewardship</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Waste Reduction:</strong> We have implemented comprehensive recycling programs across all properties and are actively working to reduce single-use plastics.</li>
                            <li><strong>Energy Conservation:</strong> We utilize energy-efficient lighting and appliances and encourage both staff and guests to be mindful of energy consumption.</li>
                            <li><strong>Water Management:</strong> Water-saving fixtures and responsible irrigation practices are in place to conserve this precious resource.</li>
                            <li><strong>Protecting Biodiversity:</strong> Our properties, like Kay Jay Wild, are designed to exist in harmony with their natural surroundings, helping to protect local ecosystems and wildlife.</li>
                        </ul>
                    </div>
                </AnimatedSection>
                 <AnimatedSection>
                    <div className="bg-white p-6 rounded-xl shadow-md h-full">
                        <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">Community & Culture</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Local Sourcing:</strong> We prioritize purchasing fresh produce, seafood, and other goods from local farmers, fishermen, and artisans, supporting the local economy.</li>
                            <li><strong>Employing Locally:</strong> A significant portion of our team members are hired from the local communities surrounding our hotels, providing stable employment and career growth.</li>
                            <li><strong>Cultural Preservation:</strong> We celebrate and promote Sri Lankan culture by offering authentic cuisine, showcasing local art, and encouraging guests to respectfully engage with local traditions.</li>
                            <li><strong>Guest Education:</strong> We invite our guests to be partners in our sustainability journey by providing information on local conservation efforts and cultural etiquette.</li>
                        </ul>
                    </div>
                </AnimatedSection>
            </div>
            
            <AnimatedSection>
                 <div className="bg-brand-gray/60 p-8 rounded-xl border border-brand-gray text-center">
                    <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Our Goal</h2>
                    <p className="italic text-gray-800">
                        "Our goal is to ensure that the beautiful destinations our guests travel to see are protected for future generations. By choosing to stay with Kayjay Hotels, you are supporting a sustainable future for Sri Lanka's tourism industry."
                    </p>
                </div>
            </AnimatedSection>

          </div>
        </div>
      </div>
    </>
  );
};

export default SustainabilityPage;