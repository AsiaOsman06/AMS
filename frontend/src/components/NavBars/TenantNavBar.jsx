import { NavLink } from "react-router-dom";
import "./GuestNavBar.css";

const TenantNavBar = ({ user, setUser }) => {
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
            TestingTesting
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
    );
};

export default TenantNavBar;