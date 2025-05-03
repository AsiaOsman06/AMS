// OwnerApplications.jsx
import React, { useState, useEffect } from "react";
import "./OwnerApplications.css";

const OwnerApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Hardcoded test data for now
    setApplications([
      {
        id: 1,
        firstName: "Sarah",
        lastName: "Nguyen",
        email: "sarah@example.com",
        building: "Maple A",
        room: "101",
        credit_score: 720,
        license_number: "D12345678",
        accommodations: "None",
      },
      {
        id: 2,
        firstName: "Jake",
        lastName: "Lee",
        email: "jake@example.com",
        building: "Maple B",
        room: "205",
        credit_score: 680,
        license_number: "X99887766",
        accommodations: "Needs accessible unit",
      },
    ]);
  }, []);

  const handleDecision = (id, decision) => {
    alert(`Application ID ${id} has been ${decision}`);
    setApplications(applications.filter((app) => app.id !== id));
  };

  return (
    <div className="owner-applications-container">
      <h2>Pending Applications</h2>
      {applications.length === 0 ? (
        <p>No applications to review.</p>
      ) : (
        applications.map((app) => (
          <div key={app.id} className="application-card">
            <p><strong>Name:</strong> {app.firstName} {app.lastName}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Building:</strong> {app.building}</p>
            <p><strong>Room:</strong> {app.room}</p>
            <p><strong>Credit Score:</strong> {app.credit_score}</p>
            <p><strong>License Number:</strong> {app.license_number}</p>
            <p><strong>Accommodations:</strong> {app.accommodations}</p>
            <div className="button-group">
              <button className="accept-btn" onClick={() => handleDecision(app.id, "accepted")}>Accept</button>
              <button className="reject-btn" onClick={() => handleDecision(app.id, "rejected")}>Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerApplications;
