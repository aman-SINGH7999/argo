// app/components/TripTable.js
'use client';

import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const trips = [
  { id: 'T001', route: 'London to Paris', departure: '06:00 AM', arrival: '04:00 PM', price: '$70.00', seats: 50 },
  { id: 'T002', route: 'Berlin to Munich', departure: '08:30 AM', arrival: '03:00 PM', price: '$120.00', seats: 50 },
  { id: 'T003', route: 'Rome to Florence', departure: '10:00 AM', arrival: '01:00 PM', price: '$45.00', seats: 60 },
];

export default function TripTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    dateTime: '',
    price: '',
    totalSeat: '',
  });

  const openModal = () => {
    // Reset form on open (optional)
    setFormData({ from: '', to: '', dateTime: '', price: '', totalSeat: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log form data
    console.log('New Trip Data:', formData);
    
    // Alert dekhna hai toh uncomment karo:
    alert(`Trip added!\nFrom: ${formData.from}\nTo: ${formData.to}\nPrice: ${formData.price}\nSeats: ${formData.totalSeat}`);

    // Modal band karo
    closeModal();

    // Yahan tum API call ya localStorage bhi kar sakte ho
  };

  return (
    <div className="">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-lg">Trip Management</h3>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            All Trips
          </button>
          <button
            onClick={openModal}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50 flex items-center space-x-1"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add New Trip</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Seats</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trip.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trip.route}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trip.departure}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trip.arrival}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trip.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trip.seats}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button className="text-gray-600 hover:text-gray-800">
                      <FaEdit className="" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash className="" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()} // Modal ke andar click karne se close nahi hoga
          >
            <h4 className="text-lg font-semibold mb-4">Trip Details</h4>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    placeholder="Departure Location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="Arrival Destination"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleChange}
                    placeholder="e.g. 12 Nov 2025, 06:00 AM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="$"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Seat</label>
                <input
                  type="number"
                  name="totalSeat"
                  value={formData.totalSeat}
                  onChange={handleChange}
                  placeholder="Total no. of seats"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>

            {/* Close (X) button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}