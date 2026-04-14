

import * as React from 'react';
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { Helmet } from 'react-helmet-async'; // Import Helmet

const NotFound: React.FC = () => {
  const pageTitle = "404: Page Not Found | Kayjay Hotels";
  const pageDescription = "The page you are looking for could not be found. Let us help you find your way back to luxury and authentic Sri Lankan hospitality.";
  const canonicalUrl = `${window.location.origin}/#/404`; // Canonical for 404 page

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {/* You might want to add noindex, nofollow for 404 pages to prevent indexing */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="relative bg-brand-gray">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/public/images/kay-jay-palms/garden.jpg')" }}
        />
        <div className="relative flex items-center justify-center min-h-[calc(100vh-200px)] py-16 px-6">
          <div className="text-center p-8 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
            <h1 className="text-6xl md:text-8xl font-extrabold text-brand-primary tracking-tight">404</h1>
            <h2 className="mt-2 text-2xl md:text-4xl font-serif font-bold text-brand-dark">
              Oops! Page Not Found.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              It looks like you've taken a wrong turn. The page you're looking for doesn't exist or may have been moved.
            </p>

            <div className="mt-8 max-w-sm mx-auto">
              <p className="text-sm font-semibold text-gray-700 mb-2">Let's find what you're looking for:</p>
              <div className="w-full">
                <SearchBar />
              </div>
            </div>

            <div className="mt-10">
              <p className="text-sm text-gray-600 mb-4">Or, navigate to one of our main pages:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/"
                  className="bg-brand-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-brand-secondary transition-all duration-300"
                >
                  Go to Homepage
                </Link>
                <Link
                  to="/properties"
                  className="bg-brand-secondary text-white font-bold py-3 px-6 rounded-xl hover:bg-brand-dark transition-all duration-300"
                >
                  View Our Properties
                </Link>
                <Link
                  to="/contact"
                  className="bg-brand-gray text-text-dark font-bold py-3 px-6 rounded-xl hover:bg-brand-light transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;