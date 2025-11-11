'use client';

import Image from 'next/image';
import { IoLocationSharp, IoAirplaneSharp } from 'react-icons/io5';
import { HiDownload } from 'react-icons/hi';
import { FaCalendarAlt, FaClock, FaDoorOpen, FaChair } from 'react-icons/fa';
import { MdAirplanemodeActive } from "react-icons/md";
import Link from 'next/link';

export default function Page() {
  const booking = {
    airline: 'Emirates A380 Airbus',
    address: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
    price: 96,
    departTime: '9:30 Am',
    departCity: 'New York',
    arriveTime: '12:00 pm',
    arriveCity: 'Boston',
    passengerName: 'James Doe',
    boardingPass: 'Nº123',
    travelClass: 'Business Class',
    date: '26 Oct 2024',
    flightTime: '12:00',
    gate: 'A12',
    seat: '12B',
    code: 'EK',
    codeId: 'ABC12345',
  };

  return (
    <main className="min-h-screen bg-white/50 p-6 md:p-10 lg:p-14">
      <div className="max-w-6xl mx-auto">

        {/* TOP ROW: title/address left, price + download right */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">{booking.airline}</h1>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
              <IoLocationSharp size={20} className="text-slate-700" />
              <span>{booking.address}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4 md:gap-6">
            <div className="text-xl md:text-2xl font-bold text-slate-900">${booking.price}</div>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
            >
              <HiDownload className="w-5 h-5" />
              <span className="text-sm font-medium">Download</span>
            </button>
          </div>
        </div>

        {/* TICKET + ILLUSTRATION */}
        {/* IMPORTANT: wrapper with overflow-x-auto prevents the inner grid from wrapping on small screens */}
        <div className="overflow-x-auto -mx-6 px-6"> 
          <div className="min-w-[1120px] grid grid-cols-[280px_1fr_320px]">
            {/* LEFT TIME COLUMN */}
            <aside className="bg-[#EDF2FF] rounded-l-xl p-6 flex flex-col justify-between">
              <div className="text-left">
                <div className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{booking.departTime}</div>
                <div className="text-xs text-slate-400 mt-1">{booking.departCity}</div>
              </div>

              <div className="flex flex-col justify-start items-start text-slate-300 my-3">
                {/* vertical separator with plane */}
                <div className="w-8 h-px bg-slate-400"></div>
                <div className="ml-4 w-px h-10 bg-slate-400"></div>
                <MdAirplanemodeActive size={32} className="text-slate-400" />
                <div className="ml-4 w-px h-10 bg-slate-400"></div>
                <div className="w-8 h-px bg-slate-400"></div>
              </div>

              <div className="text-left">
                <div className="text-3xl md:text-4xl font-extrabold text-slate-900">{booking.arriveTime}</div>
                <div className="text-xs text-slate-400 mt-1">{booking.arriveCity}</div>
              </div>
            </aside>

            {/* MIDDLE MAIN BOARDING PASS */}
            <section className="bg-white rounded-r-xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Blue top strip: avatar + name + class */}
              <div className="bg-[#A1BEFF] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full ring-2 ring-white overflow-hidden">
                    <Image src="/user.jpg" alt="avatar" width={40} height={40} className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{booking.passengerName}</div>
                    <div className="text-xs text-slate-500">Boarding Pass {booking.boardingPass}</div>
                  </div>
                </div>

                <div className="text-sm text-slate-700">{booking.travelClass}</div>
              </div>

              {/* Main content */}
              <div className="p-6 h-3/4 flex flex-col justify-between">
                {/* icons row */}
                <div className="flex flex-wrap gap-4 items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#DBEAFE] p-2 rounded-md border border-gray-100">
                      <FaCalendarAlt className="text-slate-500 w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="text-slate-500">Date</div>
                      <div className="text-sm font-medium">{booking.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#DBEAFE] p-2 rounded-md border border-gray-100">
                      <FaClock className="text-slate-500 w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="text-slate-500">Flight time</div>
                      <div className="text-sm font-medium">{booking.flightTime}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#DBEAFE] p-2 rounded-md border border-gray-100">
                      <FaDoorOpen className="text-slate-500 w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="text-slate-500">Gate</div>
                      <div className="text-sm font-medium">{booking.gate}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#DBEAFE] p-2 rounded-md border border-gray-100">
                      <FaChair className="text-slate-500 w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="text-slate-500">Seat</div>
                      <div className="text-sm font-medium">{booking.seat}</div>
                    </div>
                  </div>
                </div>

                {/* EK code + barcode row */}
                <div className="flex mt-16 items-end justify-between gap-4">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{booking.code}</div>
                    <div className="text-xs text-slate-400 mt-1">{booking.codeId}</div>
                  </div>

                  <div className="ml-auto hidden md:block">
                    {/* barcode image placeholder */}
                    <Image src="/barcode.png" alt="barcode" width={220} height={50} className="object-contain" />
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT VISUAL PANEL */}
            <aside className="relative bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute top-5 right-3 rounded-md flex gap-2 border border-gray-200 p-2">
                <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                        src="/user.jpg"
                        alt="user"
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <div>John doe</div>
                    <div className='text-xs'>Boarding Pass N’123</div>
                </div>
              </div>
              <div className='absolute top-14 left-20 w-64 h-64 rounded-full border-dashed border-l-2 rotate-45 border-gray-400'></div>
              <div className="absolute bottom-5 left-3 rounded-md flex gap-2 border border-gray-200 p-2">
                <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                        src="/user.jpg"
                        alt="user"
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <div>John doe</div>
                    <div className='text-xs'>Boarding Pass N’123</div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* TERMS */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Terms and Conditions</h2>

          <div className="prose max-w-none text-slate-700">
            <p className="font-semibold text-lg">Payments</p>

            {/* Bulleted list for payments */}
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
              <li>If you are purchasing your ticket using a debit or credit card via the Website, we will process these payments via the automated secure common payment gateway which will be subject to fraud screening purposes.</li>
              <li>If you do not supply the correct card billing address and/or cardholder information, your booking will not be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is declined for any reason or if you have supplied incorrect card information.</li>
              <li>If we become aware of, or are notified of, any fraud or illegal activity associated with the payment for the booking, the booking will be cancelled and you will be liable for all costs and expenses arising from such cancellation.</li>
              <li>Argo may require the card holder to provide additional payment verification upon request by either submitting an online form or visiting the nearest Argo office, or at the airport at the time of check-in.</li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold">Contact Us</h3>
            <p className="text-sm">
              If you have any questions about our Website or our Terms of Use, please contact:
            </p>
            <address className="not-italic text-sm mt-2">
              Argo Group Q.C.S.C<br/>
              Argo Tower<br/>
              P.O. Box 22550<br/>
              Doha, State of Qatar.<br/>
              Further contact details can be found at <Link href="#" className="underline text-blue-600">argo.com/help</Link>.
            </address>
          </div>
        </section>
      </div>
    </main>
  );
}
