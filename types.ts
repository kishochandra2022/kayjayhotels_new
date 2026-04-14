
export interface FeatureCategory {
  title: string;
  items: string[];
}

export interface RoomPrice {
  ro: number;
  bb: number;
  hf: number;
  fb: number;
}

export interface Room {
  id: string;
  name: string;
  capacity: string;
  price: RoomPrice; 
  features: string[];
  image: string;
  maxAdults: number;
  maxChildren: number;
  totalCapacity?: number;
  isFullHouseBooking?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  location: string;
  searchableAmenities: string[];
  images: string[];
  rooms: Room[];
  detailedFeatures?: FeatureCategory[];
  tripadvisorUrl?: string;
  starRating?: number;
  googleReviewUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

// --- Currency Types ---
export type Currency = 'LKR' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD';

export const supportedCurrencies: Currency[] = ['LKR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD'];

// All Context-related definitions and components have been moved to CurrencyConverter.tsx
// to resolve a module resolution issue (React error #301).

// --- Blog Types ---
export interface Category {
  id: number;
  name: string;
  slug: string;
  link: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  link: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  date: string; // ISO 8601 format
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: {
      id: number;
      source_url: string;
      alt_text: string;
    }[];
    author?: {
      id: number;
      name: string;
      link: string;
    }[];
    'wp:term'?: (Category[] | Tag[])[]; // First element is categories, second is tags
  };
}