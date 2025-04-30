import React, { useEffect, useState } from "react";
import "./OwnerHome.css";

const OwnerHome = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [inProcessTickets, setInProcessTickets] = useState([]);
  const [newTickets, setNewTickets] = useState([]);
  const [expectedIncome, setExpectedIncome] = useState("");
  const [incomeDate, setIncomeDate] = useState("");

  useEffect(() => {
    // When backend is read
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
          <textarea placeholder="Type new announcement..." />
          <button className="announce-btn">Announce</button>
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

          <div className="in-process-tickets">
            <div className="section-header">In Process Tickets</div>
            {inProcessTickets.length === 0 ? (
              <p style={{ paddingLeft: "1rem" }}>No in-process tickets.</p>
            ) : (
              inProcessTickets.map((ticket) => (
                <div className="ticket green-box" key={ticket.id}>
                  <strong>Ticket #{ticket.id}</strong>
                  <p>Subject: {ticket.subject}</p>
                  <p>Tenant: {ticket.tenant}</p>
                  <p>Building: {ticket.building} | Room: {ticket.room}</p>
                  <p>Status: {ticket.status}</p>
                  <p>Estimated finish date: {ticket.completion}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <div className="right-container">
          <div className="section-header">New tickets</div>
          {newTickets.length === 0 ? (
            <p style={{ paddingLeft: "1rem" }}>No new tickets available.</p>
          ) : (
            newTickets.map((ticket) => (
              <div className="ticket green-box wide-box" key={ticket.id}>
                <strong>Ticket #{ticket.id}</strong>
                <p>Subject: {ticket.subject}</p>
                <p>Tenant: {ticket.tenant}</p>
                <p>Building: {ticket.building} | Room: {ticket.room}</p>
                <p>Submit date: {ticket.submitted}</p>
                <div className="ticket-actions">
                  <label htmlFor={`completion-${ticket.id}`}>
                    Estimated completion:
                  </label>
                  <input
                    id={`completion-${ticket.id}`}
                    type="text"
                    placeholder="MM/DD/YYYY"
                  />
                  <div className="button-row">
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Reject</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
