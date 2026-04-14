

import * as React from 'react';
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { useParams } from 'react-router-dom';
import { hotelsData } from '../data/hotels';
import NotFound from './NotFound';
import ImageGallery from '../components/ImageGallery';
import BookingSection from '../components/BookingSection';
import HotelFeatures from '../components/HotelFeatures';
import LocationMap from '../components/LocationMap';
import AnimatedSection from '../components/AnimatedSection';
import SocialLinks from '../components/SocialLinks';
import TopBookingWidget from '../components/TopBookingWidget';
import { Helmet } from 'react-helmet-async'; // Import Helmet

const PropertyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const hotel = hotelsData.find(h => h.slug === slug);

  const [bookingDetails, setBookingDetails] = React.useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
  });

  if (!hotel) {
    return <NotFound />;
  }

  const canonicalUrl = `${window.location.origin}/#/hotels/${hotel.slug}`;
  const imageUrl = hotel.images[0] ? `${window.location.origin}${hotel.images[0]}` : `${window.location.origin}/public/images/kay-jay-beach-house/hero.jpg`;

  // Schema.org JSON-LD for SEO
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": hotel.name,
    "alternateName": `Kayjay Hotels ${hotel.name}`,
    "description": hotel.seoDescription,
    "slogan": "Luxury in every detail",
    "image": hotel.images.map(img => `${window.location.origin}${img}`),
    "starRating": {
      "@type": "Rating",
      "ratingValue": hotel.starRating || "4"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": hotel.location,
      "addressCountry": "LK"
    },
    "priceRange": "LKR",
    "telephone": "+94742021777",
    "url": canonicalUrl,
    "amenityFeature": hotel.detailedFeatures?.flatMap(category => 
        category.items.map(item => ({
            "@type": "LocationFeatureSpecification",
            "name": item,
            "value": true
        }))
    ) || []
  };

  const StarRating: React.FC<{ rating?: number }> = ({ rating }) => {
    if (!rating) return null;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };


  return (
    <div className="bg-brand-light" key={hotel.id}>
      <Helmet>
        <title>{hotel.seoTitle}</title>
        <meta name="description" content={hotel.seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="hotel" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={hotel.seoTitle} />
        <meta property="og:description" content={hotel.seoDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Kayjay Hotels" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={hotel.seoTitle} />
        <meta property="twitter:description" content={hotel.seoDescription} />
        <meta property="twitter:image" content={imageUrl} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(hotelSchema)}
        </script>
      </Helmet>

      <ImageGallery images={hotel.images} hotelName={hotel.name} />
      
      <TopBookingWidget 
        hotel={hotel} 
        bookingDetails={bookingDetails}
        setBookingDetails={setBookingDetails}
      />

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left/Main Column */}
          <div className="lg:col-span-2 space-y-16">
            <AnimatedSection>
              <header>
                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">{hotel.name}</h1>
                        <p className="text-lg text-gray-600 mt-2">{hotel.tagline}</p>
                    </div>
                    <div className="flex-shrink-0"><StarRating rating={hotel.starRating} /></div>
                </div>
                <SocialLinks 
                    googleReviewUrl={hotel.googleReviewUrl} 
                    facebookUrl={hotel.facebookUrl} 
                    instagramUrl={hotel.instagramUrl} 
                    tripadvisorUrl={hotel.tripadvisorUrl}
                    className="mt-4"
                />
              </header>
              <p className="text-gray-700 leading-relaxed mt-6">{hotel.description}</p>
            </AnimatedSection>
            
            {hotel.detailedFeatures && hotel.detailedFeatures.length > 0 && (
              <AnimatedSection>
                <HotelFeatures features={hotel.detailedFeatures} />
              </AnimatedSection>
            )}

            <AnimatedSection>
              <BookingSection hotel={hotel} bookingDetails={bookingDetails} />
            </AnimatedSection>
          </div>

          {/* Right/Sticky Column */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-8">
              <AnimatedSection>
                <div className="bg-white p-6 rounded-xl shadow-md border border-brand-gray/80">
                  <LocationMap 
                    location={hotel.location} 
                    hotelName={hotel.name}
                  />
                </div>
              </AnimatedSection>
                <AnimatedSection>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-brand-gray/80">
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">Good to know</h3>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                           <svg className="w-5 h-5 text-brand-primary mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                           <span><strong>Check-in:</strong> After 2:00 PM</span>
                        </li>
                        <li className="flex items-start">
                           <svg className="w-5 h-5 text-brand-primary mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                           <span><strong>Check-out:</strong> Before 12:00 PM</span>
                        </li>
                        <li className="flex items-start">
                           <svg className="w-5 h-5 text-brand-primary mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 1a9 9 0 100 18 9 9 0 000-18zM8.707 14.707a1 1 0 01-1.414 0L4.586 12H4a1 1 0 010-2h1.586l2.707-2.707a1 1 0 011.414 1.414L8.414 10l2.293 2.293a1 1 0 010 1.414z" /></svg>
                           <span>Cancellation policy varies by rate and season.</span>
                        </li>
                    </ul>
                  </div>
                </AnimatedSection>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;