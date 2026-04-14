import * as React from 'react';
// FIX: Replaced useHistory with useNavigate for v6 compatibility.
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { useNavigate } from 'react-router-dom';
import { Hotel, Room } from '../types';
import { useCurrency } from './CurrencyConverter';
import LazyImage from './LazyImage';
import WhatsAppButton from './WhatsAppButton';
import InquiryDisclaimer from './InquiryDisclaimer';
import { saveInquirySubmission } from '../lib/supabase';

const FeatureIcon: React.FC<{ feature: string }> = ({ feature }) => {
  const lowerFeature = feature.toLowerCase();
  const iconClass = "w-4 h-4 mr-2 text-brand-primary flex-shrink-0";

  // Icons from Heroicons (https://heroicons.com/)
  if (lowerFeature.includes('air conditioning')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path d="M10 3.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V4.25A.75.75 0 0110 3.5zM10 15.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.25 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H5a.75.75 0 01-.75-.75zm11.25-.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM6.01 6.01a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06L6.01 7.07a.75.75 0 010-1.06zm9.9 9.9a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM13.99 6.01a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm-9.9 9.9a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z" /></svg>;
  if (lowerFeature.includes('hot water') || lowerFeature.includes('bathroom')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path d="M5.25 3.5A2.25 2.25 0 003 5.75v1.25a.75.75 0 001.5 0V6h.25a.75.75 0 000-1.5H4.5V3.5h-.75a.75.75 0 00-.75.75V15.5a.75.75 0 001.5 0V14h.25a.75.75 0 000-1.5H5.25v-.5h3.5a.75.75 0 000-1.5h-3.5v-1h5.5a.75.75 0 000-1.5h-5.5v-1h4.5a.75.75 0 000-1.5h-4.5v-.5zM15.5 15.5a.75.75 0 01-.75-.75V5.75a2.25 2.25 0 00-2.25-2.25H9.25a.75.75 0 000 1.5h3.25A.75.75 0 0113.25 6v9.5a.75.75 0 01-1.5 0v-1h-.25a.75.75 0 000 1.5h.25v.5h-3.5a.75.75 0 000 1.5h3.5v1h-5.5a.75.75 0 000 1.5h5.5v1h-4.5a.75.75 0 000 1.5h4.5v.5a.75.75 0 001.5 0V15.5z" /></svg>;
  if (lowerFeature.includes('amenities') || lowerFeature.includes('premium')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.868 2.884c.321.64.321 1.415 0 2.055l-1.46 2.92a1 1 0 00.954 1.46h2.92c.64 0 1.415-.32 2.055-.954l2.92-1.46a1 1 0 000-2.055L14.798 4.4a1 1 0 00-.954-1.46H10.92a1 1 0 00-.954 1.46l1.46 2.92z" clipRule="evenodd" /><path fillRule="evenodd" d="M10.868 15.116c.321-.64.321-1.415 0-2.055l-1.46-2.92a1 1 0 00-.954-1.46H5.53l-1.46 2.92c-.32.64-.32 1.415 0 2.055l1.46 2.92a1 1 0 00.954 1.46h13.88a1 1 0 00.954-1.46l1.46-2.92c.32-.64.32-1.415 0-2.055l-1.46-2.92a1 1 0 00-.954-1.46H11.822a1 1 0 00-.954 1.46l1.46 2.92z" clipRule="evenodd" /></svg>;
  if (lowerFeature.includes('fridge')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path d="M3 3.5A1.5 1.5 0 014.5 2h11A1.5 1.5 0 0117 3.5v13A1.5 1.5 0 0115.5 18h-11A1.5 1.5 0 013 16.5v-13zM5 4.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h10a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5H5z" /></svg>;
  if (lowerFeature.includes('television')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path d="M3.5 4A1.5 1.5 0 002 5.5v6.5A1.5 1.5 0 003.5 14h13a1.5 1.5 0 001.5-1.5V5.5A1.5 1.5 0 0016.5 4h-13zM8 15.5a1 1 0 102 0 1 1 0 00-2 0zM12 15.5a1 1 0 102 0 1 1 0 00-2 0z" /></svg>;
  if (lowerFeature.includes('view') || lowerFeature.includes('panoramic')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /><path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.18l.88-1.84a1.65 1.65 0 011.522-.88h13.868a1.65 1.65 0 011.522.88l.88 1.84a1.651 1.651 0 010 1.18l-.88 1.84a1.65 1.65 0 01-1.522-.88H3.066a1.65 1.65 0 01-1.522-.88l-.88-1.84zM10 14a4 4 0 100-8 4 4 0 000 8z" clipRule="evenodd" /></svg>;
  if (lowerFeature.includes('spacious') || lowerFeature.includes('space')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M15 5.25a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-.28l-2.47 2.47a.75.75 0 11-1.06-1.06L15.72 6h-.22a.75.75 0 01-.75-.75zM5.25 15a.75.75 0 01.75-.75h.28l2.47-2.47a.75.75 0 011.06 1.06L7.53 15h.22a.75.75 0 010 1.5H5.5a.75.75 0 01-.75-.75v-2.25c0-.414.336-.75.75-.75zM15 15.75a.75.75 0 01.75.75v.28l2.47-2.47a.75.75 0 111.06 1.06L18 15.72v.28a.75.75 0 01-1.5 0V14.5a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75zM4.25 5.25a.75.75 0 01.75.75v.28l2.47-2.47a.75.75 0 111.06 1.06L6.47 7.5h.28a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75V5.5a.75.75 0 01.75-.75z" clipRule="evenodd" /></svg>;
  if (lowerFeature.includes('bed') || lowerFeature.includes('comfort')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path d="M3.5 4.5a.5.5 0 01.5-.5h12a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-5zM3 11.5A1.5 1.5 0 014.5 10h11A1.5 1.5 0 0117 11.5v2A1.5 1.5 0 0115.5 15h-11A1.5 1.5 0 013 13.5v-2z" /></svg>;
  if (lowerFeature.includes('balcony') || lowerFeature.includes('veranda')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2-2H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v2h12V5a1 1 0 00-1-1H5z" clipRule="evenodd" /></svg>;
  if (lowerFeature.includes('group') || lowerFeature.includes('dorm') || lowerFeature.includes('shared')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM1.146 16.854a.5.5 0 01.708 0L4 18.293l2.146-2.147a.5.5 0 01.708 0L9.146 18.5l2.147-2.146a.5.5 0 01.708 0l2.292 2.292a.5.5 0 01-.708.708L12 17.707l-2.146 2.147a.5.5 0 01-.708 0L7.146 17.5 5 19.646a.5.5 0 01-.708-.708l2.293-2.293L1.146 16.854z" /><path d="M13 8a3 3 0 100-6 3 3 0 000 6z" /></svg>;
  if (lowerFeature.includes('private') || lowerFeature.includes('exclusive') || lowerFeature.includes('entire')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>;
  if (lowerFeature.includes('pool')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.25 8.263a.75.75 0 011.08-.62l7.5 4.25a.75.75 0 010 1.24l-7.5 4.25a.75.75 0 01-1.08-.62V8.263z" clipRule="evenodd" /></svg>;
  if (lowerFeature.includes('safari') || lowerFeature.includes('jungle') || lowerFeature.includes('nature') || lowerFeature.includes('garden')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path d="M10.75 1.5a.75.75 0 00-1.5 0v3.313c-1.31.25-2.52.73-3.565 1.393a.75.75 0 00.5 1.365C7.26 7.02 8.441 6.5 10 6.5s2.74.52 3.815 1.071a.75.75 0 00.5-1.365C13.27 5.542 12.06 5.062 10.75 4.813V1.5z" /><path fillRule="evenodd" d="M9.25 8.25v.938a8.23 8.23 0 00-2.28.32.75.75 0 00.22 1.488 6.73 6.73 0 012.06-.282V12.5H8a3 3 0 103 3v-3.375a3.001 3.001 0 002.823 2.125.75.75 0 10.354-1.448A1.5 1.5 0 0112.5 12.5H11V8.25a.75.75 0 00-1.5 0h-.25z" clipRule="evenodd" /></svg>;
  
  // Default icon
  return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>;
};

interface RoomCardProps {
  hotel: Hotel;
  room: Room;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren?: number;
  // FIX: Added 'key' to RoomCardProps to satisfy the type checker, as it was being incorrectly inferred as a direct prop in the JSX instantiation.
  key?: React.Key;
}

// Refactored to use export default function
export default function RoomCard({
  hotel,
  room,
  initialCheckIn = '',
  initialCheckOut = '',
  initialAdults = 1,
  initialChildren = 0,
}: RoomCardProps) {
  const { getConvertedPrice } = useCurrency();
  // FIX: Replaced useHistory with useNavigate for v6 compatibility.
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [checkIn, setCheckIn] = React.useState(initialCheckIn);
  const [checkOut, setCheckOut] = React.useState(initialCheckOut);
  const [adults, setAdults] = React.useState(initialAdults);
  const [children, setChildren] = React.useState(initialChildren);
  const [mealPlan, setMealPlan] = React.useState<'ro' | 'bb' | 'hf' | 'fb'>('ro');
  const [error, setError] = React.useState<string | null>(null);
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = React.useState(false);

  React.useEffect(() => {
    setCheckIn(initialCheckIn);
    setCheckOut(initialCheckOut);
    setAdults(initialAdults);
    setChildren(initialChildren);
  }, [initialCheckIn, initialCheckOut, initialAdults, initialChildren]);

  const generateOptions = (start: number, end: number) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  const validate = () => {
    setError(null);
    let isValid = true;
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      isValid = false;
    } else if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after the check-in date.');
      isValid = false;
    }
    if (adults < 1) {
      setError('At least one adult must be selected.');
      isValid = false;
    }

    const totalGuests = adults + children;
    const roomCapacity = room.maxAdults + room.maxChildren;

    if (adults > room.maxAdults || children > room.maxChildren || totalGuests > roomCapacity) {
      // Special case for single occupancy rooms where maxAdults is 1 and totalGuests is 1.
      // This prevents the error message from showing when a single room is selected for a single guest.
      if (room.maxAdults === 1 && room.maxChildren === 0 && adults === 1 && children === 0) {
        return isValid;
      }
      setError(
        'The selected number of guests exceeds this room\'s capacity. Please choose fewer guests or send a custom inquiry.'
      );
      isValid = false;
    }

    return isValid;
  };

  const handleEmailInquiry = () => {
    if (!validate()) return;

    const totalGuests = adults + children;
    const roomCapacity = room.maxAdults + room.maxChildren;
    const isCustom = adults > room.maxAdults || children > room.maxChildren || totalGuests > roomCapacity;

    const params = new URLSearchParams({
      hotelName: hotel.name,
      roomName: room.name,
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      mealPlan: mealPlan.toUpperCase(),
      ...(isCustom && { custom: 'true' }),
    });
    // FIX: Replaced history.push() with navigate() for v6 compatibility.
    navigate(`/inquire?${params.toString()}`);
  };

  const handleWhatsAppInquiry = async () => {
    if (!validate()) return;

    const totalGuests = adults + children;
    const roomCapacity = room.maxAdults + room.maxChildren;
    const isCustom = adults > room.maxAdults || children > room.maxChildren || totalGuests > roomCapacity;

    const dbPayload = {
      name: '', // Will be filled in the inquiry page
      email: '', // Will be filled in the inquiry page
      phone: '', // Will be filled in the inquiry page
      hotel_name: hotel.name,
      room_name: room.name,
      check_in: checkIn,
      check_out: checkOut,
      adults: adults,
      children: children,
      meal_plan: mealPlan.toUpperCase(),
      is_custom_inquiry: isCustom,
      submission_type: 'WHATSAPP' as const,
    };

    try {
      await saveInquirySubmission(dbPayload);
    } catch (error) {
      console.warn('Supabase submission failed for WhatsApp inquiry, but proceeding to open WhatsApp:', error);
    }

    const customNote = isCustom ? `\n\n(Note: This is a custom inquiry as guest count exceeds standard room capacity.)` : "";

    const message = `*New Inquiry - Kayjay Hotels*

Hello, I would like to inquire about the following booking:

*Property:* ${hotel.name}
*Room:* ${room.name}
*Check-in:* ${checkIn || 'Not specified'}
*Check-out:* ${checkOut || 'Not specified'}
*Guests:* ${adults} Adults, ${children} Children
*Meal Plan:* ${mealPlan.toUpperCase()}
${customNote}

Please let me know about availability and pricing.
Thank you.`;
    const phoneNumber = "94742021777";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const inputClasses = "mt-1 w-full text-base px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-brand-primary focus:border-brand-primary";
  const labelClasses = "block text-sm font-medium text-gray-700";
  const disabledButtonClasses = "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row">
      <div className="lg:w-1/3 relative">
        <LazyImage src={room.image} alt={room.name} className="w-full h-64 lg:h-full object-cover" />
      </div>
      <div className="lg:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-bold font-sans text-brand-dark">{room.name}</h3>
          <p className="text-gray-600 mt-1 text-lg">{room.capacity}</p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
            {room.features.map(feature => (
              <li key={feature} className="flex items-center text-gray-700">
                <FeatureIcon feature={feature} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 bg-brand-gray/50 p-4 rounded-xl border border-brand-gray">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`check-in-${room.id}`} className={labelClasses}>Check-in</label>
              <input type="date" id={`check-in-${room.id}`} value={checkIn} onChange={e => setCheckIn(e.target.value)} min={today} className={inputClasses} />
            </div>
            <div>
              <label htmlFor={`check-out-${room.id}`} className={labelClasses}>Check-out</label>
              <input type="date" id={`check-out-${room.id}`} value={checkOut} onChange={e => setCheckOut(e.target.value)} min={checkIn || today} className={inputClasses} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`adults-${room.id}`} className={labelClasses}>Adults</label>
                <select id={`adults-${room.id}`} value={adults} onChange={e => setAdults(parseInt(e.target.value, 10))} className={inputClasses}>
                  {generateOptions(1, room.maxAdults)}
                </select>
              </div>
              <div>
                <label htmlFor={`children-${room.id}`} className={labelClasses}>Children</label>
                <select id={`children-${room.id}`} value={children} onChange={e => setChildren(parseInt(e.target.value, 10))} className={inputClasses}>
                  {generateOptions(0, room.maxChildren)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor={`meal-plan-${room.id}`} className={labelClasses}>Meal Plan</label>
              <select id={`meal-plan-${room.id}`} value={mealPlan} onChange={e => setMealPlan(e.target.value as 'ro' | 'bb' | 'hf' | 'fb')} className={inputClasses}>
                <option value="ro">Room Only (RO) - {getConvertedPrice(room.price.ro)}</option>
                <option value="bb">Bed & Breakfast (BB) - {getConvertedPrice(room.price.bb)}</option>
                <option value="hf">Half Board (HB) - {getConvertedPrice(room.price.hf)}</option>
                <option value="fb">Full Board (FB) - {getConvertedPrice(room.price.fb)}</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <InquiryDisclaimer isChecked={isDisclaimerAccepted} onToggle={setIsDisclaimerAccepted} />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button type="button" onClick={handleEmailInquiry} disabled={!isDisclaimerAccepted} className={`w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-brand-dark transition-colors duration-300 flex items-center justify-center ${disabledButtonClasses}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                Email Inquiry
              </button>
              <WhatsAppButton onClick={handleWhatsAppInquiry} className={`w-full bg-green-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-600 transition-colors duration-300 flex items-center justify-center ${disabledButtonClasses}`} disabled={!isDisclaimerAccepted}>
                WhatsApp Inquiry
              </WhatsAppButton>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}