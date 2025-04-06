import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

// Components
import TenantList from "./components/TenantList";
import TenantForm from "./components/TenantForm";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Rooms from "./components/Rooms";
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
      {/* ✅ Navigation Bar */}
      <nav className="custom-navbar">
        <h1 className="logo">Maple Grove Apartments</h1>
        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            Rooms
          </NavLink>

          {/* ✅ Always visible Register */}
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            Register
          </NavLink>

          {user ? (
            <>
              <span className="text-yellow-400">Welcome, {user.name}</span>
              <button onClick={() => setUser(null)} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-btn active" : "nav-btn"
                }
              >
                Login
              </NavLink>

              {/* ✅ Apply only when user is NOT logged in */}
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "nav-btn active" : "nav-btn"
                }
              >
                Apply
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {/* ✅ Page Content */}
      <div className="main-container">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              user ? (
                <div className="mt-6">
                  <TenantForm setTenants={setTenants} />
                  <TenantList tenants={tenants} />
                </div>
              ) : (
                <div className="home-page">
                  <h2 className="main-heading">
                    Welcome to the Apartment Management System
                  </h2>
                  <p className="main-description">
                    Explore our apartment listings and find your perfect home.
                  </p>
                  <div className="action-buttons">
                    <NavLink to="/rooms" className="btn view-apartments">
                      View Apartments
                    </NavLink>
                    <NavLink to="/register" className="btn apply-now">
                      Apply Now
                    </NavLink>
                  </div>
                </div>
              )
            }
          />

          {/* Auth & Utility Routes */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
