

import * as React from 'react';
import LazyImage from './LazyImage';

const slides = [
  {
    image: "/public/images/kay-jay-beach-house/hero.jpg",
    title: "Unforgettable Stays in Sri Lanka",
    description: "Luxury in every detail, unique island experiences."
  },
  {
    image: "/public/images/kayjay-amorea/beach.jpg", 
    title: "Kay Jay Beach Front – Your Serene Coastal Retreat",
    description: "Tranquil escape, 30 minutes from Colombo."
  },
  {
    image: "/public/images/kay-jay-palms/hero.jpg",
    title: "Colonial Charm in Nature’s Embrace",
    description: "Relax in a 75-acre palm estate, lush greenery, timeless architecture."
  },
  {
    image: "/public/images/kay-jay-wild/hero.jpg",
    title: "Safari Adventures at Wilpattu",
    description: "Authentic wildlife escapes, guided safaris, bonfire nights."
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToProperties = () => {
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { image, title, description } = slides[currentSlide];

  return (
    <div className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <LazyImage
        src={image}
        alt={title}
        className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
        placeholderClassName="bg-gray-800"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content */}
      <div key={currentSlide} className="relative z-10 p-6 md:p-10 animate-slide">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-tight drop-shadow-xl transition-opacity duration-1000">
          {title}
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-4xl mx-auto font-light text-gray-100 drop-shadow-lg transition-opacity duration-1000">
          {description}
        </p>
        <button
          onClick={scrollToProperties}
          className="mt-8 bg-brand-primary text-white font-bold py-3 px-6 md:px-8 rounded-xl text-base md:text-lg hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Explore Our Properties
        </button>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 p-2 md:p-3 rounded-full hover:bg-white/40 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 p-2 md:p-3 rounded-full hover:bg-white/40 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/30'
            } transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;