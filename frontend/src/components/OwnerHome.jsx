import React, { useEffect, useState } from "react";
import "./OwnerHome.css";
import axios from "axios";

const OwnerHome = () => {
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [completedTickets, setCompletedTickets] = useState([]); // <-- corrected state name
  const [expectedIncome, setExpectedIncome] = useState("");
  const [incomeDate, setIncomeDate] = useState("");

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Error fetching announcements", err);
    }
  };

  // Fetch completed tickets
  const fetchCompletedTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/tickets/completed");
      const formatted = res.data.map((ticket) => ({
        id: ticket.id,
        subject: ticket.topic,
        description: ticket.description,
        tenant: ticket.tenant, // update if available in data
        building: ticket.building,
        room: ticket.room,
        submitted: new Date(ticket.createdAt).toLocaleDateString(),
      }));
      setCompletedTickets(formatted);
    } catch (err) {
      console.error("Error fetching completed tickets", err);
    }
  };

  // Post new announcement
  const handleAnnounce = async () => {
    if (!newAnnouncement.trim()) return;

    try {
      await axios.post("http://localhost:5002/api/announcements", {
        message: newAnnouncement,
      });
      setNewAnnouncement("");
      fetchAnnouncements(); // refresh list
    } catch (err) {
      console.error("Error posting announcement", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchCompletedTickets(); // <-- fetch on load
  }, []);

  return (
    <div className="owner-home-container">
      {/* LEFT SECTION */}
      <div className="left-section">
        <div className="full-banner">
          <h2 className="welcome-text">Welcome back, MGA Owner!</h2>
        </div>

        <div className="announcement-section">
          <h3>Announcements</h3>
          <textarea
            placeholder="Type new announcement..."
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
          />
          <button className="announce-btn" onClick={handleAnnounce}>Announce</button>
        </div>

        <div className="announcement-history">
          {announcements.length === 0 ? (
            <p style={{ marginLeft: "1rem" }}>No announcements yet.</p>
          ) : (
            announcements.map((item, index) => (
              <div className="announcement-wrapper" key={index}>
                <p className="announcement-date">{item.date}</p>
                <div className="announcement-card">
                  <p>{item.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="middle-section">
        <div className="middle-container">
          <div className="income-box">
            <div className="income-header">Expected Income</div>
            <div className="income-amount">{expectedIncome || "—"}</div>
            <div className="income-date">{incomeDate || "--/--"}</div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <div className="right-container">
          <div className="section-header">Completed tickets</div>
          {completedTickets.length === 0 ? (
            <p style={{ paddingLeft: "1rem" }}>No completed tickets yet.</p>
          ) : (
            completedTickets.map((ticket) => (
              <div className="ticket green-box wide-box" key={ticket.id}>
                <strong>Ticket #{ticket.id}</strong>
                <p>Topic: {ticket.subject}</p>
                <p>Description: {ticket.description}</p>
                <p>Tenant: {ticket.tenant}</p>
                <p>Building: {ticket.building}</p>
                <p>Room: {ticket.room}</p>
                <p>Submit date: {ticket.submitted}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
