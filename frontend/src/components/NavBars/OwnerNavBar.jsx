import { NavLink } from "react-router-dom";
import "./NavBarStyles.css";

const TenantNavBar = ({ user, setUser }) => {
    return (
        <nav className="custom-navbar">
        <h1 className="logo">Maple Grove Apartments</h1>
        <div className="nav-links">
        <NavLink
            to="/OwnerTickets"
            end
            className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
            }
        >
            Maintenance
        </NavLink>

        </div>
        </nav>
    );
};

export default TenantNavBar;