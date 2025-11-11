import React from 'react'
import TripCard from './TripCard'

  const trips = [
    {
      id: 1,
      image: "/image1.png",
      popular: true,
      discount: true,
      rating: 5,
      reviews: 124,
      route: "New York → Boston",
      duration: "4h 30min",
      seatsAvailable: 12,
      date: "Dec 15, 2024",
      price: 48,
      originalPrice: 84,
    },
    {
      id: 2,
      image: "/image2.png",
      popular: false,
      discount: true,
      rating: 4.5,
      reviews: 89,
      route: "Chicago → Denver",
      duration: "6h 15min",
      seatsAvailable: 8,
      date: "Jan 5, 2025",
      price: 65,
      originalPrice: 99,
    },
    {
      id: 3,
      image: "/image3.png",
      popular: true,
      discount: false,
      rating: 4,
      reviews: 201,
      route: "Miami → Orlando",
      duration: "3h 20min",
      seatsAvailable: 15,
      date: "Feb 10, 2025",
      price: 32,
      originalPrice: 50,
    },
    {
      id: 4,
      image: "/image1.png",
      popular: true,
      discount: true,
      rating: 5,
      reviews: 124,
      route: "New York → Boston",
      duration: "4h 30min",
      seatsAvailable: 12,
      date: "Dec 15, 2024",
      price: 48,
      originalPrice: 84,
    },
    {
      id: 5,
      image: "/image2.png",
      popular: false,
      discount: true,
      rating: 4.5,
      reviews: 89,
      route: "Chicago → Denver",
      duration: "6h 15min",
      seatsAvailable: 8,
      date: "Jan 5, 2025",
      price: 65,
      originalPrice: 99,
    },
    {
      id: 6,
      image: "/image3.png",
      popular: true,
      discount: false,
      rating: 4,
      reviews: 201,
      route: "Miami → Orlando",
      duration: "3h 20min",
      seatsAvailable: 15,
      date: "Feb 10, 2025",
      price: 32,
      originalPrice: 50,
    },
  ];

export default function AvailableTrips() {
  return (
    <section className="available-trips">
      <div className="trips-header">
        <h2 className="title">Available Trips</h2>
        <p className="subtitle">Choose from our carefully selected destinations and enjoy a comfortable journey.</p>
      </div>

      <div className="trips-grid" role="list">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
}
