import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OwnerTickets.css";

const OwnerTickets = () => {
  const [tickets, setTickets] = useState([
    //DELETE THIS REGION OF CODE IN ACTUAL USE
    //#region
    {
        id: 1,
        ticketNumber: "000431",
        subject: "Fixing leaking faucet",
        tenant: "John Smith",
        building: "3",
        room: "534",
        status: "In process...",
        finishDate: "03/21/2025"
    },
    {
        id: 2,
        ticketNumber: "000433",
        subject: "Fixing broken heater",
        tenant: "Jake Long",
        building: "2",
        room: "153",
        status: "Approved",
        finishDate: "03/23/2025"
    },
    {
        id: 3,
        ticketNumber: "000431",
        subject: "Fixing leaking faucet",
        tenant: "John Smith",
        building: "3",
        room: "534",
        status: "Awaiting Approval",
        finishDate: "03/21/2025"
    }
    //#endregion
  ]);

  //Accepts an array of tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleAction = (ticketId, action) => {
    // Code to update ticket in database...

  };





  
  const renderButtons = (ticket) => {
    const status = ticket.status.toLowerCase();

    if (status.includes("in process")) {
      return (
        <>
            <button className="complete-button" onClick={() => handleAction(ticket.id, "Complete")}>Complete</button>
            <button className="transition-button" onClick={() => handleAction(ticket.id, "Approved")}>Revert</button>
        </>
      );
    }

    if (status.includes("awaiting approval")) {
      return (
        <>
            <button className="transition-button" onClick={() => handleAction(ticket.id, "Approved")}>Approve</button>
            <button className="reject-button" onClick={() => handleAction(ticket.id, "Reject")}>Reject</button>
        </>
      );
    }

    if (status.includes("approved")) {
      return (
        <>
          <button className="transition-button" onClick={() => handleAction(ticket.id, "In-Process")}>In-Process</button>
          <button className="transition-button" onClick={() => handleAction(ticket.id, "Awaiting Approval")}>Awaiting Approval</button>
        </>
      );
    }

    return null;
  };

  return (
    <div className="master-container">
      <div className="title-container">Tickets</div>

      {tickets.map((ticket, index) => (
        <div className="ticket-container" key={ticket.id || index}>
          <div className="ticket-number">
            <b>Ticket #{ticket.ticketNumber}</b>
          </div>

          <div className="ticket-card">
            <div className="ticket-details">
              <p><b>Subject: </b>{ticket.subject}</p>
              <p><b>Tenant: </b>{ticket.tenant}</p>
              <p><b>Building: </b>{ticket.building}</p>
              <p><b>Room: </b>{ticket.room}</p>
              <p><b>Status: </b>{ticket.status}</p>
              <p><b>Estimated Finished date: </b>{ticket.finishDate}</p>
            </div>

            <div className="button-container">
                {renderButtons(ticket)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OwnerTickets;