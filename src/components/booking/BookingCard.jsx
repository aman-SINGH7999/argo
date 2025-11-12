// app/components/BookingCard.js
'use client';

import { FaPlane, FaBus } from 'react-icons/fa';
import { GiPathDistance } from "react-icons/gi";
import { IoCalendarClear } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

export default function BookingCard({ booking }) {
  const isUpcoming = booking.status === 'Upcoming';
  const Icon = isUpcoming ? FaPlane : FaBus;
  const bgColor = isUpcoming ? 'bg-blue-50' : 'bg-green-50';
  const textColor = isUpcoming ? 'text-blue-600' : 'text-green-600';
  const badgeColor = isUpcoming ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';

  return (
    <div className={`p-4 rounded-lg shadow-sm border border-gray-200 `}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-xs text-gray-500">Booking ID: {booking.id}</div>
          <div className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
            {booking.status}
          </div>
        </div>
        <Icon className={`w-5 h-5 ${textColor}`} />
      </div>

      <div className="flex items-center space-x-1 text-sm text-gray-800 mb-2">
        <GiPathDistance />
        <span>{booking.route}</span>
      </div>

      <div className="flex items-center space-x-1 text-xs text-gray-500 mb-1">
        <IoCalendarClear />
        <span>{booking.date}</span>
      </div>

      <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
        <MdOutlineAccessTimeFilled />
        <span>{booking.time}</span>
      </div>

      <div className="text-xs text-gray-600 mb-3">
        Seats: {booking.seats}
      </div>

      <button className={`w-full py-2 rounded-md flex items-center justify-center space-x-2 ${isUpcoming ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
        <Icon className={`w-5 h-5 ${textColor}`} />
        <span>{isUpcoming ? 'View Flight' : 'View Bus'}</span>
      </button>
    </div>
  );
}