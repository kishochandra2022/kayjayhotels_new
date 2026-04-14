
import * as React from 'react';
import { Link } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
    {children}
  </a>
);

const Footer: React.FC = () => {
  const sortedHotels = [...hotelsData].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img src="/public/images/logo.png" alt="Kayjay Hotels Logo" className="h-12 mb-4" />
            </Link>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Experience authentic Sri Lankan hospitality across our unique properties. From serene beaches to lush wilderness, we offer curated stays that create lasting memories.
            </p>
            <p className="mt-2 text-brand-primary italic text-sm">Luxury in every detail</p>
             <div className="flex space-x-4 mt-4">
                <SocialIcon href="https://www.facebook.com/kayjayhotels">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com/kayjay_hotels/">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 013.45 2.525c.636-.247 1.363-.416 2.427-.465C6.901 2.013 7.255 2 9.685 2h2.63zM12 4.878a7.122 7.122 0 100 14.244A7.122 7.122 0 0012 4.878zM12 16.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm4.838-9.002a1.422 1.422 0 100 2.844 1.422 1.422 0 000-2.844z" clipRule="evenodd" /></svg>
                </SocialIcon>
            </div>
          </div>

          {/* Popular Amenities */}
          <div>
            <h4 className="text-lg font-serif font-bold uppercase tracking-wider mb-4 text-brand-primary">Popular Amenities</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/hotels/kayjay-beach-front" className="hover:text-brand-primary transition-colors">Swimming Pool</Link></li>
              <li><Link to="/hotels/kay-jay-wild" className="hover:text-brand-primary transition-colors">Safari Experience</Link></li>
              <li><Link to="/hotels/kay-jay-beach-house" className="hover:text-brand-primary transition-colors">Beach Access</Link></li>
              <li><Link to="/hotels/kay-jay-palms" className="hover:text-brand-primary transition-colors">Plantation Retreat</Link></li>
              <li><Link to="/hotels/kayjay-beach-front" className="hover:text-brand-primary transition-colors">Weddings & Events</Link></li>
              <li><Link to="/hotels/kay-jay-palms" className="hover:text-brand-primary transition-colors">Bird Watching</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold uppercase tracking-wider mb-4 text-brand-primary">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link to="/sustainability" className="hover:text-brand-primary transition-colors">Sustainability</Link></li>
              <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-brand-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Properties */}
           <div>
            <h4 className="text-lg font-serif font-bold uppercase tracking-wider mb-4 text-brand-primary">Our Properties</h4>
            <ul className="space-y-2 text-gray-300">
              {sortedHotels.map(hotel => (
                <li key={hotel.id}><Link to={`/hotels/${hotel.slug}`} className="hover:text-brand-primary transition-colors">{hotel.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-bold uppercase tracking-wider mb-4 text-brand-primary">Contact Us</h4>
            <address className="not-italic text-gray-300 space-y-3">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-brand-primary mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                <span>
                  Kay Jay Hotels (Pvt) Ltd.<br/>
                  100E Bopitiya Road,<br/>
                  Uswetakeiyawa 11328, Wattala,<br/>
                  Sri Lanka.
                </span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-brand-primary mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                <a href="mailto:info@kayjayhotels.com" className="hover:text-brand-primary">info@kayjayhotels.com</a>
              </div>
               <div className="flex items-start">
                <svg className="w-5 h-5 text-brand-primary mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                <span>
                  <a href="tel:+94742021777" className="hover:text-brand-primary transition-colors">+94 74 20 21 777</a><br/>
                  <a href="tel:+94742021700" className="hover:text-brand-primary transition-colors">+94 74 20 21 700</a>
                </span>
              </div>
            </address>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <div className="flex justify-center space-x-4 mb-4">
              <Link to="/privacy-policy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
              <span>|</span>
              <Link to="/terms-and-conditions" className="hover:text-brand-primary transition-colors">Terms & Conditions</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Kayjay Hotels (Pvt) Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;