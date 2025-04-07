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
          
          {/*Must add route for every new page*/}

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/"/></Routes>

          <div className="master-layout">
            <div className="quote-container">
              <div className="quote-box">
                <p className="quote">“At my lowest point, I was blessed to of found Maple Grove Apartments
                   for my family. The best home at the best prices for people like us!”</p>
                <p className="customer">- Satisfied customer #1</p>
              </div>

              <div className="quote-box">
                <p className="quote">“I guess good landlords do exist! I’d recommend Maple Grove Apartments
                   to anyone!”</p>
                <p className="customer">- Satisfied customer #2</p>
              </div>

              <div className="quote-box">
                <p className="quote">“My friends were SOOO jealous to hear I got a room at MG Apartments!”</p>
                <p className="customer">- Satisfied customer #3</p>
              </div>
            </div>

            <div className="welcome-container">
              <div className="welcome-card">
                <p className="welcome-message">At MG Apartments, we strive to provide the best, most affordable,
                  and seamless experience for renters looking for their next home. Whether a family of five or
                  single, we have the right room for you! Feel free to browse our expansive list of available
                  rooms, or contact us with any questions!
                </p>
              </div>    
            </div>

            <div className="quote-container">
              <div className="quote-box">
                <p className="quote">“Prompt responses, great customer service, and a real dedication to their 
                  tenants. Honestly wish I didn’t have to leave.”</p>
                <p className="customer">- Satisfied customer #4</p>
              </div>

              <div className="quote-box">
                <p className="quote">“Very happy with my choice of apartment. Always felt like home, with the 
                  friendliest neighbors!”</p>
                <p className="customer">- Satisfied customer #5</p>
              </div>

              <div className="quote-box">
                <p className="quote">“Always felt like I was taken care of. Every concern was promptly 
                  responded to, and always followed up with”</p>
                <p className="customer">- Satisfied customer #6</p>
              </div>
            </div>
          </div>

      </div>
    </Router>
  );
};

export default App;
