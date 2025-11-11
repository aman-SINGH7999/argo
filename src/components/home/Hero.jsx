import React from 'react';
import './hero.css'
import { MdLocationOn } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div>
          <h1 style={{fontSize:"48px", marginBottom:0}}>Find Your Next Journey</h1>
          <p>Discover available trips and book your seats with ease.</p>
        </div>

        <form className="search-form">
          <div className="input-group">
            <label>From</label>
            <div className="input-with-icon">
              <input type="text" placeholder="Departure Location" />
              <span className="icon"><MdLocationOn /></span>
            </div>
          </div>

          <div className="input-group">
            <label>To</label>
            <div className="input-with-icon">
              <input type="text" placeholder="Arrival Location" />
              <span className="icon"><MdLocationOn /></span>
            </div>
          </div>

          <div className="input-group">
            <label>Date</label>
            <div className="input-with-icon">
              <input type="text" placeholder="mm/dd/yyyy" />
              <span className="icon"><FaCalendar /></span>
            </div>
          </div>

          <button type="submit" className="search-button">
            Search Trips
          </button>
        </form>
      </div>
    </div>
  );
}