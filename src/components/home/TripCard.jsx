import React from 'react';
import { GoStarFill } from "react-icons/go";
import { BiSolidTimeFive } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import './availableTrips.css';

export default function TripCard({ trip = {} }) {
  const {
    id = 1,
    image = "/image1.png",
    popular = true,
    discount = true,
    rating = 5,
    reviews = 124,
    route = "New York → Boston",
    duration = "4h 30min",
    seatsAvailable = 12,
    date = "Dec 15, 2024",
    price = 48,
    originalPrice = 84,
  } = trip;

  const fullStars = Math.floor(rating);
  const totalStars = 5;

  return (
    <article className="trip-card" role="listitem" aria-labelledby={`route-${id}`}>
      <div className="card-header">
        <Image
          src={image}
          alt={`${route} image`}
          width={800}
          height={450}
          className="card-image"
          priority={false}
        />
        <div className="tags">
          <div className="left-tags">
            {popular && <span className="tag popular">Popular</span>}
          </div>
          <div className="right-tags">
            {discount && <span className="tag discount">25% OFF</span>}
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="rating">
          <div className="stars" aria-hidden="true">
            {Array.from({ length: totalStars }).map((_, i) => (
              <GoStarFill
                key={i}
                className={`star ${i < fullStars ? 'filled' : 'empty'}`}
                size={16}
              />
            ))}
          </div>
          <div className="reviews">({reviews} reviews)</div>
        </div>

        <h3 id={`route-${id}`} className="route">{route}</h3>

        <div className="details">
          <div className="detail-item">
            <BiSolidTimeFive className="icon-inline" size={18} />
            <span className="detail-text">{duration}</span>
          </div>
          <div className="detail-item">
            <IoIosPeople className="icon-inline" size={18} />
            <span className="detail-text">{seatsAvailable} seats available</span>
          </div>
          <div className="detail-item">
            <FaCalendar className="icon-inline" size={16} />
            <span className="detail-text">{date}</span>
          </div>
        </div>

        <div className="price-section">
          <div className="prices">
            <div className="current-price">${price}</div>
            <div className="original-price">${originalPrice}</div>
          </div>

          <Link href={`/booking/${id}`} className="book-button" aria-label={`Book ${route}`}>
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
