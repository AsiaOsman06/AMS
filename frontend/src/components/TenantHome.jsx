import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TenantHome.css";

const TenantHome = ({ user }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [rent, setRent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [editForm, setEditForm] = useState({ topic: "", urgency: "", description: "" });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        const announcementsRes = await axios.get("http://localhost:5002/api/announcements");
        setAnnouncements(announcementsRes.data);

        const ticketsRes = await axios.get(`http://localhost:5002/api/tickets/${user.id}`);
        setTickets(ticketsRes.data);
      } catch (err) {
        console.error("Failed to fetch tenant data:", err);
      }
    };
    fetchData();
  }, [user]);

  const handleEditClick = (ticket) => {
    setEditingTicket(ticket.id);
    setEditForm({ topic: ticket.topic, urgency: ticket.urgency, description: ticket.description });
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:5002/api/tickets/${id}`, editForm);
      const updatedTickets = tickets.map((t) =>
        t.id === id ? { ...t, ...editForm } : t
      );
      setTickets(updatedTickets);
      setEditingTicket(null);
    } catch (err) {
      console.error("Error updating ticket:", err);
    }
  };

  return (
    <div className="tenant-home-container">
      {/* LEFT SIDE */}
      <div className="left-column">
        <div className="welcome-box">
          <h2>Welcome back,<br />{user?.name || "Tenant"}!</h2>
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
        <div className="rent-box">
          <div className="rent-header">Rent Due</div>
          <p className="rent-amount">
            {rent?.amount !== undefined
              ? `$${parseFloat(rent.amount).toFixed(2)}`
              : "$0.00"}
          </p>
          <p className="rent-date">
            {rent?.dueDate
              ? `Due by: ${new Date(rent.dueDate).toLocaleDateString()}`
              : "N/A"}
          </p>
        </div>

        {/* MAINTENANCE TICKETS */}
        <div className="tickets-box">
          <div className="tickets-header">Your Maintenance Tickets</div>
          {tickets.length === 0 ? (
            <p className="no-tickets-msg">No maintenance tickets submitted yet.</p>
          ) : (
            <div className="tickets-list">
              {tickets.map((ticket) => (
                <div className="ticket-card" key={ticket.id}>
                  <strong>Ticket #{ticket.id}</strong><br />
                  {editingTicket === ticket.id ? (
                    <>
                      <div>
                        <b>Topic:</b>
                        <input
                          type="text"
                          value={editForm.topic}
                          onChange={(e) => setEditForm({ ...editForm, topic: e.target.value })}
                        />
                      </div>
                      <div>
                        <b>Urgency:</b>
                        <select
                          value={editForm.urgency}
                          onChange={(e) => setEditForm({ ...editForm, urgency: e.target.value })}
                        >
                          <option value="urgent">Urgent</option>
                          <option value="somewhat urgent">Somewhat Urgent</option>
                          <option value="not urgent">Not Urgent</option>
                        </select>
                      </div>
                      <div>
                        <b>Description:</b>
                        <textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        />
                      </div>
                      <button onClick={() => handleEditSubmit(ticket.id)}>Save</button>
                      <button onClick={() => setEditingTicket(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <div><b>Topic:</b> {ticket.topic}</div>
                      <div><b>Urgency:</b> {ticket.urgency}</div>
                      <div><b>Description:</b> {ticket.description}</div>
                      <div><b>AssignedTo:</b> {ticket.assignedTo}</div>
                      <div><b>Status:</b> {ticket.status}</div>
                      <div><b>SubmittedOn:</b> {new Date(ticket.createdAt).toLocaleDateString()}</div>

                      {(ticket.status === "Pending" || ticket.status === "In Progress") && (
                        <div className="ticket-actions">
                          <button onClick={() => handleEditClick(ticket)}>Edit</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SUPPORT SECTION */}
      <div className="support-section">
        <div className="support-text">
          For any questions or issues
          <br />
          about the Maple Grove
          <br />
          Apartments AMS software,
          <br />
          please contact <span>AMS@gmail.com</span>
          <br />
          for support
        </div>
      </div>
    </div>
  );
};

export default TenantHome;
