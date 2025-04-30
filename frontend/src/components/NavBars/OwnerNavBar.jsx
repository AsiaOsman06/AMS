// OwnerNavBar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBarStyles.css";

const OwnerNavBar = ({ user, setUser, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser && setUser(null);
    setUserRole && setUserRole("guest"); //safe call
    navigate("/home"); // Redirect to guest home after logout
  };

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

        {/* ✅ Updated logout button */}
        <button
          type="button"
          onClick={handleLogout}
          className="nav-btn logout-btn"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default OwnerNavBar;

