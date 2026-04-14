

import * as React from 'react';
// FIX: Replaced useLocation with useSearchParams for v6 compatibility.
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { useSearchParams, Link } from 'react-router-dom';
import { hotelsData } from '../data/hotels';
import { Hotel, Room } from '../types';
import FullHouseCard from '../components/FullHouseCard';
import CustomInquiry from '../components/CustomInquiry';
import AnimatedSection from '../components/AnimatedSection';
import LazyImage from '../components/LazyImage';
import RoomCard from '../components/RoomCard';
import { Helmet } from 'react-helmet-async'; // Import Helmet

// Define static page content for searching
const staticPages = [
    { name: 'About Us', path: '/about', content: 'Our Story Effortless Elegance Since 2006. Discover Boutique Luxury, Natural Beauty & Authentic Sri Lankan Hospitality. Kay Jay Hotels Pvt Ltd is a premier hospitality brand in Sri Lanka, dedicated to delivering boutique luxury, personalized service, and authentic island experiences.' },
    { name: 'Contact Us', path: '/contact', content: 'Get In Touch. Corporate Office Kay Jay Hotels (Pvt) Ltd. 100E Bopitiya Road, Uswetakeiyawa 11328, Wattala, Sri Lanka. Email: info@kayjayhotels.com Phone / WhatsApp +94 74 20 21 700 +94 74 20 21 777' },
    { name: 'Sustainability', path: '/sustainability', content: 'Our Commitment to Sustainability. Preserving Paradise for Generations to Come. Responsible Tourism, Authentic Experiences. Environmental Stewardship, Community & Culture.' },
    { name: 'FAQ', path: '/faq', content: 'Frequently Asked Questions. How do I make a booking? What are the check-in and check-out times? What is your cancellation policy? Do you offer airport transfers? Are your hotels family-friendly? Can I book for a large group or host an event?' },
    { name: 'Privacy Policy', path: '/privacy-policy', content: 'Privacy Policy. We are committed to protecting your privacy and handling your personal data. Information We Collect, How We Use Your Information.' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions', content: 'Terms & Conditions. Bookings and Reservations. Pricing and Payment. Cancellation Policy. Check-in and Check-out.' },
];

type StaticPage = typeof staticPages[0];

// Define discriminated union for all searchable items
type SearchableItem =
  | { type: 'property'; data: Hotel }
  | { type: 'room'; data: Room; hotel: Hotel }
  | { type: 'page'; data: StaticPage };

// --- Helper Components ---

// Highlight component to mark search terms in results
const Highlight: React.FC<{ text: string; query: string }> = ({ text, query }) => {
    if (!query) return <>{text}</>;
    const searchWords = query.toLowerCase().split(' ').filter(w => w);
    const regex = new RegExp(`(${searchWords.join('|')})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                searchWords.includes(part.toLowerCase()) ? (
                    <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded-sm">{part}</mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

// A flexible card to display any type of search result
const SearchResultCard: React.FC<{ item: SearchableItem; query: string }> = ({ item, query }) => {
    let linkTo: string;
    let title: string;
    let description: string;
    let imageUrl: string | undefined;
    let typeLabel: string;

    switch (item.type) {
        case 'property':
            linkTo = `/hotels/${item.data.slug}`;
            title = item.data.name;
            description = item.data.description;
            imageUrl = item.data.images[0];
            typeLabel = 'Property';
            break;
        case 'room':
            linkTo = `/hotels/${item.hotel.slug}#rooms`;
            title = `${item.data.name}`;
            description = `At ${item.hotel.name} | ${item.data.features.join(', ')}`;
            imageUrl = item.data.image;
            typeLabel = 'Room';
            break;
        case 'page':
            linkTo = item.data.path;
            title = item.data.name;
            description = item.data.content;
            imageUrl = undefined;
            typeLabel = 'Page';
            break;
    }

    return (
        <Link to={linkTo} className="group block bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out border border-transparent hover:border-brand-primary/50 hover:shadow-xl">
            <div className="flex flex-col md:flex-row">
                {imageUrl && (
                    <div className="md:w-48 flex-shrink-0 h-40 md:h-auto">
                        <LazyImage src={imageUrl} alt={title} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="p-6 flex-grow flex flex-col">
                    <p className="text-xs font-semibold text-brand-primary uppercase tracking-wider">{typeLabel}</p>
                    <h3 className="text-xl font-bold font-sans text-brand-dark mt-1 group-hover:text-brand-primary">{title}</h3>
                    <p className="text-gray-600 line-clamp-2 mt-2">
                        <Highlight text={description} query={query} />
                    </p>
                    <span className="mt-auto pt-2 text-right font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Details &rarr;
                    </span>
                </div>
            </div>
        </Link>
    );
};


const SearchResultsPage: React.FC = () => {
  // FIX: Replaced useLocation and URLSearchParams with useSearchParams for v6 compatibility.
  const [searchParams] = useSearchParams();

  // General site search query
  const query = searchParams.get('q');
  
  // Availability search params from MainBookingWidget
  const hotelSlug = searchParams.get('hotelSlug');

  // --- Comprehensive Search Logic ---

  // 1. Create a flat, indexed list of all searchable content (runs only once)
  const indexedData = React.useMemo(() => {
    const data: SearchableItem[] = [];
    hotelsData.forEach(hotel => {
        data.push({ type: 'property', data: hotel });
        hotel.rooms.forEach(room => data.push({ type: 'room', data: room, hotel: hotel }));
    });
    staticPages.forEach(page => data.push({ type: 'page', data: page }));
    return data;
  }, []);

  // 2. Helper to get all text content from an item
  const getSearchableText = (item: SearchableItem): string => {
    switch (item.type) {
        case 'property':
            const priceTiers = item.data.rooms.map(r => {
                const price = r.price.ro;
                return price < 15000 ? 'budget affordable' : price < 30000 ? 'mid-range standard' : 'luxury premium';
            }).join(' ');
            return [
                item.data.name, item.data.tagline, item.data.description, item.data.location, priceTiers,
                ...item.data.searchableAmenities,
                ...(item.data.detailedFeatures?.flatMap(f => [f.title, ...f.items]) || [])
            ].join(' ').toLowerCase();
        case 'room':
            const price = item.data.price.ro;
            const priceTier = price < 15000 ? 'budget affordable' : price < 30000 ? 'mid-range standard' : 'luxury premium';
            return [
                item.data.name, ...item.data.features, priceTier, item.hotel.name, item.hotel.location,
                 ...(item.hotel.detailedFeatures?.flatMap(f => f.items) || [])
            ].join(' ').toLowerCase();
        case 'page':
            return [item.data.name, item.data.content].join(' ').toLowerCase();
    }
  };

  // 3. Perform the search and scoring
  const searchResults = React.useMemo(() => {
    if (!query) return null;
    const searchWords = query.toLowerCase().split(' ').filter(w => w.length > 1);
    if (searchWords.length === 0) return [];

    return indexedData
        .map(item => {
            const searchableText = getSearchableText(item);
            let score = 0;
            const title = (item.type === 'page' ? item.data.name : item.type === 'property' ? item.data.name : item.data.name).toLowerCase();
            
            searchWords.forEach(word => {
                if (searchableText.includes(word)) {
                    score += 1; // Base score for any match
                    if (title.includes(word)) score += 5; // Boost for title match
                }
            });
            
            return { item, score };
        })
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score);
  }, [query, indexedData]);


  // --- Availability Search Logic (Unchanged) ---
  const availabilityData = React.useMemo(() => {
    if (!hotelSlug) return null;
    const hotel = hotelsData.find(h => h.slug === hotelSlug);
    if (!hotel) return { hotel: null, availableRooms: [], fullHouseOptions: [], standardRooms: [] };

    const checkIn = searchParams.get('checkIn') || '';
    const checkOut = searchParams.get('checkOut') || '';
    const adults = parseInt(searchParams.get('adults') || '1', 10);
    const children = parseInt(searchParams.get('children') || '0', 10);
    const totalGuests = adults + children;

    const isRoomSuitable = (room: Room) => {
      if (room.isFullHouseBooking) {
        return totalGuests <= (room.totalCapacity || room.maxAdults + room.maxChildren);
      }
      return adults <= room.maxAdults && children <= room.maxChildren;
    };

    const availableRooms = hotel.rooms.filter(isRoomSuitable);
    const fullHouseOptions = availableRooms.filter(room => room.isFullHouseBooking);
    const standardRooms = availableRooms.filter(room => !room.isFullHouseBooking);

    return { hotel, availableRooms, fullHouseOptions, standardRooms, checkIn, checkOut, adults, children };
  }, [hotelSlug, searchParams]);


  // --- RENDER LOGIC ---

  // Render for general site search
  if (query) {
    if (!searchResults) return null;

    const pageTitle = `Search Results for "${query}" | Kayjay Hotels`;
    const pageDescription = searchResults.length > 0
        ? `Showing ${searchResults.length} results for your search: "${query}". Discover properties, rooms, and pages.`
        : `No results found for your search: "${query}". Try a different keyword.`;
    const canonicalUrl = `${window.location.origin}/#/search-results?q=${encodeURIComponent(query)}`;
    const imageUrl = `${window.location.origin}/public/images/kayjay-amorea/hero.jpg`;

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
        </Helmet>
        <div className="bg-brand-gray py-20">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark">Search Results</h1>
                {searchResults.length > 0 ? (
                  <p className="text-lg text-gray-600 mt-4">Showing {searchResults.length} results for: <strong>"{query}"</strong></p>
                ) : (
                  <p className="text-lg text-gray-600 mt-4">No results found for: <strong>"{query}"</strong></p>
                )}
              </div>
            </AnimatedSection>
            {searchResults.length > 0 ? (
               <div className="space-y-6 max-w-4xl mx-auto">
                    {searchResults.map(({ item }, index) => (
                        <AnimatedSection key={index}>
                            <SearchResultCard item={item} query={query} />
                        </AnimatedSection>
                    ))}
                </div>
            ) : (
              <div className="text-center max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <p className="text-gray-700">We couldn't find anything matching your search. Please try a different keyword or phrase.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
                    <Link to="/" className="text-sm font-semibold text-brand-primary hover:underline">
                      Go to Homepage
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link to="/properties" className="text-sm font-semibold text-brand-primary hover:underline">
                      View All Properties
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link to="/contact" className="text-sm font-semibold text-brand-primary hover:underline">
                      Contact Us
                    </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Render for availability search
  if (hotelSlug) {
    if (!availabilityData) return null;
    const { hotel, availableRooms, fullHouseOptions, standardRooms, checkIn, checkOut, adults, children } = availabilityData;
    if (!hotel) {
      return (
        <div className="text-center py-20">
          <h1 className="text-2xl">Hotel not found.</h1>
          <Link to="/" className="text-brand-primary hover:underline mt-4 inline-block">Go Home</Link>
        </div>
      );
    }
    const bookingProps = { initialCheckIn: checkIn, initialCheckOut: checkOut, initialAdults: adults, initialChildren: children };

    const availabilityPageTitle = `Availability at ${hotel.name} | Book Your Stay | Kayjay Hotels`;
    const availabilityPageDescription = `Check room availability for ${adults} adults and ${children} children at ${hotel.name} from ${checkIn} to ${checkOut}. Find your perfect luxury room or exclusive villa.`;
    const canonicalUrl = `${window.location.origin}/#/search-results?${searchParams.toString()}`;
    const imageUrl = `${window.location.origin}${hotel.images[0]}`;


    return (
      <>
        <Helmet>
          <title>{availabilityPageTitle}</title>
          <meta name="description" content={availabilityPageDescription} />
          <link rel="canonical" href={canonicalUrl} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:title" content={availabilityPageTitle} />
          <meta property="og:description" content={availabilityPageDescription} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:site_name" content="Kayjay Hotels" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={canonicalUrl} />
          <meta property="twitter:title" content={availabilityPageTitle} />
          <meta property="twitter:description" content={availabilityPageDescription} />
          <meta property="twitter:image" content={imageUrl} />
        </Helmet>
        <div className="bg-brand-gray py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark">Available Rooms at {hotel.name}</h1>
                <p className="text-lg text-gray-600 mt-4">
                  Showing options for <strong>{adults} Adults</strong> & <strong>{children} Children</strong>
                  {checkIn && checkOut && <>{' from '}<strong>{checkIn}</strong> to <strong>{checkOut}</strong></>}.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please note: This is an availability inquiry. A reservations agent will confirm your booking.
                </p>
              </div>
            </AnimatedSection>
            {availableRooms.length > 0 ? (
              <div className="space-y-12">
                {fullHouseOptions.length > 0 && (
                  <AnimatedSection>
                    {fullHouseOptions.map(room => <FullHouseCard key={room.id} hotel={hotel} room={room} {...bookingProps} />)}
                  </AnimatedSection>
                )}
                {standardRooms.length > 0 && (
                  <div className="space-y-8">
                     {fullHouseOptions.length > 0 && <h2 className="text-2xl font-bold text-center">Or Choose an Individual Room</h2>}
                     {standardRooms.map(room => (
                      <AnimatedSection key={room.id}>
                        <RoomCard hotel={hotel} room={room} {...bookingProps} />
                      </AnimatedSection>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <AnimatedSection>
                 <CustomInquiry 
                    hotelName={hotel.name} checkIn={checkIn} checkOut={checkOut}
                    adults={adults.toString()} children={children.toString()}
                 />
              </AnimatedSection>
            )}
            <AnimatedSection>
              <div className="text-center mt-12">
                <Link to={`/hotels/${hotel.slug}`} className="text-brand-primary hover:underline font-semibold">
                  &larr; View all rooms at {hotel.name}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </>
    );
  }
  
  // Fallback if no params
  const fallbackTitle = "Search for Your Perfect Stay | Kayjay Hotels";
  const fallbackDescription = "Use our search tools to find hotels and rooms that match your travel dates and guest count. Discover luxury in Sri Lanka.";
  const fallbackCanonicalUrl = `${window.location.origin}/#/search-results`;
  const fallbackImageUrl = `${window.location.origin}/public/images/kayjay-amorea/hero.jpg`;

  return (
    <>
      <Helmet>
        <title>{fallbackTitle}</title>
        <meta name="description" content={fallbackDescription} />
        <link rel="canonical" href={fallbackCanonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fallbackCanonicalUrl} />
        <meta property="og:title" content={fallbackTitle} />
        <meta property="og:description" content={fallbackDescription} />
        <meta property="og:image" content={fallbackImageUrl} />
        <meta property="og:site_name" content="Kayjay Hotels" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={fallbackCanonicalUrl} />
        <meta property="twitter:title" content={fallbackTitle} />
        <meta property="twitter:description" content={fallbackDescription} />
        <meta property="twitter:image" content={fallbackImageUrl} />
      </Helmet>
      <div className="bg-brand-gray py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-brand-dark">Search for a Stay</h1>
            <p className="mt-4 text-gray-700">Please use the search bar in the header or the booking widget on the homepage to find your perfect getaway.</p>
            <Link to="/" className="mt-6 inline-block bg-brand-primary text-white font-bold py-3 px-6 rounded-md hover:bg-brand-dark transition-all">
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultsPage;