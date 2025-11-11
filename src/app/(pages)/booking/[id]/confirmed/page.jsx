// app/confirmation/page.jsx  (or pages/confirmation.jsx)
'use client';

import Image from 'next/image';
import { HiOutlineCheck } from 'react-icons/hi';
import { IoAirplaneSharp } from 'react-icons/io5';
import { FaDownload } from "react-icons/fa6";
import { AiFillEye } from "react-icons/ai";
import { useRouter } from 'next/navigation';

export default function BookingConfirmed() {
    const router = useRouter();

  const booking = {
    fromCode: 'LAX',
    fromCity: 'New York',
    fromTime: '09:30 AM',
    toCode: 'SFO',
    toCity: 'Boston',
    toTime: '12:00 PM',
    duration: '2h 30min',
    date: 'October 26, 2024',
    seats: 'E5, E6',
    fare: 96.0,
    bookingId: '#TXN789456',
  };

  const handleViewTicket = (ticketId)=>{
    ticketId = 314;
    router.push(`/ticket/${ticketId}`)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <HiOutlineCheck className="text-green-600" size={26} />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Booking Confirmed!</h1>
          <p className="text-sm text-slate-500 mt-2">Your trip is successfully booked. Enjoy your journey!</p>
        </div>

        {/* Ticket Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Blue header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
            <div>
              <div className="text-white text-lg font-medium">Flight Ticket</div>
              <div className="text-white text-sm opacity-90 mt-1">Booking ID: <span className="font-medium">{booking.bookingId}</span></div>
            </div>
            <div className="text-white opacity-95">
              <IoAirplaneSharp size={22} />
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Route */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold text-slate-900">{booking.fromCode}</div>
                <div className="text-sm text-slate-500">{booking.fromCity}</div>
                <div className="text-xs text-slate-400 mt-2">{booking.fromTime}</div>
              </div>

              <div className="flex flex-col items-center text-slate-500">
                <div className="relative flex items-center justify-center">
                  <IoAirplaneSharp className="text-blue-500" />
                  <div className='absolute border-dashed border-t-2 w-60 border-gray-400'></div>
                </div>
                <div className="text-xs text-slate-400 mt-2">{booking.duration}</div>
              </div>

              <div className="text-center md:text-right">
                <div className="text-2xl font-bold text-slate-900">{booking.toCode}</div>
                <div className="text-sm text-slate-500">{booking.toCity}</div>
                <div className="text-xs text-slate-400 mt-2">{booking.toTime}</div>
              </div>
            </div>

            {/* Info boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <div className="text-xs text-slate-500">Date</div>
                <div className="mt-1 font-semibold text-slate-900">{booking.date}</div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <div className="text-xs text-slate-500">Seats</div>
                <div className="mt-1 font-semibold text-slate-800">{booking.seats}</div>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-6 pt-6"></div>

            {/* Fare + QR */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-slate-800">Total Fare Paid</div>
                <div className="text-xl font-semibold text-green-600 mt-2">${booking.fare.toFixed(2)}</div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-36 h-36 bg-white rounded-md shadow-sm overflow-hidden flex items-center justify-center border-8 border-gray-50">
                  <Image src="/qrcode.png" alt="QR code" width={120} height={120} className="object-cover" />
                </div>
                <div className="text-xs text-slate-400">Scan this QR code at the boarding gate</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8">
              <div className="flex flex-col md:flex-row gap-3">
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium"
                >
                  {/* icon purely visual */}
                  <FaDownload />
                  Download Ticket
                </button>

                <button
                  type="button"
                  onClick={handleViewTicket}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium"
                >
                  <AiFillEye size={20} />
                  View Ticket
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
