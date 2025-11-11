'use client'
import React from 'react';
import Image from 'next/image';

export default function TripDetailsCard() {
  return (
    <div className="p-6 max-w-6xl rounded-md mx-auto border border-gray-200">
      {/* Image */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/image1.png"
          alt="New York City Skyline at Sunset"
          fill
          className='object-cover rounded-md'
          priority
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Trip Details</h2>

        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">From</p>
            <p className="font-medium">New York (NYC)</p>
          </div>
          <div>
            <p className="text-xs text-end text-gray-500">To</p>
            <p className="font-medium">Boston (BOS)</p>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">Date</p>
            <p className="font-medium">October 26, 2024</p>
          </div>
          <div>
            <p className="text-xs text-end text-gray-500">Time</p>
            <p className="font-medium">09:00 AM</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-blue-600">Fare per seat</p>
          <p className="text-xl font-bold text-blue-700">$48.00</p>
        </div>
      </div>
    </div>
  );
}