// app/components/TripFormModal.jsx
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function TripFormModal({ open, onClose, onSaved, initialData = null }) {
  // initialData = null -> Add mode
  // initialData = { _id, from, to, departureAt, arrivalAt, pricePerSeat, totalSeats } -> Edit mode
  const isEdit = Boolean(initialData && initialData._id);

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureAt: '',
    arrivalAt: '',
    price: '',
    totalSeat: '',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // populate form from initialData (convert ISO to input-friendly datetime-local)
      const toInputDate = (iso) => {
        if (!iso) return '';
        const d = new Date(iso);
        // get local timezone string like "2025-11-12T09:30"
        const off = d.getTimezoneOffset();
        const local = new Date(d.getTime() - off * 60 * 1000);
        return local.toISOString().slice(0, 16);
      };

      setFormData({
        from: initialData.from || '',
        to: initialData.to || '',
        departureAt: toInputDate(initialData.departureAt),
        arrivalAt: toInputDate(initialData.arrivalAt),
        price: initialData.pricePerSeat != null ? String(initialData.pricePerSeat) : '',
        totalSeat: initialData.totalSeats != null ? String(initialData.totalSeats) : '',
      });
    } else {
      setFormData({ from: '', to: '', departureAt: '', arrivalAt: '', price: '', totalSeat: '' });
    }
  }, [initialData, isEdit, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const toISO = (localDatetimeStr) => {
    // input type datetime-local gives "YYYY-MM-DDTHH:mm"
    if (!localDatetimeStr) return null;
    const d = new Date(localDatetimeStr);
    return d.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { from, to, departureAt, arrivalAt, price, totalSeat } = formData;

    if (!from || !to || !departureAt || !arrivalAt || price === '' || totalSeat === '') {
      return alert('Please fill all required fields.');
    }

    const dep = new Date(departureAt);
    const arr = new Date(arrivalAt);
    if (Number.isNaN(dep.getTime()) || Number.isNaN(arr.getTime())) {
      return alert('Invalid date/time provided.');
    }
    if (arr <= dep) {
      return alert('Arrival must be after departure.');
    }

    const priceNum = Number(price);
    const seatsNum = parseInt(totalSeat, 10);
    if (!Number.isFinite(priceNum) || priceNum < 0) return alert('Invalid price.');
    if (!Number.isInteger(seatsNum) || seatsNum < 1) return alert('Invalid total seats.');

    setSubmitting(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const payload = {
        from: from.trim(),
        to: to.trim(),
        departureAt: toISO(departureAt),
        arrivalAt: toISO(arrivalAt),
        pricePerSeat: priceNum,
        totalSeats: seatsNum,
      };

      if (isEdit) {
        // update
        const res = await axios.put(`${API_BASE}/trips/${initialData._id}`, payload, { headers });
        const updated = res?.data?.trip;
        if (!updated) {
          toast.info('Update succeeded but server returned unexpected response.');
        } else {
          toast.success('Trip updated successfully!');
          onSaved && onSaved({ type: 'update', trip: updated });
        }
      } else {
        // create
        const res = await axios.post(`${API_BASE}/trips`, payload, { headers });
        const created = res?.data?.trip;
        if (!created) {
          toast.info('Trip created but server returned unexpected response.');
        } else {
          toast.success('Trip added successfully!');
          onSaved && onSaved({ type: 'create', trip: created });
        }
      }

      onClose();
    } catch (err) {
      console.error('Trip save error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to save trip';
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-lg font-semibold mb-4">{isEdit ? 'Edit Trip' : 'Trip Details'}</h4>

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
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure At</label>
              <input
                type="datetime-local"
                name="departureAt"
                value={formData.departureAt}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arrival At</label>
              <input
                type="datetime-local"
                name="arrivalAt"
                value={formData.arrivalAt}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
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
            <div>
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
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={submitting}
          >
            {submitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
          type="button"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
