
import * as React from 'react';
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

interface Image {
  url: string;
  alt: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

interface ImageCarouselProps {
  images: Image[];
  isHero?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, isHero = false }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (isHero && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length, isHero]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  const carouselHeight = isHero ? 'h-[calc(100vh-80px)]' : 'h-[500px]';

  return (
    <div className={`relative w-full ${carouselHeight} overflow-hidden`}>
      <div
        className="relative w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <LazyImage
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ))}
      </div>

      {isHero && currentImage.title && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 z-10 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold font-serif drop-shadow-lg">
            {currentImage.title}
          </h1>
          {currentImage.subtitle && (
            <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">
              {currentImage.subtitle}
            </p>
          )}
          {currentImage.link && (
            <Link
              to={currentImage.link}
              className="mt-8 bg-brand-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Discover More
            </Link>
          )}
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all duration-300 z-20
              ${isHero ? 'left-4 md:left-8 p-3' : 'left-4 p-2'}`}
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={isHero ? "h-8 w-8" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className={`absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all duration-300 z-20
              ${isHero ? 'right-4 md:right-8 p-3' : 'right-4 p-2'}`}
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={isHero ? "h-8 w-8" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;