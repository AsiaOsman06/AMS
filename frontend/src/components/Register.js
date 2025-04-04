import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    building: "Building 1",
    room: "Room 145",
    password: "",
    confirmPassword: "",
    accommodations: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      firstName,
      lastName,
      email,
      building,
      room,
      password,
      confirmPassword,
      accommodations,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !building ||
      !room ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSuccess("Application submitted successfully!");
    console.log("Submitted:", formData);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      building: "Building 1",
      room: "Room 145",
      password: "",
      confirmPassword: "",
      accommodations: "",
    });
  };

  return (
    <div className="register-layout">
      <div className="info-box">
        <p>
          For any questions or comments regarding Maple Grove Apartments, please use the contact page as linked above.
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
                onChange={handleChange}
                className="register-input"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="register-input"
              />
            </div>
          </div>

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
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
                <option value="Building 1">Building 1</option>
                <option value="Building 2">Building 2</option>
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
                <option value="Room 145">Room 145</option>
                <option value="Room 203">Room 203</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="register-input"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Re-Type Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="register-input"
              />
            </div>
          </div>

          <label>Accommodations:</label>
          <textarea
            name="accommodations"
            placeholder="Wheelchair accessibility, financial assistance..."
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
