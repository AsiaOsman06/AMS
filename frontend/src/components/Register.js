import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // ✅ Import the CSS file

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // ✅ Added phone state
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !phone || !password) {
      setError("All fields are required");
      return;
    }

    //sending inputs to the backend
    try {
      await axios.post("http://localhost:5002/api/register", {
        name,
        email,
        phone,
        password,
      });

      //this is working when you register
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);

      // Clear input fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      setError(
        error.response?.data?.error || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>REGISTER</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
          />
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
