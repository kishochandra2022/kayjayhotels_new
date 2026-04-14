

import * as React from 'react';
// FIX: Replaced useHistory with useNavigate for v6 compatibility.
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearchSubmit?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchSubmit }) => {
  const [query, setQuery] = React.useState('');
  // FIX: Replaced useHistory with useNavigate for v6 compatibility.
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      // FIX: Replaced history.push() with navigate() for v6 compatibility.
      navigate(`/search-results?q=${encodeURIComponent(query.trim())}`);
      // Clear the input after navigating
      setQuery('');
      // Signal to parent that search was submitted
      if (onSearchSubmit) {
        onSearchSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full" role="search">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search entire site..."
          className="w-full text-left bg-brand-dark/50 text-white placeholder-gray-400 py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary/80 focus:bg-brand-dark transition-colors duration-300 text-sm"
          aria-label="Search entire site"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;