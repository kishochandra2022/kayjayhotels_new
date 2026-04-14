
import * as React from 'react';
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const highlightData = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Immersive Safari Gateway',
    subtitle: 'at Kay Jay Wild',
    imageUrl: '/public/images/kay-jay-wild/jeep.jpg',
    link: '/hotels/kay-jay-wild',
  },
  {
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945C21.405 11 22 10.405 22 9.75V9A.75.75 0 0021.25 8.25h-1.945a2 2 0 01-2-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v1a2 2 0 01-2 2H1.25A.75.75 0 00.5 9v.75c0 .655.595 1.25 1.25 1.25H3.055z" /></svg>
    ),
    title: 'Tranquil Poolside Relaxation',
    subtitle: 'at Kay Jay Palms',
    imageUrl: '/public/images/kay-jay-palms/pool.jpg',
    link: '/hotels/kay-jay-palms',
  },
  {
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    ),
    title: 'Pristine Beachfront Paradise',
    subtitle: 'at Kay Jay Beach Front',
    imageUrl: '/public/images/kay-jay-beach-house/view.jpg',
    link: '/hotels/kayjay-beach-front', // Updated slug
  },
];

const ExperienceHighlights: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark">Discover Unique Experiences</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Each of our properties offers a distinct adventure. Find the one that calls to you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlightData.map((item) => (
            <Link key={item.title} to={item.link} className="group block rounded-lg shadow-lg overflow-hidden relative transform hover:-translate-y-2 transition-transform duration-300">
              <LazyImage src={item.imageUrl} alt={item.title} className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold font-sans">{item.title}</h3>
                <p className="text-gray-300">{item.subtitle}</p>
                <span className="mt-4 inline-block font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Now &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceHighlights;