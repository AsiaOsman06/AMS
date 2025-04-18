import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./UserRegister.css"; // Using its own styled file

const UserRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  //  Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
<<<<<<< HEAD
      const response = await axios.post("http://localhost:5002/api/register", {
=======
      const response = await axios.post("http://localhost:3000/api/register", {
>>>>>>> main
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setSuccess("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="user-register-container">
      <div className="user-register-box">
        <h2>Register</h2>

        {/*  Display error or success */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {/*  Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="name-row">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        {/*  Login Redirect */}
        <div className="login-link">
          Already registered? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
