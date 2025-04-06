import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";
import { Slider, Typography, Box } from '@mui/material';

const Rooms = () => {
  console.log("Rooms component mounted");

  const [bedroomsFil, setbedroomsFil] = useState(2);
  const [bathroomsFil, setBathroomsFil] = useState(1);
  const [floorFil, setFloorFil] = useState(1);
  const [priceRange, setRange] = useState([300, 800]);

  const [imageUrl, setImage] = useState('https://resource.rentcafe.com/image/upload/q_auto,f_auto/s3/2/111265/gallery-flats_1-bedroom-apartment_kitchen-livingroom-2_p7400767.png');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [rent, setRent] = useState(500);
  const [building, setBuilding] = useState(1);
  const [floor, setFloor] = useState(1);
  const [roomNum, setRoomNum] = useState(111);
  const [description, setDescription] = useState("Default Description");

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
          <div className="room-card">

          { /*Picture*/ }
          <div className="room-element">
            <div className="picture-container">
              <img
              src={imageUrl}
              alt="Description of image"
              onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

            { /*Bedrooms, bathrooms, rent*/ }
          <div className="room-element">
            <div className="data-container">
              <div className="data-Line">
                <p><b>Bedrooms: </b>{bedrooms}</p>
              </div>

              <div className="data-Line">
                <p><b>Bathrooms: </b>{bathrooms}</p>
              </div>

              <div className="data-Line">
                <p><b>Rent: </b>${rent}</p>
              </div>
            </div>
          </div>

            { /*Building, floor, room*/ }
            <div className="room-element">
              <div className="data-container">
              <div className="data-Line">
                  <p><b>Building: </b>{building}</p>
                </div>

                <div className="data-Line">
                  <p><b>Floor: </b>{floor}</p>
                </div>

                <div className="data-Line">
                  <p><b>Room: </b>{roomNum}</p>
                </div>
              </div>
            </div>

            { /* Description */ }
            <div className="room-element">
              <div className="description-container">
                <h2>Description</h2>
                <h3>{description}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Rooms;
