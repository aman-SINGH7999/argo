// app/components/BookingTable.js
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaQrcode } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";

const bookings = [
  { id: 'B1001', user: 'Alice Smith', route: 'London to Paris', date: '2025-11-27', seats: 'A1, A2', status: 'Confirmed', qrVerified: true },
  { id: 'B1002', user: 'Bob Johnson', route: 'Rome to Florence', date: '2025-11-24', seats: 'C5', status: 'Pending', qrVerified: false },
  { id: 'B1003', user: 'Charlie Brown', route: 'Berlin to Munich', date: '2025-11-30', seats: 'F13, F14, F15', status: 'Confirmed', qrVerified: true },
];

export default function BookingTable() {
  return (
    <div className="mt-6">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-lg">Booking Management</h3>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            All Bookings
          </button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50 flex items-center space-x-1">
            <FaQrcode className="w-4 h-4" />
            <span>Verify QR</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QR Verified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.route}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.seats}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`status-${booking.status.toLowerCase()}`}>{booking.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  {booking.qrVerified ? (
                    <IoMdCheckmarkCircle size={20} className="text-green-500  mx-auto" />
                  ) : (
                    <FaRegCircle size={20} className="text-gray-300  mx-auto" />
                  )}
                </td>
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
    </div>
  );
}