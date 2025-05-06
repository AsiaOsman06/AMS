import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Apply.css";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    building: "Building 1",
    room: "Room 145",
    creditScore: "",
    licenseNumber: "",
    accommodations: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Populate fields if redirected with query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const building = params.get("building");
    const room = params.get("room");

    if (building || room) {
      setFormData((prev) => ({
        ...prev,
        building: building || prev.building,
        room: room || prev.room,
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5002/api/applications",
        formData
      );
      setSuccess(response.data.message);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        building: "Building 1",
        room: "Room 145",
        creditScore: "",
        licenseNumber: "",
        accommodations: "",
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="register-layout">
      <div className="info-box">
        <p>
          For any questions or comments regarding Maple Grove Apartments, please
          use the contact page as linked above.
        </p>
      </div>

      <div className="register-card">
        <h2>Application Form</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="John"
                onChange={handleChange}
                className="register-input"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Smith"
                onChange={handleChange}
                className="register-input"
                required
              />
            </div>
          </div>

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="john.smith@example.com"
            onChange={handleChange}
            className="register-input"
            required
          />

          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label>Preferred Building:</label>
              <select
                name="building"
                value={formData.building}
                onChange={handleChange}
                className="register-input"
              >
                <option value="#L3E">#L3E</option>
                <option value="#Y2C">#Y2C</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Preferred Room:</label>
              <select
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="register-input"
              >
                <option value="Room 101">Room 101</option>
                <option value="Room 102">Room 102</option>
                <option value="Room 103">Room 103</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label>Credit Score:</label>
              <input
                type="number"
                name="creditScore"
                value={formData.creditScore}
                placeholder="650"
                onChange={handleChange}
                className="register-input"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>License Number:</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                placeholder="A123-456-789"
                onChange={handleChange}
                className="register-input"
                required
              />
            </div>
          </div>

          <label>Accommodations (Optional):</label>
          <textarea
            name="accommodations"
            placeholder="Any special requests?"
            value={formData.accommodations}
            onChange={handleChange}
            className="register-input"
            rows={4}
          />

          <button type="submit" className="register-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
