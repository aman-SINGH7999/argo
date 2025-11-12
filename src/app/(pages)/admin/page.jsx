// app/admin/page.js
'use client';


import BookingTable from '@/components/admin/BookingTable';
import Card from '@/components/admin/Card';
import TripTable from '@/components/admin/TripTable';
import { FaUsers, FaClock, FaQrcode, FaMapPin } from 'react-icons/fa';



export default function Page() {
  return (
    <div className='max-w-7xl mx-auto py-10 p-2 md:p-5'>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Admin Overview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Admin Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            icon={<FaMapPin className="w-6 h-6 text-blue-600" />}
            title="Total Trips"
            value="48"
            bgColor="bg-white"
            iconColor="bg-blue-100"
          />
          <Card
            icon={<FaUsers className="w-6 h-6 text-green-600" />}
            title="Total Bookings"
            value="325"
            bgColor="bg-white"
            iconColor="bg-green-100"
          />
          <Card
            icon={<FaClock className="w-6 h-6 text-yellow-600" />}
            title="Upcoming Departures"
            value="12"
            bgColor="bg-white"
            iconColor="bg-yellow-100"
          />
        </div>
      </div>

      {/* Trip Management */}
      <TripTable />

      {/* Booking Management */}
      <BookingTable />
    </div>
  );
}