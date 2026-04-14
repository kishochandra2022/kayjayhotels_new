
import { Hotel } from '../types';

export const hotelsData: Hotel[] = [
  {
    id: '1',
    name: 'Kay Jay Beach Front', 
    slug: 'kayjay-beach-front', 
    tagline: 'Your Serene Beachfront Retreat', 
    description: 'Discover your tranquil escape at Kay Jay Beach Front, a boutique beach hotel in Wattala, Sri Lanka. With breathtaking sea views, a sparkling outdoor pool, and direct beach access, it’s the perfect setting for romantic getaways or peaceful family holidays, just 30 minutes from Bandaranaike International Airport (CMB) and Colombo city.', 
    seoTitle: 'Kay Jay Beach Front | Beachfront Hotel in Wattala, Sri Lanka', 
    seoDescription: 'Discover Kay Jay Beach Front, one of the premier beachfront hotels in Uswetakeiyawa, Wattala. Our coastal hotel near Colombo Airport offers stunning sea views, a serene pool, and direct beach access.', 
    location: '100E Bopitiya Road, Uswetakeiyawa 11328, Wattala, Sri Lanka',
    searchableAmenities: ['swimming pool', 'beach access', 'restaurant', 'bar', 'wifi', 'parking', 'weddings', 'events', 'air conditioning', 'hot water', 'sea view', 'coastal hotel', 'hotel in Uswetakeiyawa', 'beach hotel', 'beachfront hotel', 'event hall'], 
    images: [
      '/public/images/kayjay-amorea/hero.jpg', 
      '/public/images/kayjay-amorea/pool.jpg', 
      '/public/images/kayjay-amorea/room.jpg', 
      '/public/images/kayjay-amorea/beach.jpg'
    ],
    tripadvisorUrl: 'https://www.tripadvisor.com/Hotel_Review-g1188993-d12830850-Reviews-KayJay_Villa-Uswetakeiyawa_Western_Province.html?m=19905',
    starRating: 4,
    googleReviewUrl: 'https://g.page/r/CVxzOChopX1dEAE/review',
    facebookUrl: 'https://web.facebook.com/kayjaybeachfront', 
    instagramUrl: 'https://www.instagram.com/kayjay_beachfront', 
    rooms: [
      {
        id: '101',
        name: 'Standard Single',
        capacity: '1 Adult',
        price: { ro: 9960, bb: 10180, hf: 12040, fb: 13780 },
        features: ['Air Conditioning', 'Hot Water', 'Premium Amenities', 'Mini Fridge'],
        image: '/public/images/kayjay-amorea/room-standard-single.jpg',
        maxAdults: 1,
        maxChildren: 0,
      },
      {
        id: '102',
        name: 'Standard Double',
        capacity: '2 Adults',
        price: { ro: 9960, bb: 14400, hf: 18120, fb: 21600 },
        features: ['Air Conditioning', 'Hot Water', 'Premium Amenities', 'Television'],
        image: '/public/images/kayjay-amorea/room-standard-double.jpg',
        maxAdults: 2,
        maxChildren: 1,
      },
      {
        id: '103',
        name: 'Standard Triple',
        capacity: '3 Adults',
        price: { ro: 11960, bb: 18620, hf: 24200, fb: 29420 },
        features: ['Air Conditioning', 'Attached Bathroom', 'Spacious Layout'],
        image: '/public/images/kayjay-amorea/room-standard-triple.jpg',
        maxAdults: 3,
        maxChildren: 1,
      },
      {
        id: '104',
        name: 'Luxury Single',
        capacity: '1 Adult',
        price: { ro: 12380, bb: 14600, hf: 16460, fb: 18140 },
        features: ['Enhanced Amenities', 'Superior View', 'Plush Bedding'],
        image: '/public/images/kayjay-amorea/room-luxury-single.jpg',
        maxAdults: 1,
        maxChildren: 0,
      },
      {
        id: '105',
        name: 'Luxury Double',
        capacity: '2 Adults',
        price: { ro: 14880, bb: 19320, hf: 23040, fb: 26400 },
        features: ['Enhanced Amenities', 'Prime Location', 'Spacious Bathroom'],
        image: '/public/images/kayjay-amorea/room-luxury-double.jpg',
        maxAdults: 2,
        maxChildren: 1,
      },
      {
        id: '106',
        name: 'Luxury Triple',
        capacity: '3 Adults',
        price: { ro: 17380, bb: 24040, hf: 29620, fb: 34660 },
        features: ['Enhanced Amenities', 'Extra Space', 'Premium Comfort'],
        image: '/public/images/kayjay-amorea/room-luxury-triple.jpg',
        maxAdults: 3,
        maxChildren: 1,
      }
    ],
    detailedFeatures: [
      {
        title: 'Rooms & Accommodation',
        items: [
          "06 Standard Double Rooms | 02 Luxury Rooms",
          "Accommodates up to 16 Adults",
          "Inter-connecting & Air-conditioned Rooms",
          "In-Room: Air Conditioning, Hot Water, Attached Bathroom, Premium Amenities, Television, Mini Fridge"
        ]
      },
      {
        title: 'Dining & Entertainment',
        items: [
          "À La Carte Menu",
          "Restaurant & Bar",
          "Indoor & Outdoor Dining Spaces",
          "BBQ Arrangements (on request)",
          "Space for Curated Parties & Events"
        ]
      },
      {
        title: 'Recreation & Relaxation',
        items: [
          "Swimming Pool",
          "Direct Beach Access",
          "Yoga & Meditation"
        ]
      },
      {
        title: 'Events & Additional Benefits',
        items: [
          "Hall available for Weddings & Corporate Functions", // Updated from original to be more specific to events
          "Complimentary Wi-Fi",
          "Free Parking Space"
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Kay Jay Beach House',
    slug: 'kay-jay-beach-house',
    tagline: 'Pasikuda’s Pristine Beachfront Paradise',
    description: 'Set directly on the pristine shores of Kalkudah Bay, the Kay Jay Beach House is your perfect East Coast escape. With direct beach access, clear shallow waters ideal for swimming & snorkeling, and an inviting outdoor pool, it’s a secluded haven for romantic escapes, family holidays, and beach lovers.',
    seoTitle: 'Kay Jay Beach House | Pasikuda Beachfront Villa',
    seoDescription: "Escape to Kay Jay Beach House, a premier beachfront resort in Pasikuda, located on Kalkudah's pristine bay. As one of the top hotels in the Eastern Province of Sri Lanka, our villa offers a private pool and stunning sunrise views.",
    location: 'WH99+MR3, Old Pasikuda Road, Kalkudah 30410',
    searchableAmenities: ['swimming pool', 'beach access', 'sunrise view', 'biking', 'cycling', 'snorkeling', 'diving', 'fishing', 'atv riding', 'wifi', 'parking', 'air conditioning', 'hot water', 'sea view', 'resort in pasikuda', 'hotel in kalkudah', 'eastern province hotel', 'beachfront resort'],
    images: [
        '/public/images/kay-jay-beach-house/hero.jpg', 
        '/public/images/kay-jay-beach-house/view.jpg', 
        '/public/images/kay-jay-beach-house/pool.jpg', 
        '/public/images/kay-jay-beach-house/dining.jpg'
    ],
    tripadvisorUrl: 'https://www.tripadvisor.com/Hotel_Review-g2193270-d8335636-Reviews-KayJay_Beach_House-Kalkudah_Eastern_Province.html?m=19905',
    starRating: 4,
    googleReviewUrl: 'https://g.page/r/CV3mw5nwUXUiEAE/review',
    facebookUrl: 'https://web.facebook.com/KayJayBeachHouse/',
    instagramUrl: 'https://www.instagram.com/kayjaybeachhouse',
    rooms: [
      {
        id: '204',
        name: 'Full House',
        capacity: 'Up to 17 Guests',
        price: { ro: 128000, bb: 161150, hf: 195270, fb: 229450 },
        features: ['Exclusive Use of Entire Villa', 'All Rooms Included', 'Private Staff & Pool'],
        image: '/public/images/kay-jay-beach-house/full-house.jpg',
        maxAdults: 17,
        maxChildren: 8,
        totalCapacity: 17,
        isFullHouseBooking: true,
      },
      {
        id: '201',
        name: 'Double Room',
        capacity: '2 Adults',
        price: { ro: 15000, bb: 18900, hf: 22900, fb: 27900 },
        features: ['Sea View', 'Private Balcony', 'Comfortable Bedding'],
        image: '/public/images/kay-jay-beach-house/room-double.jpg',
        maxAdults: 2,
        maxChildren: 1,
      },
      {
        id: '202',
        name: 'Triple Room',
        capacity: '3 Adults',
        price: { ro: 20000, bb: 23900, hf: 27900, fb: 31300 },
        features: ['Extra Bed', 'Spacious Layout', 'Garden View'],
        image: '/public/images/kay-jay-beach-house/room-triple.jpg',
        maxAdults: 3,
        maxChildren: 1,
      },
      {
        id: '203',
        name: 'Suite',
        capacity: '2 Adults, 1 Child',
        price: { ro: 18000, bb: 23850, hf: 29850, fb: 34950 },
        features: ['Separate Living Area', 'Premium Amenities', 'Panoramic Views'],
        image: '/public/images/kay-jay-beach-house/room-suite.jpg',
        maxAdults: 2,
        maxChildren: 1,
      }
    ],
    detailedFeatures: [
      {
        title: 'Rooms & Accommodation',
        items: [
          "6 Double Rooms | 1 Triple Room | 1 Suite",
          "Accommodates up to 17 Adults",
          "Inter-connecting & Air-conditioned Rooms",
          "In-Room: Air Conditioning, Hot Water, Attached Bathroom, Premium Amenities"
        ]
      },
      {
        title: 'Exclusive Facilities & Experiences',
        items: [
          "Private Lobby Area with Wide Screen TV",
          "Swimming Pool",
          "Sunrise Viewpoint",
          "Dining & Drinks on the Beach",
          "À La Carte Menu",
          "BBQ Arrangements (Additional charges apply)"
        ]
      },
      {
        title: 'Activities & Recreation',
        items: [
          "Biking & Cycling",
          "Snorkeling, Diving & Fishing",
          "ATV Riding",
          "Board Games",
          "Water Sports at Pasikudah Beach"
        ]
      },
      {
        title: 'Additional Benefits',
        items: [
          "Complimentary Wi-Fi",
          "Free Parking Space"
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Kay Jay Palms',
    slug: 'kay-jay-palms',
    tagline: 'Your Tranquil Colonial Escape',
    description: 'Nestled in a 75-acre palm estate along Kalkudah Road, Pethalei, Kay Jay Palms offers a peaceful colonial-style retreat surrounded by lush greenery. With spacious rooms, a plantation-view pool, and authentic Sri Lankan hospitality, it’s the perfect base for relaxation, exploration, or nature photography.',
    seoTitle: 'Kay Jay Palms | Colonial Style Hotel in Pasikuda',
    seoDescription: "Relax at Kay Jay Palms, a colonial-style hotel in Pasikuda, one of the finest resorts in the Eastern Province of Sri Lanka. Set on a 75-acre palm estate near Kalkudah, we offer a serene pool and authentic hospitality.",
    location: 'Kay Jay Palms, B185, Kalkudah',
    searchableAmenities: ['swimming pool', 'plantation', 'bird watching', 'nature photography', 'cycling', 'bbq', 'wifi', 'parking', 'air conditioning', 'hot water', 'dormitory', 'colonial', 'resort in pasikuda', 'hotel in kalkudah', 'eastern province hotel'],
    images: [
        '/public/images/kay-jay-palms/hero.jpg', 
        '/public/images/kay-jay-palms/pool.jpg', 
        '/public/images/kay-jay-palms/garden.jpg', 
        '/public/images/kay-jay-palms/room.jpg'
    ],
    tripadvisorUrl: 'https://www.tripadvisor.com/Hotel_Review-g2193270-d23331139-Reviews-Kayjay_Palms-Kalkudah_Eastern_Province.html?m=19905',
    starRating: 4,
    googleReviewUrl: 'https://g.page/r/CX9iQxFEmfgLEAE/review',
    facebookUrl: 'https://web.facebook.com/kayjaypalms/',
    instagramUrl: 'https://www.instagram.com/kayjay_palms',
    rooms: [
        {
            id: '305',
            name: 'Full House',
            capacity: 'Up to 31 Guests',
            price: { ro: 136400, bb: 198400, hf: 260400, fb: 322400 },
            features: ['Entire Property', 'Private Pool & Gardens', 'Full Exclusivity'],
            image: '/public/images/kay-jay-palms/full-house.jpg',
            maxAdults: 31,
            maxChildren: 10,
            totalCapacity: 31,
            isFullHouseBooking: true,
        },
        {
            id: '301',
            name: 'Double & Twin Room',
            capacity: '2 Adults',
            price: { ro: 9900, bb: 13900, hf: 17900, fb: 21900 },
            features: ['Plantation View', 'Air Conditioning', 'Modern Bathroom'],
            image: '/public/images/kay-jay-palms/room-double.jpg',
            maxAdults: 2,
            maxChildren: 1,
        },
        {
            id: '302',
            name: 'Single Room',
            capacity: '1 Adult',
            price: { ro: 7200, bb: 9200, hf: 11200, fb: 13200 },
            features: ['Cozy & Comfortable', 'Garden View', 'Essential Amenities'],
            image: '/public/images/kay-jay-palms/room-single.jpg',
            maxAdults: 1,
            maxChildren: 0,
        },
        {
            id: '303',
            name: 'Triple Room',
            capacity: '3 Adults',
            price: { ro: 14900, bb: 20900, hf: 26900, fb: 32900 },
            features: ['Spacious for Three', 'Pool View', 'Extra Bedding'],
            image: '/public/images/kay-jay-palms/room-triple.jpg',
            maxAdults: 3,
            maxChildren: 1,
        },
        {
            id: '304',
            name: 'Dorm (6 Person)',
            capacity: 'Up to 6 Guests',
            price: { ro: 20000, bb: 32000, hf: 44000, fb: 56000 },
            features: ['Bunk Beds', 'Shared Facilities', 'Ideal for Groups'],
            image: '/public/images/kay-jay-palms/room-dorm.jpg',
            maxAdults: 6,
            maxChildren: 6,
            totalCapacity: 6,
        }
    ],
    detailedFeatures: [
      {
        title: 'Room & Property Configuration',
        items: ["Double, Twin, Single & Triple Rooms", "6-Person Dormitory", "Full House Option (Up to 31 Adults)", "Set in a 75-acre Palm Estate"]
      },
      {
        title: 'Facilities & Services',
        items: ["Plantation-view Swimming Pool", "Lush Green Gardens", "Authentic Sri Lankan Cuisine", "BBQ Facilities", "Free Wi-Fi", "Free Parking"]
      },
      {
        title: 'Activities & Experiences',
        items: ["Plantation Walks", "Bird Watching", "Nature Photography", "Relaxing Colonial Atmosphere", "Cycling"]
      },
      {
        title: 'Comfort & Convenience',
        items: ["Air-Conditioned Rooms", "Hot Water", "Modern Bathrooms", "Comfortable Luxury Rooms"]
      }
    ]
  },
  {
    id: '4',
    name: 'Kay Jay Wild',
    slug: 'kay-jay-wild',
    tagline: 'Your Immersive Safari Gateway',
    description: 'Bordering Wilpattu National Park in Eluwankulama, Kay Jay Wild is an eco-friendly lodge offering an authentic “back to nature” experience. Perfect for safari enthusiasts, our rustic chalets and immersive environment provide a front-row seat to Sri Lanka’s incredible wildlife, just moments from the park entrance.',
    seoTitle: 'Kay Jay Wild | Wilpattu National Park Safari Lodge',
    seoDescription: "Experience an authentic safari at Kay Jay Wild, one of the leading safari lodges near Wilpattu National Park. Our eco-friendly Wilpattu hotel offers rustic chalets and guided jeep tours for your ultimate wildlife adventure.",
    location: 'Old Eluwankulama Eluwankulama, wilpattu, Eluwankulama 61308',
    searchableAmenities: ['safari', 'national park', 'wildlife', 'eco-friendly', 'bonfire', 'jeep tours', 'bird watching', 'nature', 'chalets', 'bbq', 'wilpattu hotel', 'safari lodge'],
    images: [
      '/public/images/kay-jay-wild/hero.jpg',
      '/public/images/kay-jay-wild/chalet.jpg',
      '/public/images/kay-jay-wild/jeep.jpg',
      '/public/images/kay-jay-wild/lodge.jpg'
    ],
    tripadvisorUrl: 'https://www.tripadvisor.com/Hotel_Review-g12549273-d20304514-Reviews-Kay_Jay_Wild_Wilpattu-Eluwankulam_North_Western_Province.html?m=19905',
    starRating: 4,
    googleReviewUrl: 'https://g.page/r/CTubzrmk_VcIEAE/review',
    facebookUrl: 'https://web.facebook.com/kayjaywild',
    instagramUrl: 'https://www.instagram.com/kayjaywildwilpattu',
    rooms: [
      {
        id: '405',
        name: 'Full House',
        capacity: 'Up to 30 Guests',
        price: { ro: 134300, bb: 188100, hf: 257300, fb: 330500 },
        features: ['Exclusive Use of Entire Lodge', 'All Chalets & Dorm Included', 'Private Staff & Bonfire'],
        image: '/public/images/kay-jay-wild/lodge.jpg',
        maxAdults: 30,
        maxChildren: 15,
        totalCapacity: 30,
        isFullHouseBooking: true,
      },
      {
        id: '403',
        name: 'Dorm (20 Person)',
        capacity: 'Up to 20 Guests',
        price: { ro: 50000, bb: 63000, hf: 80000, fb: 99000 },
        features: ['Bunk Beds', 'Shared Facilities', 'Perfect for Large Groups'],
        image: '/public/images/kay-jay-wild/room-dorm.jpg',
        maxAdults: 20,
        maxChildren: 20,
        totalCapacity: 20,
      },
      {
        id: '401',
        name: 'Double Room',
        capacity: '2 Adults',
        price: { ro: 11300, bb: 14600, hf: 18900, fb: 23400 },
        features: ['Jungle View', 'Air Conditioning', 'Private Veranda'],
        image: '/public/images/kay-jay-wild/room-chalet.jpg',
        maxAdults: 2,
        maxChildren: 1,
      },
      {
        id: '402',
        name: 'Standard Double Room',
        capacity: '2 Adults',
        price: { ro: 7500, bb: 11500, hf: 15500, fb: 19500 },
        features: ['Air Conditioning', 'Attached Bathroom', 'Comfortable & Cozy'],
        image: '/public/images/kay-jay-wild/chalet.jpg',
        maxAdults: 2,
        maxChildren: 1,
      },
      {
        id: '404',
        name: 'Single Room',
        capacity: '1 Adult',
        price: { ro: 4500, bb: 6300, hf: 8000, fb: 9900 },
        features: ['Jungle View', 'Air Conditioning', 'Ideal for Solo Travelers'],
        image: '/public/images/kay-jay-wild/room-single.jpg',
        maxAdults: 1,
        maxChildren: 0,
      }
    ],
    detailedFeatures: [
      {
        title: 'Accommodation & Chalets',
        items: [
          "Standard & Family Chalets",
          "20-Person Dormitory",
          "Air-Conditioned Rooms",
          "Private Verandas with Jungle Views"
        ]
      },
      {
        title: 'Safari & Experiences',
        items: [
          "Wilpattu National Park Jeep Safaris",
          "Guided Nature Walks",
          "Bird Watching Tours",
          "Bonfire & BBQ Nights"
        ]
      },
      {
        title: 'Lodge Facilities',
        items: [
          "Open-air Restaurant",
          "Eco-friendly Design",
          "Free Wi-Fi in Common Areas",
          "Free Parking"
        ]
      }
    ]
  }
];