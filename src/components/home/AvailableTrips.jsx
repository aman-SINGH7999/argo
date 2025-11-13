// app/components/home/AvailableTrips.jsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TripCard from './TripCard';

// fallback sample (kept small & similar to your earlier data)
const fallbackTrips = [
  { _id: 'local-1', from: 'New York', to: 'Boston', departureAt: '', arrivalAt: '', pricePerSeat: 48, totalSeats: 50 },
  { _id: 'local-2', from: 'Chicago', to: 'Denver', departureAt: '', arrivalAt: '', pricePerSeat: 65, totalSeats: 50 },
  { _id: 'local-3', from: 'Miami', to: 'Orlando', departureAt: '', arrivalAt: '', pricePerSeat: 32, totalSeats: 60 },
  { _id: 'local-4', from: 'Delhi', to: 'Mumbai', departureAt: '', arrivalAt: '', pricePerSeat: 120, totalSeats: 120 },
  { _id: 'local-5', from: 'Kolkata', to: 'Chennai', departureAt: '', arrivalAt: '', pricePerSeat: 90, totalSeats: 100 },
  { _id: 'local-6', from: 'Bengaluru', to: 'Hyderabad', departureAt: '', arrivalAt: '', pricePerSeat: 40, totalSeats: 80 },
];

// helper: format date nice (e.g., "12 Nov 2025") or fallback string
const fmtDate = (iso) => {
  try {
    if (!iso) return '-';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso || '-';
  }
};

// helper: nice duration string from minutes or fallback
const fmtDuration = (minutes) => {
  if (!minutes && minutes !== 0) return '—';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}min`;
  return `${hrs}h ${mins}min`;
};

export default function AvailableTrips() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // map server trip -> TripCard props (with dummy fallbacks)
  const normalize = (rawTrips) => {
    return rawTrips.map((t, idx) => {
      // image rotate: image1.png, image2.png, image3.png
      const imgIndex = (idx % 6) + 1;
      const image = `/image${imgIndex}.png`;

      // route text
      const from = t.from ?? (t.origin ?? 'Unknown');
      const to = t.to ?? (t.destination ?? 'Unknown');

      // price
      const price = (typeof t.pricePerSeat !== 'undefined') ? Number(t.pricePerSeat) : (t.price ?? 0);

      // originalPrice (dummy: 25%-60% higher)
      const originalPrice = Math.round(price * (1 + (0.25 + (idx % 3) * 0.15)));

      // duration: prefer totalDuration (minutes) else try arrival-departure, else dummy
      let durationMin = null;
      if (typeof t.totalDuration === 'number') durationMin = t.totalDuration;
      else if (t.departureAt && t.arrivalAt) {
        const dep = new Date(t.departureAt);
        const arr = new Date(t.arrivalAt);
        if (!Number.isNaN(dep.getTime()) && !Number.isNaN(arr.getTime()) && arr > dep) {
          durationMin = Math.round((arr - dep) / (1000 * 60));
        }
      } else {
        // sensible dummy based on index
        durationMin = [270, 375, 200, 135, 240, 180][idx % 6]; // minutes
      }

      // date: use departureAt or fallback to today + idx days
      const dateIso = t.departureAt || t.arrivalAt || (new Date(Date.now() + idx * 86400000)).toISOString();

      // seatsAvailable: prefer computed (totalSeats - bookedSeats.length) if present
      let seatsAvailable = null;
      if (Array.isArray(t.bookedSeats)) {
        seatsAvailable = Math.max(0, (t.totalSeats ?? 100) - t.bookedSeats.length);
      } else if (typeof t.totalSeats === 'number') {
        // assume some seats already booked randomly for realism
        seatsAvailable = Math.max(0, t.totalSeats - (idx % 7));
      } else {
        seatsAvailable = [12, 8, 15, 20, 5, 30][idx % 6];
      }

      // rating & reviews (dummy but stable by index)
      const rating = [5, 4.5, 4, 5, 4.2, 4.8][idx % 6];
      const reviews = [124, 89, 201, 34, 56, 78][idx % 6];

      // tags
      const popular = !!(idx % 2 === 0); // every even index popular
      const discount = !!(idx % 3 === 0); // every 3rd has discount

      return {
        id: t._id ?? `local-${idx + 1}`,
        image,
        popular,
        discount,
        rating,
        reviews,
        route: `${from} → ${to}`,
        duration: fmtDuration(durationMin),
        seatsAvailable,
        date: fmtDate(dateIso),
        price,
        originalPrice,
        // pass raw in case TripCard/other wants more
        _raw: t,
      };
    });
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const res = await axios.get(`${API_BASE}/trips`);
        const got = Array.isArray(res?.data?.trips) ? res.data.trips : null;
        if (!cancelled) {
          if (got && got.length) {
            setItems(normalize(got));
          } else {
            // no data from server: use fallback
            setItems(normalize(fallbackTrips));
          }
        }
      } catch (err) {
        // on error, show fallback sample data
        console.warn('AvailableTrips fetch failed:', err?.message || err);
        if (!cancelled) setItems(normalize(fallbackTrips));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  // keep UI exactly same: show loading placeholder or grid
  return (
    <section className="available-trips">
      <div className="trips-header">
        <h2 className="title">Available Trips</h2>
        <p className="subtitle">Choose from our carefully selected destinations and enjoy a comfortable journey.</p>
      </div>

      {loading ? (
        // very small, non-intrusive loading UI so layout doesn't jump
        <div className="trips-grid" role="list" aria-busy="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="trip-card" aria-hidden="true">
              <div style={{ height: 200, background: '#f3f4f6' }} />
            </div>
          ))}
        </div>
      ) : (
        <div className="trips-grid" role="list">
          {items.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </section>
  );
}
