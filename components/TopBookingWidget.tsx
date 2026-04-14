
import * as React from 'react';
import { Hotel } from '../types';

interface TopBookingWidgetProps {
  hotel: Hotel;
  bookingDetails: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  };
  setBookingDetails: React.Dispatch<React.SetStateAction<{
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }>>;
}

const generateOptions = (start: number, end: number) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push(<option key={i} value={i}>{i}</option>);
  }
  return options;
};

const TopBookingWidget: React.FC<TopBookingWidgetProps> = ({ hotel, bookingDetails, setBookingDetails }) => {
  const { checkIn, checkOut, adults, children } = bookingDetails;
  const today = new Date().toISOString().split('T')[0];
  const [error, setError] = React.useState<string | null>(null);

  const validate = () => {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      return false;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after the check-in date.');
      return false;
    }
    setError(null);
    return true;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // For selects, parse value to number
    const processedValue = name === 'adults' || name === 'children' ? parseInt(value, 10) : value;
    setBookingDetails(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleCheckAvailability = () => {
    if (!validate()) return;
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-brand-gray/80 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">Check Availability at {hotel.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="top-check-in" className="block text-sm font-medium text-gray-700">Check-in</label>
              <input type="date" id="top-check-in" name="checkIn" value={checkIn} onChange={handleChange} min={today} className="mt-1 w-full text-base px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label htmlFor="top-check-out" className="block text-sm font-medium text-gray-700">Check-out</label>
              <input type="date" id="top-check-out" name="checkOut" value={checkOut} onChange={handleChange} min={checkIn || today} className="mt-1 w-full text-base px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="top-adults" className="block text-sm font-medium text-gray-700">Adults</label>
                <select id="top-adults" name="adults" value={adults} onChange={handleChange} className="mt-1 block w-full text-base px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                  {generateOptions(1, 10)}
                </select>
              </div>
              <div>
                <label htmlFor="top-children" className="block text-sm font-medium text-gray-700">Children</label>
                <select id="top-children" name="children" value={children} onChange={handleChange} className="mt-1 block w-full text-base px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                  {generateOptions(0, 10)}
                </select>
              </div>
            </div>
            <div>
                <button onClick={handleCheckAvailability} className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-brand-secondary transition-colors duration-300">
                  Check Availability
                </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default TopBookingWidget;