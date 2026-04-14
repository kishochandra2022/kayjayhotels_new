

import * as React from 'react';
// FIX: Upgraded react-router-dom from v5 to v6 syntax.
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyPage from './pages/PropertyPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import { CurrencyProvider } from './components/CurrencyConverter';
import EmailInquiryPage from './pages/EmailInquiryPage';
import PropertiesListPage from './pages/PropertiesListPage';
import SustainabilityPage from './pages/SustainabilityPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import FaqPage from './pages/FaqPage';
import SearchResultsPage from './pages/SearchResultsPage';
import Breadcrumbs from './components/Breadcrumbs';
import { hotelsData } from './data/hotels';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CategoryArchivePage from './pages/CategoryArchivePage';
// Removed: import { HelmetProvider, Helmet } from 'react-helmet-async'; // HelmetProvider moved to index.tsx

// Add gtag type to window for Google Analytics
declare global {
  interface Window {
    gtag?: (command: 'config', targetId: string, config: { page_path: string }) => void;
  }
}

const RouteHandler: React.FC = () => {
  const location = useLocation();

  // This useEffect handles scrolling to top on every route change.
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // This useEffect handles sending page views to Google Analytics for SPA navigation.
  React.useEffect(() => {
    // IMPORTANT: Ensure this ID matches the one in your index.html
    const GA_MEASUREMENT_ID = 'G-5KF10D0K31';
    
    // Check if gtag is available
    if (window.gtag) {
      // For HashRouter, location.pathname gives the path *after* the hash,
      // which is what we want for Google Analytics page_path.
      const pagePath = location.pathname + location.search;
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pagePath,
      });
    }
  }, [location.pathname, location.search]);

  return null;
};

const PageBreadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Do not show breadcrumbs on certain pages
  const noBreadcrumbPages = ['/inquire', '/search-results'];
  if (pathnames.length === 0 || noBreadcrumbPages.includes(location.pathname)) {
    return null;
  }

  const breadcrumbItems = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    let name = value.replace(/-/g, ' ');
    
    // Special case for hotel pages to show full name
    if (pathnames[0] === 'hotels' && index === 1) {
      const hotel = hotelsData.find(h => h.slug === value);
      name = hotel ? hotel.name : name;
    } else if (pathnames[0] === 'blog' && index >= 1) {
      // For blog posts and categories, show a formatted version of the slug.
      // The actual title is set on the page itself.
      name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    } else {
      // Capitalize first letter of each word for other pages
      name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return { name, path: to };
  });

  // Add Home to the beginning
  breadcrumbItems.unshift({ name: 'Home', path: '/' });

  // Filter out the 'Category' path part, which is just for routing structure and not needed in the breadcrumb trail.
  const finalItems = breadcrumbItems.filter(item => item.name.toLowerCase() !== 'category');

  // Only render if there's more than one item (Home > Current Page)
  if (finalItems.length <= 1) return null;


  return (
    <div className="container mx-auto px-6">
      <Breadcrumbs items={finalItems} />
    </div>
  );
};


const App: React.FC = () => {
  return (
    // Removed HelmetProvider from here, as it's now in index.tsx
      <CurrencyProvider>
        <HashRouter>
          <RouteHandler />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <PageBreadcrumbs />
              {/* FIX: Replaced v5 <Switch> with v6 <Routes> and updated Route props */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesListPage />} />
                <Route path="/hotels/:slug" element={<PropertyPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/category/:slug" element={<CategoryArchivePage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/inquire" element={<EmailInquiryPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/sustainability" element={<SustainabilityPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/search-results" element={<SearchResultsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ScrollToTopButton />
        </HashRouter>
      </CurrencyProvider>
  );
};

export default App;