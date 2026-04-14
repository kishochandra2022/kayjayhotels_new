
import * as React from 'react';
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { Link } from 'react-router-dom';
import { hotelsData } from '../data/hotels';
import { Room, Hotel } from '../types';
import LazyImage from './LazyImage';
import { useCurrency } from './CurrencyConverter';

interface FeaturedRoom {
  room: Room;
  hotel: Hotel;
}

const FeaturedRoomsCarousel: React.FC = () => {
  const [featuredRooms, setFeaturedRooms] = React.useState<FeaturedRoom[]>([]);
  const { getConvertedPrice } = useCurrency();
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  React.useEffect(() => {
    const allRooms = hotelsData.flatMap(hotel => 
      hotel.rooms
        .filter(room => !room.isFullHouseBooking)
        .map(room => ({ room, hotel }))
    );

    for (let i = allRooms.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allRooms[i], allRooms[j]] = [allRooms[j], allRooms[i]];
    }

    setFeaturedRooms(allRooms.slice(0, 8));
  }, []);
  
  const checkScrollButtons = React.useCallback(() => {
      if (carouselRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
          setCanScrollPrev(scrollLeft > 5);
          setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 5);
      }
  }, []);

  React.useEffect(() => {
      const carousel = carouselRef.current;
      if (carousel) {
          carousel.addEventListener('scroll', checkScrollButtons);
          window.addEventListener('resize', checkScrollButtons);
          checkScrollButtons(); // Initial check
          return () => {
              carousel.removeEventListener('scroll', checkScrollButtons);
              window.removeEventListener('resize', checkScrollButtons);
          };
      }
  }, [featuredRooms, checkScrollButtons]);

  const scroll = (direction: 'prev' | 'next') => {
      if (carouselRef.current) {
          const scrollAmount = carouselRef.current.clientWidth * 0.8;
          carouselRef.current.scrollBy({ 
              left: direction === 'next' ? scrollAmount : -scrollAmount, 
              behavior: 'smooth' 
          });
      }
  };

  if (featuredRooms.length === 0) {
    return null;
  }

  return (
    <div className="relative">
        <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
        >
        {featuredRooms.map(({ room, hotel }) => (
          <div key={`${hotel.id}-${room.id}`} className="flex-shrink-0 w-full sm:w-[45%] md:w-[30%] lg:w-[calc(25%-1.125rem)] snap-start">
            <Link 
              to={`/hotels/${hotel.slug}#rooms`} 
              className="group block bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out border border-transparent hover:border-brand-primary/50 hover:shadow-xl h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <LazyImage
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs font-semibold text-brand-primary uppercase tracking-wider">{hotel.name}</p>
                <h4 className="font-bold text-lg text-brand-dark mt-1 truncate group-hover:text-brand-primary transition-colors">{room.name}</h4>
                <div className="mt-auto pt-2">
                    <p className="text-gray-600 text-sm">
                    Starts from <span className="font-bold text-brand-dark text-base">{getConvertedPrice(room.price.ro)}</span>
                    </p>
                    <span className="block text-right font-semibold text-brand-primary group-hover:underline transition-all duration-300 mt-2 text-sm">
                    View Details &rarr;
                    </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

       <button 
        onClick={() => scroll('prev')} 
        disabled={!canScrollPrev}
        className="flex items-center justify-center absolute top-1/2 -left-2 md:-left-5 transform -translate-y-1/2 bg-white text-brand-dark h-10 w-10 rounded-full shadow-lg hover:bg-brand-primary hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-brand-dark"
        aria-label="Previous room"
       >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button 
        onClick={() => scroll('next')} 
        disabled={!canScrollNext}
        className="flex items-center justify-center absolute top-1/2 -right-2 md:-right-5 transform -translate-y-1/2 bg-white text-brand-dark h-10 w-10 rounded-full shadow-lg hover:bg-brand-primary hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-brand-dark"
        aria-label="Next room"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default FeaturedRoomsCarousel;