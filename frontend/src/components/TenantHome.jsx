// TenantHome.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TenantHome.css";

const TenantHome = ({ user }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [rent, setRent] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch announcements
        const announcementsRes = await axios.get("http://localhost:5002/api/announcements");
        setAnnouncements(announcementsRes.data);

        // Fetch rent info
        const rentRes = await axios.get(`http://localhost:5002/api/rent/${user.id}`);
        setRent(rentRes.data);

        // Fetch maintenance tickets
        const ticketsRes = await axios.get(`http://localhost:5002/api/tickets/${user.id}`);
        setTickets(ticketsRes.data);
      } catch (err) {
        console.error("Failed to fetch tenant data:", err);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="tenant-home-container">
      {/* LEFT SIDE */}
      <div className="left-column">
        <div className="welcome-box">
          <h2>
            Welcome back,<br />
            {user?.name || "Tenant"}!
          </h2>
        </div>

        {/* ANNOUNCEMENTS */}
        <div className="announcement-box">
          <h3>Announcements</h3>
          {announcements.map((a, index) => (
            <div className="announcement-entry" key={index}>
              <div className="announcement-date">{a.date}</div>
              <div className="announcement-message">{a.message}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-column">
        {/* RENT */}
        <div className="rent-box">
          <div className="rent-header">Rent Due</div>
          <p className="rent-amount">{rent?.amount ? `$${rent.amount}` : "$0"}</p>
          <p className="rent-date">{rent?.dueDate || "N/A"}</p>
        </div>

        {/* MAINTENANCE TICKETS */}
        <div className="tickets-box">
          <div className="tickets-header">Maintenance Tickets</div>
          {tickets.map((ticket) => (
            <div className="ticket-card" key={ticket.id}>
              <strong>Ticket #{ticket.id}</strong><br />
              Subject: {ticket.subject}<br />
              Status: {ticket.status}<br />
              {ticket.status === "Completed"
                ? `Completion date: ${ticket.date}`
                : `Estimated finish date: ${ticket.date}`}
            </div>
          ))}
        </div>
      </div>

      {/* SUPPORT SECTION */}
      <div className="support-section">
        <div className="support-text">
          For any questions or issues<br />
          about the Maple Grove<br />
          Apartments AMS software,<br />
          please contact <span>AMS@gmail.com</span><br />
          for support
        </div>
      </div>
    </div>
  );
};

export default TenantHome;
