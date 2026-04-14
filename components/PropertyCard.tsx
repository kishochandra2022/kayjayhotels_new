
import * as React from 'react';
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { Link } from 'react-router-dom';
import { Hotel } from '../types';
import LazyImage from './LazyImage';

interface PropertyCardProps {
  hotel: Hotel;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ hotel }) => {
  return (
    <Link to={`/hotels/${hotel.slug}`} className="group block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out border border-transparent hover:border-brand-primary/50 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden">
        <LazyImage
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-bold font-serif text-white">{hotel.name}</h3>
          <p className="text-sm text-gray-200 mt-1">{hotel.tagline}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 line-clamp-3 mb-4">{hotel.description}</p>
        <span className="font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
          Discover More &rarr;
        </span>
      </div>
    </Link>
  );
};

export default PropertyCard;