// app/components/TripTable.js
'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import TripFormModal from './TripFormModal';

const initialTrips = [
  { _id: 'local-1', from: 'London', to: 'Paris', departureAt: '', arrivalAt: '', pricePerSeat: 70, totalSeats: 50 },
  { _id: 'local-2', from: 'Berlin', to: 'Munich', departureAt: '', arrivalAt: '', pricePerSeat: 120, totalSeats: 50 },
  { _id: 'local-3', from: 'Rome', to: 'Florence', departureAt: '', arrivalAt: '', pricePerSeat: 45, totalSeats: 60 },
];

export default function TripTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null); // null or trip object
  const [trips, setTrips] = useState(initialTrips);
  const [loading, setLoading] = useState(false);

  // show only first N by default
  const DEFAULT_SHOW_COUNT = 3;
  const [showAll, setShowAll] = useState(false);

  // fetch real trips on mount (optional) — keeps UI same but replaces sample data
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const res = await axios.get(`${API_BASE}/trips`);
        const got = res?.data?.trips;
        if (Array.isArray(got) && got.length) {
          // normalize objects to match our table shape
          const normalized = got.map(t => ({
            _id: t._id,
            from: t.from,
            to: t.to,
            departureAt: t.departureAt,
            arrivalAt: t.arrivalAt,
            pricePerSeat: t.pricePerSeat,
            totalSeats: t.totalSeats,
          }));
          setTrips(normalized);
        }
      } catch (err) {
        console.warn('Could not fetch trips, using sample data.', err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openAdd = () => {
    setEditingTrip(null);
    setIsModalOpen(true);
  };

  const openEdit = (trip) => {
    setEditingTrip(trip);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setEditingTrip(null);
    setIsModalOpen(false);
  };

  // onSaved callback from modal
  const handleSaved = ({ type, trip }) => {
    if (!trip) return;
    if (type === 'create') {
      // prepend new trip
      setTrips(prev => [{ 
        _id: trip._id,
        from: trip.from,
        to: trip.to,
        departureAt: trip.departureAt,
        arrivalAt: trip.arrivalAt,
        pricePerSeat: trip.pricePerSeat,
        totalSeats: trip.totalSeats,
      }, ...prev]);
    } else if (type === 'update') {
      setTrips(prev => prev.map(t => (t._id === trip._id ? {
        _id: trip._id,
        from: trip.from,
        to: trip.to,
        departureAt: trip.departureAt,
        arrivalAt: trip.arrivalAt,
        pricePerSeat: trip.pricePerSeat,
        totalSeats: trip.totalSeats,
      } : t)));
    }
  };

  const handleDelete = async (trip) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      await axios.delete(`${API_BASE}/trips/${trip._id}`, { headers });
      setTrips(prev => prev.filter(t => t._id !== trip._id));
      alert('Trip deleted');
    } catch (err) {
      console.error('Delete error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to delete';
      alert(msg);
    }
  };

  // format time for table display
  const fmtTime = (iso) => {
    try {
      if (!iso) return '-';
      const d = new Date(iso);
      let hours = d.getHours();
      const minutes = d.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      if (hours === 0) hours = 12;
      return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    } catch {
      return iso || '-';
    }
  };

  // format date for table display (e.g., "12 Nov 2025")
  const fmtDate = (iso) => {
    try {
      if (!iso) return '-';
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return iso || '-';
    }
  };

  // create display id like T001 based on current index (1-based)
  const displayId = (index) => `T${String(index + 1).padStart(3, '0')}`;

  // decide which trips to show in the table
  const displayedTrips = showAll ? trips : trips.slice(0, DEFAULT_SHOW_COUNT);

  return (
    <div className="">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-lg">Trip Management</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAll(s => !s)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            {showAll ? 'Show Less' : 'All Trips'}
          </button>
          <button
            onClick={openAdd}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Seats</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedTrips.map((trip, idx) => (
              <tr key={trip._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{displayId(idx)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`${trip.from} to ${trip.to}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fmtDate(trip.departureAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fmtTime(trip.departureAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fmtTime(trip.arrivalAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`$${trip.pricePerSeat ?? '-'}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trip.totalSeats ?? '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button onClick={() => openEdit(trip)} className="text-gray-600 hover:text-gray-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(trip)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!trips || trips.length === 0) && (
              <tr>
                <td colSpan={8} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  No trips found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <TripFormModal
        open={isModalOpen}
        initialData={editingTrip}
        onClose={handleModalClose}
        onSaved={handleSaved}
      />
    </div>
  );
}
