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
import OwnerNavBar from "./components/NavBars/OwnerNavBar";

// Pages
import TenantHome from "./components/TenantHome";
import Login from "./components/Login";
import UserRegister from "./components/UserRegister";
import Apply from "./components/Apply";
import Contact from "./components/Contact";
import Rooms from "./components/Rooms";
import Home from "./components/Home";
import MaintenanceForm from "./components/MaintenanceForm";
import TenantRent from "./components/TenantRent";
import OwnerTickets from "./components/OwnerTickets";
import OwnerHome from "./components/OwnerHome"; //  NEW IMPORT
import RoomDetails from "./components/RoomDetails"; // NEW IMPORT
import OwnerApplications from "./components/OwnerApplications"; // ✅ NEW IMPORT

import "./styles.css";

const App = () => {
  const [user, setUser] = useState(null); // initially no user
  const [userRole, setUserRole] = useState("owner"); // default to owner

  return (
    <Router>
      {/* NAVBAR BASED ON MODE */}
      {userRole === "guest" && <GuestNavBar />}
      {userRole === "tenant" && (
        <TenantNavBar user={user} setUser={setUser} setUserRole={setUserRole} />
      )}
      {userRole === "owner" && (
        <OwnerNavBar user={user} setUser={setUser} setUserRole={setUserRole} />
      )}

      <div className="main-container">
        <Routes>
          {/* REDIRECT "/" BASED ON MODE */}
          <Route
            path="/"
            element={
              userRole === "guest" ? (
                <Navigate to="/home" />
              ) : userRole === "tenant" ? (
                <Navigate to="/tenant-home" />
              ) : (
                <Navigate to="/owner-home" />
              )
            }
          />
          {/* ROUTES */}
          <Route path="/home" element={<Home />} />
          <Route path="/tenant-home" element={<TenantHome user={user} />} />
          <Route path="/owner-home" element={<OwnerHome user={user} />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} setUserRole={setUserRole} />}
          />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room-details/:roomNumber" element={<RoomDetails />} />
          <Route path="/maintenanceForm" element={<MaintenanceForm user={user} />} />
          <Route path="/ownerTickets" element={<OwnerTickets />} />
          <Route path="/rent" element={<TenantRent />} />
          {/* ✅ NEW: Owner Applications route */}
          <Route path="/owner-applications" element={<OwnerApplications />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
