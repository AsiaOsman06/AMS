import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";
import { Slider, Typography, Box } from '@mui/material';

const Rooms = () => {
  console.log("Rooms component mounted");

  const [bedroomsFil, setbedroomsFil] = useState(2);
  const [bathroomsFil, setBathroomsFil] = useState(2);
  const [floorFil, setFloorFil] = useState(1);
  const [priceRange, setRange] = useState([300, 800]);

  const [imageUrl, setImage] = useState('https://resource.rentcafe.com/image/upload/q_auto,f_auto/s3/2/111265/gallery-flats_1-bedroom-apartment_kitchen-livingroom-2_p7400767.png');

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const applyFilters = async (e) => {
    { /*Fill with logic*/ }
  };

  return (
    <div className="master-layout">
      <div className="filter-container">
        <div className="filter-card">

          { /*Generate bedroom field*/ }
          <label htmlFor="Bedrooms">Bedrooms: </label>
          <select id="bedrooms"
          className="select-box">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          { /*Generate bathrooms field*/ }
          <label htmlFor="bathrooms">Bathrooms: </label>
          <select id="bathrooms"
          className="select-box">
            <option value="1">1</option>
            <option value="2">2</option>

            value={bathroomsFil}
              onChange={(e) => setBathroomsFil(e.target.value)}
          </select>

          { /*Generate floors field*/ }
          <label htmlFor="floor">Floor: </label>
          <select id="floor"
          className="select-box">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>

        <div className="slider-container">
          <label htmlFor="price">Price: </label>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setRange(newValue)}
            valueLabelDisplay="auto"
            min={300}
            max={800}
            step={10}
            color="RED"
            />
            <div className="slider-values">
              <label htmlFor="min">Min: </label><div className="value-box">${priceRange[0]}</div>
              <label htmlFor="max" className="max-label">Max: </label><div className="value-box">${priceRange[1]}</div>
            </div>
          </div>

          <button type="filter" className="filter-btn">
              Filter
          </button>
        </div>
      </div>

      <div className="rooms-container">
        <div className="room-cards">
          <div className="room-card">
          { /*Picture*/ }
            <div className="picture-container">
            <img src={imageUrl} alt="Description of image" />

            </div>
            { /*Bedrooms, bathrooms, price*/ }
            <div className="data-container">


            </div>

            { /*Building, floor, room*/ }
            <div className="data-container">

            { /* Description */ }
            </div>

            <div className="Description container">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
