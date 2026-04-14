

import * as React from 'react';
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { Link, NavLink } from 'react-router-dom';
import { hotelsData } from '../data/hotels';
import SearchBar from './SearchBar';
import CurrencyConverter from './CurrencyConverter';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const sortedHotels = [...hotelsData].sort((a, b) => a.name.localeCompare(b.name));
  // Updated featuredHotel slug
  const featuredHotel = hotelsData.find(h => h.slug === 'kayjay-beach-front') || hotelsData[0];

  const navLinkClasses = "block py-2 px-3 text-white rounded hover:bg-brand-primary md:hover:bg-transparent md:border-0 md:hover:text-brand-primary md:p-0 transition-colors";
  const activeNavLinkClasses = "bg-brand-primary md:bg-transparent md:text-brand-primary";

  // FIX: Updated to v6 NavLink syntax
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`;

  const getPropertiesNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${navLinkClasses} flex items-center ${isActive ? activeNavLinkClasses : ''}`;

  return (
    <header className="bg-brand-dark/95 backdrop-blur-sm sticky top-0 z-40 shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src="/public/images/logo.png" alt="Kayjay Hotels Logo" className="h-10" />
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6 text-sm font-medium">
              {/* FIX: Updated NavLink to v6 syntax with `end` prop for home */}
              <li><NavLink to="/" className={getNavLinkClass} end>Home</NavLink></li>
              <li 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {/* FIX: Updated NavLink to v6 syntax */}
                <NavLink to="/properties" className={getPropertiesNavLinkClass}>
                  Our Properties
                   <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </NavLink>
                {/* Mega Menu - Desktop */}
                <div 
                  className={`absolute top-full -left-1/2 transform transition-all duration-300 ease-in-out z-50 ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                >
                  <div className="mt-2 w-[50rem] max-w-screen-lg bg-white rounded-xl shadow-xl border border-gray-100">
                    <div className="grid grid-cols-3 gap-6 p-8">
                      {/* Column 1: Properties */}
                      <div className="col-span-1">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-primary mb-4">Our Properties</h3>
                        <ul className="space-y-3">
                          {sortedHotels.map(hotel => (
                            <li key={hotel.id}>
                              <Link 
                                to={`/hotels/${hotel.slug}`}
                                className="font-semibold text-text-dark hover:text-brand-primary transition-colors duration-300 flex items-center"
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                {hotel.name}
                                <span className="text-gray-400 ml-auto">&rarr;</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Column 2: Experiences */}
                      <div className="col-span-1">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-primary mb-4">Experiences</h3>
                        <ul className="space-y-3">
                          <li>
                            <Link to="/hotels/kay-jay-wild" onClick={() => setIsDropdownOpen(false)} className="text-gray-600 hover:text-brand-primary">Safari Adventures</Link>
                          </li>
                          <li>
                            <Link to="/hotels/kay-jay-beach-house" onClick={() => setIsDropdownOpen(false)} className="text-gray-600 hover:text-brand-primary">Beach Escapes</Link>
                          </li>
                          <li>
                            <Link to="/hotels/kay-jay-palms" onClick={() => setIsDropdownOpen(false)} className="text-gray-600 hover:text-brand-primary">Plantation Retreats</Link>
                          </li>
                           <li>
                            <Link to="/hotels/kayjay-beach-front" onClick={() => setIsDropdownOpen(false)} className="text-gray-600 hover:text-brand-primary">Coastal Relaxation</Link>
                          </li>
                        </ul>
                      </div>
                      {/* Column 3: Featured Property */}
                      <div className="col-span-1 flex flex-col">
                         <h3 className="text-sm font-bold uppercase tracking-wider text-brand-primary mb-4 flex-shrink-0">Featured Property</h3>
                         <Link to={`/hotels/${featuredHotel.slug}`} onClick={() => setIsDropdownOpen(false)} className="group block rounded-xl overflow-hidden relative flex-grow">
                           <img src={featuredHotel.images[0]} alt={featuredHotel.name} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                           <div className="absolute bottom-0 left-0 p-4 text-white">
                              <p className="text-xs font-bold">Featured</p>
                              <p className="font-semibold">{featuredHotel.name}</p>
                              <p className="text-sm text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">Discover &rarr;</p>
                           </div>
                         </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              {/* FIX: Updated NavLink to v6 syntax */}
              <li><NavLink to="/about" className={getNavLinkClass}>About Us</NavLink></li>
              {/* FIX: Updated NavLink to v6 syntax */}
              <li><NavLink to="/contact" className={getNavLinkClass}>Contact Us</NavLink></li>
              <li><NavLink to="/blog" className={getNavLinkClass}>Blog</NavLink></li>
              {/* FIX: Updated NavLink to v6 syntax */}
              <li><NavLink to="/faq" className={getNavLinkClass}>FAQ</NavLink></li>
            </ul>
            <div className="w-48"><SearchBar /></div>
            <CurrencyConverter />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col space-y-2">
              {/* FIX: Updated NavLink to v6 syntax */}
              <li><NavLink to="/" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)} end>Home</NavLink></li>
              <li>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full text-left flex justify-between items-center py-2 px-3 text-white rounded hover:bg-brand-primary"
                >
                  Our Properties
                  <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-1">
                    {sortedHotels.map(hotel => (
                      <Link 
                        key={hotel.id} 
                        to={`/hotels/${hotel.slug}`}
                        className="block py-2 px-3 text-sm text-gray-300 rounded hover:bg-brand-primary hover:text-white"
                        onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false); }}
                      >
                        {hotel.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              {/* FIX: Updated NavLink to v6 syntax */}
              <li><NavLink to="/about" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>About Us</NavLink></li>
              {/* FIX: Updated NavLink to v6 syntax */}
              <li><NavLink to="/contact" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink></li>
              <li><NavLink to="/blog" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>Blog</NavLink></li>
              {/* FIX: Updated NavLink to v6 syntax */}
              <li><NavLink to="/faq" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>FAQ</NavLink></li>
              <li className="pt-2"><SearchBar onSearchSubmit={() => setIsMenuOpen(false)} /></li>
              <li className="pt-2 flex justify-start"><CurrencyConverter /></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;