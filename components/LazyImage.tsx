
import * as React from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, placeholderClassName }) => {
  const [currentSrc, setCurrentSrc] = React.useState<string | undefined>(undefined);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !currentSrc) { // Only set src if not already set
          setCurrentSrc(src);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '100px', // Load images 100px before they enter the viewport
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src, currentSrc]); // Add currentSrc to dependency array to re-run if it changes

  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Placeholder that fades out */}
      <div 
        className={`${placeholderClassName || 'bg-gray-300'} absolute inset-0 transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      <img
        ref={imgRef}
        src={currentSrc} // Use currentSrc for the actual image source
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        // No native loading="lazy" as IntersectionObserver handles it
      />
    </div>
  );
};

export default LazyImage;