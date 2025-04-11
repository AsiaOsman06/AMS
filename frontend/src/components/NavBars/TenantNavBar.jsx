// TenantNavBar.jsx

import { NavLink } from "react-router-dom";
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
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "tenant-tab active" : "tenant-tab"
          }
        >
          Maintenance
        </NavLink>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            isActive ? "tenant-tab active" : "tenant-tab"
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
