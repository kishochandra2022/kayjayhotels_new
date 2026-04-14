
import * as React from 'react';
// FIX: Replaced useHistory with useNavigate for v6 compatibility.
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { useNavigate } from 'react-router-dom';
import { hotelsData } from '../data/hotels';

const generateOptions = (start: number, end: number) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push(<option key={i} value={i}>{i}</option>);
  }
  return options;
};

const MainBookingWidget: React.FC = () => {
    // FIX: Replaced useHistory with useNavigate for v6 compatibility.
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];

    const [hotelSlug, setHotelSlug] = React.useState(hotelsData[0]?.slug || '');
    const [checkIn, setCheckIn] = React.useState('');
    const [checkOut, setCheckOut] = React.useState('');
    const [adults, setAdults] = React.useState(2);
    const [children, setChildren] = React.useState(0);
    const [error, setError] = React.useState<string | null>(null);

    const validate = () => {
        if (!hotelSlug) {
            setError('Please select a destination.');
            return false;
        }
        if (!checkIn || !checkOut) {
            setError('Please select both a check-in and check-out date.');
            return false;
        }
        if (new Date(checkOut) <= new Date(checkIn)) {
            setError('Check-out date must be after the check-in date.');
            return false;
        }
        setError(null);
        return true;
    };
    
    const handleCheckAvailability = () => {
        if (!validate()) return;
        const params = new URLSearchParams({
            hotelSlug,
            checkIn,
            checkOut,
            adults: adults.toString(),
            children: children.toString(),
        });
        // FIX: Replaced history.push() with navigate() for v6 compatibility.
        navigate(`/search-results?${params.toString()}`);
    };

    const sortedHotels = [...hotelsData].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <section className="bg-brand-gray/80 -mt-16 relative z-0">
            <div className="container mx-auto px-6 py-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-brand-dark mb-4 text-center">Plan Your Perfect Stay</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div className="lg:col-span-1">
                        <label htmlFor="main-hotel" className="block text-sm font-medium text-gray-700">Destination</label>
                        <select id="main-hotel" value={hotelSlug} onChange={e => setHotelSlug(e.target.value)} className="mt-1 block w-full text-base px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                            {sortedHotels.map(hotel => (
                                <option key={hotel.id} value={hotel.slug}>{hotel.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="main-check-in" className="block text-sm font-medium text-gray-700">Check-in</label>
                        <input type="date" id="main-check-in" value={checkIn} onChange={e => setCheckIn(e.target.value)} min={today} className="mt-1 w-full text-base px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                    </div>
                    <div>
                        <label htmlFor="main-check-out" className="block text-sm font-medium text-gray-700">Check-out</label>
                        <input type="date" id="main-check-out" value={checkOut} onChange={e => setCheckOut(e.target.value)} min={checkIn || today} className="mt-1 w-full text-base px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="main-adults" className="block text-sm font-medium text-gray-700">Adults</label>
                            <select id="main-adults" value={adults} onChange={e => setAdults(parseInt(e.target.value, 10))} className="mt-1 block w-full text-base px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                                {generateOptions(1, 10)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="main-children" className="block text-sm font-medium text-gray-700">Children</label>
                            <select id="main-children" value={children} onChange={e => setChildren(parseInt(e.target.value, 10))} className="mt-1 block w-full text-base px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                                {generateOptions(0, 10)}
                            </select>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <button onClick={handleCheckAvailability} className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-dark transition-colors duration-300">
                            Check Availability
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                </div>
            </div>
        </section>
    );
};

export default MainBookingWidget;