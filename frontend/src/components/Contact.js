import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5002/api/login", {
        email,
        password,
      });
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="forgot-password">Forgot password?</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
