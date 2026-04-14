import * as React from 'react';

interface LocationMapProps {
  location: string;
  hotelName: string;
  showButton?: boolean;
  showHeading?: boolean;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  location, 
  hotelName, 
  showButton = true, 
  showHeading = true,
  className = '' 
}) => {
  const encodedLocation = encodeURIComponent(`${hotelName}, ${location}`);
  const mapUrl = `https://maps.google.com/maps?q=${encodedLocation}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;

  return (
    <div className={className}>
      {showHeading && (
        <h3 className="text-2xl font-bold font-sans text-brand-dark mb-4">
          Location
        </h3>
      )}
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group relative rounded-lg overflow-hidden shadow-md border border-gray-200 cursor-pointer"
        aria-label={`Open Google Maps directions to ${hotelName}`}
      >
        {/* Responsive container using padding-top trick for a 2:1 aspect ratio */}
        <div className="relative w-full" style={{ paddingTop: '50%' /* 1 / 2 = 50% */ }}>
          <iframe
            src={mapUrl}
            style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${hotelName}`}
            className="pointer-events-none" // Prevents the iframe from capturing mouse events
          ></iframe>
        </div>
        {/* Hover overlay to provide user feedback */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black/50 px-4 py-2 rounded-md flex items-center text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.75 1.5a.75.75 0 00-1.5 0v3.313c-1.31.25-2.52.73-3.565 1.393a.75.75 0 00.5 1.365C7.26 7.02 8.441 6.5 10 6.5s2.74.52 3.815 1.071a.75.75 0 00.5-1.365C13.27 5.542 12.06 5.062 10.75 4.813V1.5z" />
                    <path fillRule="evenodd" d="M9.25 8.25v.938a8.23 8.23 0 00-2.28.32.75.75 0 00.22 1.488 6.73 6.73 0 012.06-.282V12.5H8a3 3 0 103 3v-3.375a3.001 3.001 0 002.823 2.125.75.75 0 10.354-1.448A1.5 1.5 0 0112.5 12.5H11V8.25a.75.75 0 00-1.5 0h-.25z" clipRule="evenodd" />
                </svg>
                Click for directions
            </div>
        </div>
      </a>
      {showButton && (
        <div className="mt-4 text-center">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Directions
          </a>
        </div>
      )}
    </div>
  );
};

export default LocationMap;