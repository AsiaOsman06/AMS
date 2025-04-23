// TenantNavBar.jsx

import { NavLink } from "react-router-dom";
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
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/maintenanceForm"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Maintenance
        </NavLink>
        <NavLink
          to="/rent"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
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