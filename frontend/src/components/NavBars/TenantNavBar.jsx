// TenantNavBar.jsx

import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import "./TenantNavBar.css";

const TenantNavBar = ({ user, setUser }) => {
  return (
    <nav className="tenant-navbar">
      <h1 className="tenant-logo">Maple Grove Apartments</h1>
      <div className="tenant-links">
        <NavLink
          to="/tenant-home"
          className={({ isActive }) =>
            isActive ? "tenant-tab active" : "tenant-tab"
=======
import "./NavBarStyles.css";

const TenantNavBar = ({ user, setUser }) => {
  return (
    <nav className="custom-navbar">
      <h1 className="logo">Maple Grove Apartments</h1>
      <div className="nav-links">
        <NavLink
          to="/tenant-home"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
>>>>>>> main
          }
        >
          Home
        </NavLink>
        <NavLink
<<<<<<< HEAD
          to="/contact"
          className={({ isActive }) =>
            isActive ? "tenant-tab active" : "tenant-tab"
=======
          to="/maintenanceForm"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
>>>>>>> main
          }
        >
          Maintenance
        </NavLink>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
<<<<<<< HEAD
            isActive ? "tenant-tab active" : "tenant-tab"
=======
            isActive ? "nav-btn active" : "nav-btn"
>>>>>>> main
          }
        >
          Rent
        </NavLink>

        {user ? (
          <button
            onClick={() => setUser(null)}
            className="tenant-logout-btn"
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default TenantNavBar;
