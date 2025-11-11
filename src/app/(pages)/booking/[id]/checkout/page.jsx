'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { IoAirplaneSharp } from 'react-icons/io5';
import { FaCalendar, FaMapPin, FaRegCreditCard, FaWallet } from 'react-icons/fa';
import { FaClock, FaBus, FaUserFriends } from 'react-icons/fa';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [form, setForm] = useState({
    name: 'John Smith',
    email: 'Johnsmith234@gmail.com',
    phone: '+1 (555) 123-4567',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const router = useRouter();
  const { id } = useParams();
  const booking = {
    route: 'New York to Boston',
    date: '2024-05-15',
    time: '10:30 AM',
    transport: 'Flight',
    seats: 'E5, E6',
    fare: 96
  };

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));


  const handleCheckout = ()=>{
    router.push(`/booking/${id}/confirmed`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8">Checkout &amp; Payment</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Form */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Your Information</h3>
              <p className="text-sm text-gray-500 mb-4">Please provide your contact details for this booking</p>

              <div className="space-y-3">
                <label className="block">
                  <div className="text-xs text-gray-600 mb-1">Full Name</div>
                  <input name="name" value={form.name} onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-600 mb-1">Email Address</div>
                  <input name="email" value={form.email} onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-600 mb-1">Phone Number</div>
                  <input name="phone" value={form.phone} onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </label>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Payment Method</h3>

              <div className="space-y-3">
                {/* Card */}
                <label className={`flex items-center gap-3 p-3 rounded-lg border ${paymentMethod === 'card' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-blue-500" />
                  <FaRegCreditCard className="text-slate-700" />
                  <div>
                    <div className="text-sm font-medium">Credit or Debit Card</div>
                    <div className="text-xs text-gray-500">Visa, MasterCard, Discover</div>
                  </div>
                </label>

                {/* Wallet */}
                <label className={`flex items-center gap-3 p-3 rounded-lg border ${paymentMethod === 'wallet' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                  <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="accent-blue-500" />
                  <FaWallet className="text-slate-700" />
                  <div>
                    <div className="text-sm font-medium">Digital Wallet</div>
                    <div className="text-xs text-gray-500">PayPal, Apple Pay, Google Pay</div>
                  </div>
                </label>
              </div>

              {/* Card Fields (only when card selected) */}
              {paymentMethod === 'card' && (
                <div className="mt-4 flex flex-col space-y-3">
                  <label>
                    <div className="text-xs text-gray-600 mb-1">Card Number</div>
                    <input name="cardNumber" value={form.cardNumber} onChange={onChange}
                      placeholder=".... .... .... 1234"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </label>

                  <label>
                    <div className="text-xs text-gray-600 mb-1">Cardholder Name</div>
                    <input name="cardName" value={form.cardName} onChange={onChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label>
                      <div className="text-xs text-gray-600 mb-1">Expiry Date</div>
                      <input name="expiry" value={form.expiry} onChange={onChange} placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </label>

                    <label>
                      <div className="text-xs text-gray-600 mb-1">CVV</div>
                      <input name="cvv" value={form.cvv} onChange={onChange} placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Booking Summary */}
          <aside className="">
            <div className='bg-white rounded-xl border border-gray-200 p-6'>
                <h3 className="font-semibold text-slate-900 mb-4">Booking Summary</h3>

            <div className="rounded-lg bg-[#111827] h-28 mb-6 flex items-center justify-center text-white">
              <IoAirplaneSharp size={32} />
            </div>

            <ul className="text-sm text-gray-600 space-y-3 mb-6">
              <li className="flex justify-between">
                <div className="flex items-center gap-3"><FaMapPin className="text-blue-600" /> <span>Route:</span></div>
                <div className="text-gray-900">{booking.route}</div>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center gap-3"><FaCalendar className="text-blue-600" /> <span>Date:</span></div>
                <div className="text-gray-900">{booking.date}</div>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center gap-3"><FaClock className="text-blue-600" /> <span>Time:</span></div>
                <div className="text-gray-900">{booking.time}</div>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center gap-3"><FaBus className="text-blue-600" /> <span>Transport:</span></div>
                <div className="text-gray-900">{booking.transport}</div>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center gap-3"><FaUserFriends className="text-blue-600" /> <span>Seats:</span></div>
                <div className="text-gray-900">{booking.seats}</div>
              </li>
            </ul>

            <div className="border-t border-gray-300 pt-4">
              <div className='flex justify-between items-center'>
                <div className="text-sm font-semibold text-gray-700">Total Fare:</div>
                <div className="text-lg font-semibold text-blue-600">USD {booking.fare.toFixed(2)}</div>
              </div>

              <button
                className=" w-full mt-4 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleCheckout}
              >
                Complete Payment
              </button>
            </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
