import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";
import { Slider, Typography, Box } from '@mui/material';

const Rooms = () => {
  const [priceRange, setRange] = useState([0, 600]);
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

        <label htmlFor="priceRange">Rent: </label>

        <Typography gutterBottom>
          Price range: ${priceRange[0]} - ${priceRange[1]}
        </Typography>

        <Slider
          value={priceRange}
          onChange={(e, newValue) => setRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
          color="secondary"
        />

        </div>
    </div>

      <div className="rooms-container">
        <div className="room-cards">
          <div className="room-card">
          <h2>rooms111</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
