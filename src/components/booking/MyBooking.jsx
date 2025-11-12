// app/page.js
'use client';

import BookingCard from "@/components/booking/BookingCard";


const upcomingBookings = [
  {
    id: 'SLK79012',
    status: 'Upcoming',
    route: 'New York → Los Angeles',
    date: '2024-11-15',
    time: '08:30 AM - 01:30 PM',
    seats: 'A2',
  },
  {
    id: 'SLK74578',
    status: 'Upcoming',
    route: 'Los Angeles → San Francisco',
    date: '2024-11-21',
    time: '05:30 PM - 10:30 PM',
    seats: 'C2',
  },
];

const pastBookings = [
  {
    id: 'SLK12345',
    status: 'Completed',
    route: 'Washington D.C. → Philadelphia',
    date: '2024-10-12',
    time: '06:00 AM - 12:30 PM',
    seats: 'B3',
  },
  {
    id: 'SLK67654',
    status: 'Completed',
    route: 'Chicago → St. Louis',
    date: '2024-10-02',
    time: '02:00 PM - 10:00 PM',
    seats: 'A7, B8',
  },
  {
    id: 'SLK10987',
    status: 'Completed',
    route: 'Miami → Orlando',
    date: '2024-09-18',
    time: '09:00 AM - 12:00 PM',
    seats: 'F1',
  },
];

export default function MyBooking() {
  return (
    <div className="max-w-7xl mx-auto">

      {/* Upcoming Bookings */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingBookings.map((booking, index) => (
            <BookingCard key={index} booking={booking} />
          ))}
        </div>
      </div>

      {/* Past Bookings */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Past Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pastBookings.map((booking, index) => (
            <BookingCard key={index} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
}