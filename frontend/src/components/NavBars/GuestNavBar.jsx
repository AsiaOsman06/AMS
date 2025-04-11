import React from "react";
import { NavLink } from "react-router-dom";
import "./GuestNavBar.css";

const GuestNavbar = () => {
  return (
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

        {/* ✅ Register goes to /register */}
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Register
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Login
        </NavLink>

        {/* ✅ Apply now goes to /apply */}
        <NavLink
          to="/apply"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Apply
        </NavLink>
      </div>
    </nav>
  );
};

export default GuestNavbar;
