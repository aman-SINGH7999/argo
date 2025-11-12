'use client';

import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import { HiDownload } from 'react-icons/hi';
import { FaCalendarAlt, FaClock, FaDoorOpen, FaChair } from 'react-icons/fa';
import { MdAirplanemodeActive } from "react-icons/md";
import Link from 'next/link';
import { useRef } from 'react';

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

  const ticketRef = useRef(null);

  // wait for images inside element to load
  const waitForImages = (el) => {
    const imgs = Array.from(el.querySelectorAll('img'));
    return Promise.all(
      imgs.map(img =>
        img.complete ? Promise.resolve() : new Promise(res => { img.onload = res; img.onerror = res; })
      )
    );
  };

  // helper: get pixels for mm using a temporary element
  const mmToPx = (mm) => {
    const el = document.createElement('div');
    el.style.width = `${mm}mm`;
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    document.body.appendChild(el);
    const px = el.getBoundingClientRect().width;
    document.body.removeChild(el);
    return px;
  };

  const handleDownload = async () => {
    try {
      const el = ticketRef.current;
      if (!el) return alert('Ticket element not found');

      // wait fonts & images
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      await waitForImages(el);

      // compute printable width in px (A4 width 210mm minus margins, e.g., 10mm each side)
      const pageWidthMm = 210;
      const marginMm = 10; // adjust if you want different margins
      const printableMm = pageWidthMm - marginMm * 2; // e.g. 190mm
      const printablePx = mmToPx(printableMm);

      // measure element width
      const rect = el.getBoundingClientRect();
      const elWidth = rect.width || el.offsetWidth || el.scrollWidth || 800;

      // compute scale to fit printable width
      const scale = printablePx / elWidth;

      // apply inline styles for print scaling & ensure transform origin
      const prevTransform = el.style.transform;
      const prevTransformOrigin = el.style.transformOrigin;
      const prevTransition = el.style.transition;
      el.style.transformOrigin = 'top left';
      el.style.transform = `scale(${scale})`;
      el.style.transition = 'none'; // disable transitions during print

      // Temporarily set document title (some browsers use it for saved filename)
      const prevTitle = document.title;
      document.title = `${booking.passengerName}_BoardingPass`;

      // Ensure only ticket prints using CSS rules below (we add a class to body to help)
      document.body.classList.add('printing-ticket');

      // Add afterprint listener to cleanup styles
      const cleanUp = () => {
        // revert
        el.style.transform = prevTransform || '';
        el.style.transformOrigin = prevTransformOrigin || '';
        el.style.transition = prevTransition || '';
        document.title = prevTitle || '';
        document.body.classList.remove('printing-ticket');
        window.removeEventListener('afterprint', cleanUp);
      };
      window.addEventListener('afterprint', cleanUp);

      // trigger print (user will see print dialog -> choose Save as PDF)
      window.print();
      // cleanup handled in afterprint
    } catch (err) {
      console.error('Print error:', err);
      alert('Print failed. Check console.');
    }
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          /* hide everything */
          body * {
            visibility: hidden !important;
          }
          /* show only the ticket area */
          #ticket-print-area, #ticket-print-area * {
            visibility: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* position the ticket with small margin (we used 10mm in JS) */
          #ticket-print-area {
            position: absolute !important;
            left: 10mm !important;
            top: 10mm !important;
            overflow: visible !important;
            width: auto !important;
            max-width: none !important;
          }

          /* force show responsive hidden blocks */
          #ticket-print-area .hidden,
          #ticket-print-area .md\\:hidden,
          #ticket-print-area .md\\:block {
            display: block !important;
            visibility: visible !important;
            height: auto !important;
            width: auto !important;
          }

          /* force show barcode container */
          #ticket-print-area .barcode-print {
            display: block !important;
            visibility: visible !important;
          }

          img { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

          /* page size */
          @page { size: A4; margin: 0; }
        }

        /* optional body class to avoid layout shifts */
        body.printing-ticket {
          min-height: 100vh;
        }
      `}</style>

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
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
              >
                <HiDownload className="w-5 h-5" />
                <span className="text-sm font-medium">Download</span>
              </button>
            </div>
          </div>

          {/* TICKET + ILLUSTRATION */}
          <div id="ticket-print-area" className="xl:overflow-hidden overflow-x-auto px-6" ref={ticketRef} style={{ boxSizing: 'border-box' }}>
            <div className="min-w-[1000px] w-full grid grid-cols-[260px_1fr_300px]">
              {/* LEFT TIME COLUMN */}
              <aside
                className="rounded-l-xl p-6 flex flex-col justify-between"
                style={{ background: '#EDF2FF' }}
              >
                <div className="text-left">
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                    {booking.departTime}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{booking.departCity}</div>
                </div>

                <div className="flex flex-col justify-start items-start text-slate-300 my-3">
                  <div className="w-8 h-px bg-slate-400"></div>
                  <div className="ml-4 w-px h-10 bg-slate-400"></div>
                  <MdAirplanemodeActive size={32} className="text-slate-400" />
                  <div className="ml-4 w-px h-10 bg-slate-400"></div>
                  <div className="w-8 h-px bg-slate-400"></div>
                </div>

                <div className="text-left">
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                    {booking.arriveTime}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{booking.arriveCity}</div>
                </div>
              </aside>

              {/* MIDDLE MAIN BOARDING PASS */}
              <section className="bg-white rounded-r-xl border border-gray-100 shadow-sm overflow-hidden">
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ background: '#A1BEFF' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full ring-2 ring-white overflow-hidden"
                      style={{ background: '#fff' }}
                    >
                      <Image
                        src="/user.jpg"
                        alt="avatar"
                        width={40}
                        height={40}
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{booking.passengerName}</div>
                      <div className="text-xs text-slate-500">Boarding Pass {booking.boardingPass}</div>
                    </div>
                  </div>

                  <div className="text-sm text-slate-700">{booking.travelClass}</div>
                </div>

                <div className="p-6 h-3/4 flex flex-col justify-between">
                  <div className="flex flex-wrap gap-4 items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md border border-gray-100" style={{ background: '#DBEAFE' }}>
                        <FaCalendarAlt className="text-slate-500 w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <div className="text-slate-500">Date</div>
                        <div className="text-sm font-medium">{booking.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md border border-gray-100" style={{ background: '#DBEAFE' }}>
                        <FaClock className="text-slate-500 w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <div className="text-slate-500">Flight time</div>
                        <div className="text-sm font-medium">{booking.flightTime}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md border border-gray-100" style={{ background: '#DBEAFE' }}>
                        <FaDoorOpen className="text-slate-500 w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <div className="text-slate-500">Gate</div>
                        <div className="text-sm font-medium">{booking.gate}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md border border-gray-100" style={{ background: '#DBEAFE' }}>
                        <FaChair className="text-slate-500 w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <div className="text-slate-500">Seat</div>
                        <div className="text-sm font-medium">{booking.seat}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-16 items-end justify-between gap-4">
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{booking.code}</div>
                      <div className="text-xs text-slate-400 mt-1">{booking.codeId}</div>
                    </div>

                    <div className="ml-auto hidden md:block barcode-print">
                      <img
                        src="/barcode.png"
                        alt="barcode"
                        width={220}
                        height={50}
                        className="object-contain"
                        style={{ display: 'block', maxWidth: '220px', height: 'auto' }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* RIGHT VISUAL PANEL */}
              <aside className="relative bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center justify-center overflow-visible">
                <div
                  className="absolute top-5 right-3 rounded-md flex gap-2 border border-gray-200 p-2"
                  style={{ background: 'rgba(255,255,255,0.95)', zIndex: 30 }}
                >
                  <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src="/user.jpg"
                      alt="user"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>

                  <div style={{ color: '#111827' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>John doe</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Boarding Pass N’123</div>
                  </div>
                </div>

                <div className='absolute top-14 left-20 w-64 h-64 rounded-full border-dashed border-l-2 rotate-45 border-gray-400'></div>

                <div
                  className="absolute bottom-5 left-3 rounded-md flex gap-2 border border-gray-200 p-2"
                  style={{ background: 'rgba(255,255,255,0.95)', zIndex: 30 }}
                >
                  <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src="/user.jpg"
                      alt="user"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>

                  <div style={{ color: '#111827' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>John doe</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Boarding Pass N’123</div>
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
    </>
  );
}
