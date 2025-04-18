// App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// NavBars
import GuestNavBar from "./components/NavBars/GuestNavBar";
import TenantNavBar from "./components/NavBars/TenantNavBar";
<<<<<<< HEAD
// import OwnerNavBar from "./components/NavBars/OwnerNavBar"; // Uncomment when ready
=======
import OwnerNavBar from "./components/NavBars/OwnerNavBar";
>>>>>>> main

// Pages
import TenantHome from "./components/TenantHome";
import Login from "./components/Login";
import UserRegister from "./components/UserRegister";
import Apply from "./components/Apply";
import Contact from "./components/Contact";
import Rooms from "./components/Rooms";
import Home from "./components/Home";
<<<<<<< HEAD
=======
import MaintenanceForm from "./components/MaintenanceForm";
>>>>>>> main

import "./styles.css";

const App = () => {
  // Mocked logged-in user
  const [user, setUser] = useState({ name: "Othello" });

  // Change this to "guest", "tenant", or "owner" to preview the correct view
<<<<<<< HEAD
  const [mode] = useState("tenant");
=======
  const [mode] = useState("guest");
>>>>>>> main

  return (
    <Router>
      {/* NAVBAR BASED ON MODE */}
      {mode === "guest" && <GuestNavBar />}
      {mode === "tenant" && <TenantNavBar user={user} setUser={setUser} />}
<<<<<<< HEAD
      {/* {mode === "owner" && <OwnerNavBar />} */}
=======
      {mode === "owner" && <OwnerNavBar user={user} setUser={setUser}/>}
>>>>>>> main

      <div className="main-container">
        <Routes>
          {/* REDIRECT "/" BASED ON MODE */}
          <Route path="/" element={
            mode === "guest" ? <Navigate to="/home" /> :
            mode === "tenant" ? <Navigate to="/tenant-home" /> :
            <Navigate to="/home" />
          } />

          {/* ROUTES */}
          <Route path="/home" element={<Home />} />
          <Route path="/tenant-home" element={<TenantHome user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms" element={<Rooms />} />
<<<<<<< HEAD
=======
          <Route path="/maintenanceForm" element={<MaintenanceForm />} />
>>>>>>> main
        </Routes>
      </div>
    </Router>
  );
};

export default App;
