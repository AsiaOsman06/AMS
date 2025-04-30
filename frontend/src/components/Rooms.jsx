import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";
import { Slider, Typography, Box } from "@mui/material";

const Rooms = () => {
  console.log("Rooms component mounted");

  // Filters State Object
  const [filters, setFilters] = useState({
    bedrooms: 2,
    bathrooms: 1,
    floor: 1,
    priceRange: [300, 800],
  });

  // Room Data State Object
  const [roomData, setRoomData] = useState({
    imageUrl:
      "https://resource.rentcafe.com/image/upload/q_auto,f_auto/s3/2/111265/gallery-flats_1-bedroom-apartment_kitchen-livingroom-2_p7400767.png",
    bedrooms: 2,
    bathrooms: 1,
    rent: 500,
    building: 1,
    floor: 1,
    roomNum: 111,
    description: "Default Description",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = async (e) => {
    // Your filtering logic here
  };

  return (
    <div className="master-layout">
      <div className="filter-container">
        <div className="filter-card">

          {/* Bedrooms */}
          <label htmlFor="bedrooms">Bedrooms: </label>
          <select
            id="bedrooms"
            className="select-box"
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange("bedrooms", Number(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          {/* Bathrooms */}
          <label htmlFor="bathrooms">Bathrooms: </label>
          <select
            id="bathrooms"
            className="select-box"
            value={filters.bathrooms}
            onChange={(e) => handleFilterChange("bathrooms", Number(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>

          {/* Floor */}
          <label htmlFor="floor">Floor: </label>
          <select
            id="floor"
            className="select-box"
            value={filters.floor}
            onChange={(e) => handleFilterChange("floor", Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          {/* Price Range Slider */}
          <div className="slider-container">
            <label htmlFor="price">Price: </label>
            <Slider
              value={filters.priceRange}
              onChange={(e, newValue) => handleFilterChange("priceRange", newValue)}
              valueLabelDisplay="auto"
              min={300}
              max={800}
              step={10}
              sx={{
                color: '#0f1f35'
              }}
            />
            <div className="slider-values">
              <label>Min:</label>
              <div className="value-box">${filters.priceRange[0]}</div>
              <label className="max-label">Max:</label>
              <div className="value-box">${filters.priceRange[1]}</div>
            </div>
          </div>

          <button type="button" className="filter-btn" onClick={applyFilters}>
            Filter
          </button>
        </div>
      </div>

      {/* Room Display */}
      <div className="rooms-container">
        <div className="room-card">

          {/* Image */}
          <div className="room-element">
            <div className="picture-container">
              <img
                src={roomData.imageUrl}
                alt="Room"
              />
            </div>
          </div>

          {/* Room Details */}
          <div className="room-element">
            <div className="data-container">
                <p><b>Bedrooms: </b>{roomData.bedrooms}</p>
                <p><b>Bathrooms: </b>{roomData.bathrooms}</p>
                <p><b>Rent: </b>${roomData.rent}</p>
            </div>
          </div>

          <div className="room-element">
            <div className="data-container">
                <p><b>Building: </b>{roomData.building}</p>
                <p><b>Floor: </b>{roomData.floor}</p>
                <p><b>Room: </b>{roomData.roomNum}</p>
            </div>
          </div>

          <div className="room-element">
            <div className="description-container">
              <h2>Description</h2>
              <h3>{roomData.description}</h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Rooms;