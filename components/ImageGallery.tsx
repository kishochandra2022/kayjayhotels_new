
import * as React from 'react';
import LazyImage from './LazyImage';

interface ImageGalleryProps {
  images: string[];
  hotelName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, hotelName }) => {
  if (!images || images.length === 0) {
    return (
      <div className="container mx-auto px-6 pt-8">
        <div className="bg-brand-gray h-96 w-full rounded-xl animate-pulse"></div>
      </div>
    );
  }

  const mainImage = images[0];
  const galleryImages = images.slice(1);

  // Single image layout
  if (images.length === 1) {
    return (
      <div className="container mx-auto px-6 pt-8">
        <div className="h-auto md:h-[550px] rounded-xl overflow-hidden">
          <LazyImage
            src={mainImage}
            alt={`Main view of ${hotelName}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  // Multi-image layout (2 to 5+ images)
  return (
    <div className="container mx-auto px-6 pt-8">
      <div className="flex flex-col md:flex-row gap-2 h-auto md:h-[550px] rounded-xl overflow-hidden">
        {/* Main Image */}
        <div className="flex-1 h-80 md:h-full">
          <LazyImage
            src={mainImage}
            alt={`Main view of ${hotelName}`}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Gallery Images */}
        {galleryImages.length > 0 && (
          <div className="flex-1 h-auto md:h-full grid grid-cols-2 grid-rows-2 gap-2">
            {galleryImages.slice(0, 4).map((image, index) => (
              <div key={image} className="h-40 md:h-full">
                 <LazyImage
                    src={image}
                    alt={`View ${index + 2} of ${hotelName}`}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;