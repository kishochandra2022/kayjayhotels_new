import * as React from 'react';
// FIX: Replaced useHistory with useNavigate for v6 compatibility.
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { useNavigate } from 'react-router-dom';
import { Hotel, Room } from '../types';
import { useCurrency } from './CurrencyConverter';
import LazyImage from './LazyImage';
import WhatsAppButton from './WhatsAppButton';
import InquiryDisclaimer from './InquiryDisclaimer';

const FeatureIcon: React.FC<{ feature: string }> = ({ feature }) => {
  const lowerFeature = feature.toLowerCase();
  const iconClass = "w-4 h-4 mr-2 text-brand-primary flex-shrink-0";
  if (lowerFeature.includes('private') || lowerFeature.includes('exclusive') || lowerFeature.includes('entire')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>;
  if (lowerFeature.includes('pool')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.25 8.263a.75.75 0 011.08-.62l7.5 4.25a.75.75 0 010 1.24l-7.5 4.25a.75.75 0 01-1.08-.62V8.263z" clipRule="evenodd" /></svg>;
  if (lowerFeature.includes('group') || lowerFeature.includes('rooms') || lowerFeature.includes('staff')) return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM1.146 16.854a.5.5 0 01.708 0L4 18.293l2.146-2.147a.5.5 0 01.708 0L9.146 18.5l2.147-2.146a.5.5 0 01.708 0l2.292 2.292a.5.5 0 01-.708.708L12 17.707l-2.146 2.147a.5.5 0 01-.708 0L7.146 17.5 5 19.646a.5.5 0 01-.708-.708l2.293-2.293L1.146 16.854z" /><path d="M13 8a3 3 0 100-6 3 3 0 000 6z" /></svg>;
  return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>;
};

interface FullHouseCardProps {
  hotel: Hotel;
  room: Room;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren?: number;
  // FIX: Added 'key' to FullHouseCardProps to satisfy the type checker, as it was being incorrectly inferred as a direct prop in the JSX instantiation.
  key?: React.Key;
}

const FullHouseCard: React.FC<FullHouseCardProps> = ({ 
  hotel, 
  room, 
  initialCheckIn = '', 
  initialCheckOut = '', 
  initialAdults, 
  initialChildren = 0 
}) => {
    const { getConvertedPrice } = useCurrency();
    // FIX: Replaced useHistory with useNavigate for v6 compatibility.
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];

    const [checkIn, setCheckIn] = React.useState(initialCheckIn);
    const [checkOut, setCheckOut] = React.useState(initialCheckOut);
    const [adults, setAdults] = React.useState(initialAdults || room.maxAdults || 10);
    const [children, setChildren] = React.useState(initialChildren);
    const [mealPlan, setMealPlan] = React.useState<'ro' | 'bb' | 'hf' | 'fb'>('ro');
    const [error, setError] = React.useState<string | null>(null);
    const [isDisclaimerAccepted, setIsDisclaimerAccepted] = React.useState(false);

    React.useEffect(() => {
        setCheckIn(initialCheckIn);
        setCheckOut(initialCheckOut);
        setAdults(initialAdults || room.maxAdults || 10);
        setChildren(initialChildren);
    }, [initialCheckIn, initialCheckOut, initialAdults, initialChildren, room.maxAdults]);
    
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
        return isValid;
    };

    const handleInquiry = () => {
        if (!validate()) return;
        const params = new URLSearchParams({
            hotelName: hotel.name,
            roomName: room.name,
            checkIn,
            checkOut,
            adults: adults.toString(),
            children: children.toString(),
            mealPlan: mealPlan.toUpperCase(),
            custom: "true", // Full house booking is always a custom inquiry
        });
        // FIX: Replaced history.push() with navigate() for v6 compatibility.
        navigate(`/inquire?${params.toString()}`);
    };
    
    const inputClasses = "mt-1 w-full text-base px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary";
    const labelClasses = "block text-sm font-medium text-gray-700";
    const disabledButtonClasses = "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70";

    return (
      <div className="bg-yellow-50 border-2 border-brand-primary/80 rounded-lg shadow-xl overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/3 relative">
          <LazyImage src={room.image} alt={room.name} className="w-full h-64 lg:h-full object-cover" />
          <div className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg">
            Exclusive Booking
          </div>
        </div>
        <div className="lg:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold font-sans text-brand-dark flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
              </svg>
              Book the Entire Property
            </h3>
            <p className="text-gray-600 mt-1 text-lg">Your own private retreat at {hotel.name}</p>
            <div className="flex items-center text-brand-dark mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="font-bold text-xl">{room.capacity}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {room.features.map(feature => (
                <li key={feature} className="flex items-center text-gray-700">
                  <FeatureIcon feature={feature} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
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
                    {generateOptions(1, room.totalCapacity || 30)}
                  </select>
                </div>
                <div>
                  <label htmlFor={`children-${room.id}`} className={labelClasses}>Children</label>
                  <select id={`children-${room.id}`} value={children} onChange={e => setChildren(parseInt(e.target.value, 10))} className={inputClasses}>
                    {generateOptions(0, 10)}
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
                <button type="button" onClick={handleInquiry} disabled={!isDisclaimerAccepted} className={`w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-dark transition-colors duration-300 flex items-center justify-center ${disabledButtonClasses}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                  Email Inquiry
                </button>
                <WhatsAppButton onClick={handleInquiry} className={`w-full bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center ${disabledButtonClasses}`} disabled={!isDisclaimerAccepted}>
                  WhatsApp Inquiry
                </WhatsAppButton>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          </div>
        </div>
      </div>
    );
};

export default FullHouseCard;