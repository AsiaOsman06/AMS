//Imports

//React Defaults
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


// Components
import GuestNavBar from "./components/NavBars/GuestNavBar";
import TenantNavBar from "./components/NavBars/TenantNavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Rooms from "./components/Rooms";
import Home from "./components/Home";
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
      

    <TenantNavBar user={user} setUser={setUser} />


      {/* ✅ Page Content */}
      <div className="main-container">
        <Routes>

          
          {/*Must add route for every new page*/}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms" element={<Rooms />} />

          <Route path="/"/>
        </Routes>
      </div>
      </Router>
  );
};

export default App;
