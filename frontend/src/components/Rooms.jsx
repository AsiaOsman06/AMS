import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";

const Rooms = () => {
  const [filters, setFilters] = useState({
    bedrooms: "",
    bathrooms: "",
    floor: "",
    priceRange: [500, 2000],
  });

  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load all rooms on first render
  useEffect(() => {
    loadAllRooms();
  }, []);

  const loadAllRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error loading rooms:", err);
      setError("Failed to load available rooms.");
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (index, value) => {
    const updated = [...filters.priceRange];
    updated[index] = Number(value);
    setFilters({ ...filters, priceRange: updated });
  };

  const applyFilters = async () => {
    setError("");
    try {
      const { bedrooms, bathrooms, floor, priceRange } = filters;

      const res = await axios.get("http://localhost:5002/api/rooms", {
        params: {
          bedrooms,
          bathrooms,
          floor,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        },
      });

      if (res.data.length > 0) {
        setRooms(res.data);
      } else {
        setRooms([]);
        setError("No rooms match the selected filters.");
      }
    } catch (err) {
      console.error("Filter error:", err);
      setError("Failed to apply filters.");
    }
  };

  return (
    <div className="rooms-container">
      <h2>Find Available Rooms</h2>

      <div className="filters">
        <label>
          Bedrooms
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Bathrooms
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Floor
          <input
            type="text"
            name="floor"
            placeholder="Floor"
            value={filters.floor}
            onChange={handleChange}
          />
        </label>
        <label>
          Rent ($):
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(0, e.target.value)}
          />
          <span>–</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
          />
        </label>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="results-grid">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <img
              src={room.imageUrl}
              alt="Room"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400?text=No+Image";
              }}
            />
            <h3>
              {room.numBedrooms} Bed - {room.numBathrooms} Bath |{" "}
              {room.squareFeet} sq.ft.
            </h3>
            <p>{room.description}</p>
            <p className="price">
              {room.rentAmount ? (
                <>Starting at ${room.rentAmount}</>
              ) : (
                <>Inquire for pricing</>
              )}
            </p>
            <p className="available-date">
              Available On: {new Date(room.availableDate).toLocaleDateString()}
            </p>
            <button
              className="action-btn"
              onClick={() => navigate(`/room-details/${room.roomNumber}`)}
            >
              Check Availability
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
