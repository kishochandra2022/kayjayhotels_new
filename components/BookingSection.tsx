

import * as React from 'react';
import { Hotel } from '../types';
import RoomCard from './RoomCard';
import FullHouseCard from './FullHouseCard';

interface BookingSectionProps {
  hotel: Hotel;
  bookingDetails: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  };
}

const BookingSection: React.FC<BookingSectionProps> = ({ hotel, bookingDetails }) => {
  const fullHouseOptions = hotel.rooms.filter(room => room.isFullHouseBooking);
  const standardRooms = hotel.rooms.filter(room => !room.isFullHouseBooking);

  const roomCardProps = {
    initialCheckIn: bookingDetails.checkIn,
    initialCheckOut: bookingDetails.checkOut,
    initialAdults: bookingDetails.adults,
    initialChildren: bookingDetails.children,
  };

  return (
    <section id="rooms">
      {fullHouseOptions.length > 0 && (
        <div className="space-y-8 mb-16">
          {fullHouseOptions.map(room => (
            <FullHouseCard key={room.id} hotel={hotel} room={room} {...roomCardProps} />
          ))}
        </div>
      )}

      {standardRooms.length > 0 && (
        <>
          <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8">
            {fullHouseOptions.length > 0 ? 'Or Choose an Individual Room' : 'Choose Your Room'}
          </h2>
          <div className="space-y-8">
            {standardRooms.map(room => (
              <RoomCard key={room.id} hotel={hotel} room={room} {...roomCardProps} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default BookingSection;