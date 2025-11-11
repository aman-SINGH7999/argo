'use client'
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function SeatSelector() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const router = useRouter();
  const { id } = useParams();

  const handleConfirmBooking = ()=>{
    router.push(`/booking/${id}/checkout`)
  }


  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4, 5, 6];

  const bookedSeats = ['A2', 'B3', 'B4', 'B5', 'B6', 'C2', 'C5', 'C6', 'D1', 'D2', 'D5', 'D6', 'E1', 'E2', 'E5', 'E6', 'F1', 'F2', 'F5', 'F6'];

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getStatusClass = (seat) => {
    if (bookedSeats.includes(seat)) {
      return 'bg-red-200 text-red-800 border-red-300';
    }
    if (selectedSeats.includes(seat)) {
      return 'bg-blue-600 text-white border-blue-700';
    }
    return 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200';
  };

  // Helper: render 2 seats group
  const renderSeatGroup = (row, cols) => (
    cols.map(col => {
      const seat = `${row}${col}`;
      return (
        <button
          key={seat}
          onClick={() => toggleSeat(seat)}
          disabled={bookedSeats.includes(seat)}
          className={`w-10 h-10 flex items-center justify-center text-xs font-medium rounded-md border transition-colors ${
            getStatusClass(seat)
          } ${bookedSeats.includes(seat) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {seat}
        </button>
      );
    })
  );

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto border rounded-md border-gray-200 mb-5">
        <h2 className="text-xl font-semibold mb-4">Select Your Seat</h2>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-center text-sm font-medium mb-4">Deluxe Cabin</h3>

          {/* Flex per row */}
          <div className="flex flex-col items-center gap-y-2">
            {rows.map(row => (
              <div key={row} className="flex items-center">
                {renderSeatGroup(row, [1, 2])}
                <div className="w-6"></div> {/* Gap 1 */}
                {renderSeatGroup(row, [3, 4])}
                <div className="w-6"></div> {/* Gap 2 */}
                {renderSeatGroup(row, [5, 6])}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center mt-6 space-x-6 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 border border-blue-700 rounded"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto border rounded-md border-gray-200 mb-5">
        <div className="bg-white p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Selected Seats</h3>
          <p className="text-gray-700">
            {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleConfirmBooking}
            className={`px-6 py-2 rounded-md font-medium transition ${
              selectedSeats.length > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={selectedSeats.length === 0}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </>
  );
}