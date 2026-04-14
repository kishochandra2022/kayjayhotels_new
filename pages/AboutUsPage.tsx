

import * as React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import LazyImage from '../components/LazyImage';
import { Helmet } from 'react-helmet-async'; // Import Helmet

const AboutUsPage: React.FC = () => {
  const pageTitle = "About Us | Luxury in Every Detail | Kayjay Hotels";
  const pageDescription = "Learn about the story and philosophy of Kayjay Hotels, a brand built on 'luxury in every detail'. Discover our commitment to exceptional service and memorable guest experiences since 2006.";
  const canonicalUrl = `${window.location.origin}/#/about`;
  const imageUrl = `${window.location.origin}/public/images/about-hero.jpg`;

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
              src="/public/images/about-hero.jpg" 
              alt="Sri Lankan coastline" 
              className="w-full h-full object-cover opacity-30" 
            />
          </div>
          <div className="relative z-10">
            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl font-extrabold font-serif">Our Story: Luxury in Every Detail</h1>
              <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
                Crafting Unforgettable Stays Since 2006
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-lg text-text-dark leading-relaxed space-y-12">
            
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">Discover Boutique Luxury, Natural Beauty & Authentic Sri Lankan Hospitality</h2>
                <div className="space-y-6">
                    <p>
                    Welcome to Kay Jay Hotels, where timeless elegance meets tropical serenity. Established in 2006, Kay Jay Hotels Pvt Ltd is a proudly Sri Lankan-owned hospitality brand offering boutique hotels and resorts across some of the island’s most captivating destinations. With a strong commitment to delivering exceptional service, tranquil luxury, and memorable guest experiences, we invite travelers from around the world to discover the true essence of Sri Lanka — from sun-drenched beaches and wildlife safaris to relaxing coastal escapes — through our unique and carefully curated collection of properties.
                    </p>
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">About – Kay Jay Hotels Pvt Ltd</h2>
                <div className="space-y-6">
                    <p>
                    Kay Jay Hotels Pvt Ltd is a premier hospitality brand in Sri Lanka, dedicated to delivering boutique luxury, personalized service, and authentic island experiences. Since our founding in 2006, we have remained committed to offering more than just accommodation — we create peaceful, rejuvenating getaways where guests can truly connect with the breathtaking beauty and culture of Sri Lanka. Our handpicked locations reflect the island’s diversity — from golden coastlines and palm-fringed gardens to vibrant wildlife-rich landscapes.
                    </p>
                    <p>
                    What truly sets Kay Jay Hotels apart is our focus on effortless elegance and our passion for genuine hospitality. Every one of our resorts is thoughtfully designed to offer a sense of calm, comfort, and belonging. We currently operate four exclusive properties across Sri Lanka: The Beach House by Kay Jay and Kay Jay Palms in Pasikudah, Kay Jay Wild near Wilpattu National Park, and Kay Jay Beach Front in Uswetakeiyawa. Each destination is unique in its charm but united by our core promise of quality, warmth, and exceptional guest service.
                    </p>
                    <p>
                    Our philosophy is simple — to offer every guest a true “home away from home.” With a dedicated and passionate team, we ensure that every visitor is welcomed with warmth and treated with the utmost care. Whether you’re seeking a relaxing beach holiday, a nature-filled adventure, or a peaceful escape near the city, Kay Jay Hotels offers curated experiences for couples, families, solo travelers, and groups alike.
                    </p>
                    <p>
                    As a locally owned and operated hotel group, we are deeply committed to sustainable tourism and giving back to the communities we operate in. We take pride in preserving the cultural and natural heritage of Sri Lanka while supporting its growth as a top travel destination. Our team continuously works to improve the guest experience through eco-conscious practices, innovation, and a personalized approach to service.
                    </p>
                    <p>
                    For over 15 years, we’ve had the honor of welcoming guests from all over the world, helping them create cherished memories in one of the world’s most beautiful and diverse islands. Whether you’re watching the sunset over the Indian Ocean, embarking on a wildlife safari, or simply enjoying the gentle breeze through tropical gardens, we invite you to experience the unforgettable charm of Sri Lanka with Kay Jay Hotels.
                    </p>
                </div>
            </AnimatedSection>
            
            <AnimatedSection>
                 <div className="bg-brand-gray/60 p-8 rounded-xl border border-brand-gray">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">Founder’s Message</h2>
                    <div className="space-y-6 italic text-gray-800">
                        <p>
                        “I am privileged to extend a warm welcome to our valued visitors and guests to Kay Jay Hotels. I thank you for taking your time to browse through our serene Hotels, The Beach House-Pasikudah, Kay Jay Palms, Kay Jay Wild & Kay Jay Beach Front Hotels & Resorts that awaits your arrival. We offer a host of activities and attractions at selected properties that can be enjoyed individually, with Family & Friends.”
                        </p>
                        <p>
                        “Our dedicated team of associates at our hotels, are committed to providing you with a comfortable and memorable stay. As a guest, we want to ensure that you have a seamless and enjoyable experience with us at our hotels during your visit to sunny Sri Lanka.”
                        </p>
                        <p>
                        “We thank you for choosing Kay Jay Hotels and hope that you have a comfortable and pleasant stay with us.”
                        </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-brand-gray text-right">
                        <p className="font-bold text-xl text-brand-dark font-serif">Kanthi Johnpillai</p>
                        <p className="text-gray-600">Managing Director – KayJay Group</p>
                    </div>
                </div>
            </AnimatedSection>

          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;