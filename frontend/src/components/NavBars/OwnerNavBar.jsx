// OwnerNavBar.jsx
import { NavLink } from "react-router-dom";
import "./NavBarStyles.css";

const OwnerNavBar = ({ user, setUser }) => {
  return (
    <nav className="custom-navbar">
      <h1 className="logo">Maple Grove Apartments</h1>
      <div className="nav-links">
        <NavLink
          to="/OwnerTickets"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Maintenance
        </NavLink>

        <NavLink
          to="/owner-home"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/rent"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Rent
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav-btn active logout-btn" : "nav-btn logout-btn"
          }
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default OwnerNavBar;
