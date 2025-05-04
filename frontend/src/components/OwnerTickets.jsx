import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OwnerTickets.css";
import { useNavigate } from "react-router-dom";

const OwnerTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/owner-tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      await axios.put("http://localhost:5002/api/tickets/update-status", {
        ticketId,
        status: newStatus,
      });

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.TicketID === ticketId ? { ...ticket, Status: newStatus } : ticket
        )
      );

      if (newStatus === "Completed") {
        navigate("/owner-home");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <div className="owner-tickets-container">
      <h2 className="title">Maintenance Tickets</h2>
      <table className="tickets-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Description</th>
            <th>Tenant</th>
            <th>Building</th>
            <th>Room</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.TicketID}>
              <td>{ticket.Topic}</td>
              <td>{ticket.Subject}</td>
              <td>{ticket.TenantName}</td>
              <td>{ticket.Building}</td>
              <td>{ticket.Room}</td>
              <td>{ticket.AssignedTo}</td>
              <td>{ticket.Status}</td>
              <td>{new Date(ticket.DateCreated).toLocaleDateString()}</td>
              <td>
                {ticket.Image ? (
                  <a
                    href={`http://localhost:5002/uploads/${ticket.Image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`http://localhost:5002/uploads/${ticket.Image}`}
                      alt="Ticket"
                      style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  </a>
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="transition-button"
                    onClick={() => updateTicketStatus(ticket.TicketID, "In Progress")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => updateTicketStatus(ticket.TicketID, "Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="complete-button"
                    onClick={() => updateTicketStatus(ticket.TicketID, "Completed")}
                  >
                    Complete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerTickets;
