import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TenantList from "./components/TenantList";
import TenantForm from "./components/TenantForm";
import Login from "./components/Login";
import Register from "./components/Register";
import "./styles.css"; 

const App = () => {
  const [tenants, setTenants] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5002/api/tenants")
        .then((response) => setTenants(response.data))
        .catch((error) => console.error("Error fetching tenants:", error));
    }
  }, [user]);

  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar">
        <h1>Maple Grove Apartments</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/buildings">Buildings</Link>
          {user ? (
            <div className="nav-links">
              <span className="text-yellow-400">Welcome, {user.name}</span>
              <button onClick={() => setUser(null)} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-container">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              user ? (
                <div className="mt-6">
                  <TenantForm setTenants={setTenants} />
                  <TenantList tenants={tenants} />
                </div>
              ) : (
                <div>
                  <h2 className="main-heading">
                    Welcome to the Apartment Management System
                  </h2>
                  <p className="main-description">
                    Explore our apartment listings and find your perfect home.
                  </p>
                  <div className="action-buttons">
                    <Link to="/buildings" className="btn view-apartments">
                      View Apartments
                    </Link>
                    <Link to="/register" className="btn apply-now">
                      Apply Now
                    </Link>
                  </div>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
