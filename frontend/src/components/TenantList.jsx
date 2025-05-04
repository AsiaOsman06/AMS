import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TenantHome.css";

const TenantHome = ({ user }) => {
  const [rentDue, setRentDue] = useState(null);

  useEffect(() => {
    const fetchRent = async () => {
      try {
        if (!user?.id) return;
        const res = await axios.get(`http://localhost:5002/api/tenant-rent/${user.id}`);
        setRentDue(res.data.rentDue);
      } catch (err) {
        console.error("Failed to fetch rent:", err);
        setRentDue("N/A");
      }
    };

    fetchRent();
  }, [user]);

  return (
    <div className="tenant-home-container">
      <div className="welcome-card">
        <h2>Welcome back, {user?.name || "Tenant"}!</h2>
        <p>Here’s a quick look at your account.</p>
      </div>

      <div className="rent-box">
        <h3>Rent Due</h3>
        <div className="rent-amount">
          {rentDue !== null ? `$${parseFloat(rentDue).toFixed(2)}` : "Loading..."}
        </div>
        <div className="rent-status">
          {parseFloat(rentDue) > 0 ? "Due soon" : "No rent due"}
        </div>
      </div>
    </div>
  );
};

export default TenantHome;
