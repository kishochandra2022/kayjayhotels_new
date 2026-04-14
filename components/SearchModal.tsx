
import * as React from 'react';
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { Link } from 'react-router-dom';
import { hotelsData } from '../data/hotels';
import { Hotel } from '../types';
import LazyImage from './LazyImage';

interface SearchResult {
  hotel: Hotel;
  score: number;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset state when modal closes
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);
  
  React.useEffect(() => {
    // Escape key to close modal
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  React.useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchWords = query.toLowerCase().split(' ').filter(w => w);

    const searchResults = hotelsData.map(hotel => {
      let score = 0;
      const searchableText = [
        hotel.name,
        hotel.tagline,
        hotel.description,
        hotel.location,
        ...hotel.searchableAmenities,
        ...hotel.rooms.map(r => r.name)
      ].join(' ').toLowerCase();

      searchWords.forEach(word => {
        if (searchableText.includes(word)) {
          score += 1;
        }
        if (hotel.name.toLowerCase().includes(word)) {
            score += 5; // Higher score for hotel name match
        }
        if (hotel.searchableAmenities.some(a => a.toLowerCase().includes(word))) {
            score += 3; // Higher score for amenity match
        }
      });
      
      return { hotel, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);

    setResults(searchResults.slice(0, 10)); // Limit to top 10 results
  }, [query]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-start pt-16 md:pt-24 px-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-transform duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for properties, amenities, or locations..."
            className="w-full text-lg focus:outline-none bg-transparent"
          />
           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4 flex-shrink-0" aria-label="Close search">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <ul>
              {results.map(({ hotel }) => (
                <li key={hotel.id}>
                  <Link
                    to={`/hotels/${hotel.slug}`}
                    onClick={onClose}
                    className="flex items-center p-4 hover:bg-brand-gray/60 transition-colors duration-200"
                  >
                    <div className="w-20 h-16 mr-4 flex-shrink-0">
                        <LazyImage src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark">{hotel.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{hotel.tagline}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
             query.trim().length >= 2 && (
              <div className="p-12 text-center text-gray-500">
                <p>No results found for "{query}".</p>
                <p className="text-sm mt-2">Try searching for a different keyword like "pool", "safari", or a location.</p>
              </div>
            )
          )}
          {query.trim().length < 2 && (
             <div className="p-12 text-center text-gray-400">
                <p>Start typing to search for our properties.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;