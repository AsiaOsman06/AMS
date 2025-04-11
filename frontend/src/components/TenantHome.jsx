import React from "react";
import "./TenantHome.css";

const TenantHome = ({ user }) => {
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
        {/* ANNOUNCEMENT */}
        <div className="announcement-box">
          <h3>Announcements</h3>

          <div className="announcement-entry">
            <div className="announcement-date">03/20</div>
            <div className="announcement-message">
              Tenant gathering in the ballroom at <strong>5:00 PM TONIGHT!</strong><br />
              Food and drink included!
            </div>
          </div>

          <div className="announcement-entry">
            <div className="announcement-date">03/18</div>
            <div className="announcement-message">
              Remember to move any vehicles off the road before <strong>4:00 PM</strong> to avoid getting towed.
            </div>
          </div>

          <div className="announcement-entry">
            <div className="announcement-date">03/14</div>
            <div className="announcement-message">
              2 for 1 special at Culvers!
            </div>
          </div>

          <div className="announcement-entry">
            <div className="announcement-date">03/13</div>
            <div className="announcement-message">
              Lost pet: Gracie<br />
              Cat, short fur, grey and black striped pattern, very friendly. Has a gold medallion around neck with name and phone number to contact. Be on the lookout!
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-column">
        <div className="rent-box">
          <div className="rent-header">Rent Due</div>
          <p className="rent-amount">$475</p>
          <p className="rent-date">04/03</p>
        </div>

        {/* Maintenance Tickets */}
        <div className="tickets-box">
          <div className="tickets-header">Maintenance Tickets</div>

          <div className="ticket-card">
            <strong>Ticket #000432</strong><br />
            Subject: Fixing leaking faucet<br />
            Status: In process...<br />
            Estimated finish date: 03/21/2025
          </div>

          <div className="ticket-card">
            <strong>Ticket #000415</strong><br />
            Subject: Heat not working<br />
            Status: Completed<br />
            Completion date: 02/18/2025
          </div>

          <div className="ticket-card">
            <strong>Ticket #000250</strong><br />
            Subject: Internet not working<br />
            Status: Completed<br />
            Completion date: 12/18/2024
          </div>
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
