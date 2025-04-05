import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const submitTicket = async (e) => {
    { /*Fill with logic*/ }
  };

  return (
    <div className="contact-layout">

      <div className="layout-container">
        <div className="information-container">
          <div className="information-card">
            <p>
              For any questions or comments regarding Maple Grove Apartments,
              please use the following contact form to inquire. We will respond
              as soon as we can, but it may take as long as 24 hours. For urgent
              matters, please reach out to use by phone.
            </p>
          </div>
      

        <div className="information-card">
          <p><b>Phone:</b> (555)-555-5555​</p>
            <p><b>Email:</b> MapleGroveApartments@MGA.com</p>
  </div>
  </div>
  </div>

    <div className="layout-container">
      <div className="contact-container">
        <div className="contact-card">
          <div className="title-container">
            <h2>Contact form</h2>
          </div>
          
          <form onSubmit={submitTicket}>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            { /*Generate name field*/ }
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type="text"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="contact-input"
              required
            />

            { /*Generate email field*/ }
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              placeholder="JohnSmith@Gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="contact-input"
              required
            />

            { /*Generate topic field*/ }
            <label htmlFor="topic">Topic: </label>
            <select id="topic"
            className="contact-input"
            required>

              <option value="commodities">Commodities</option>
              <option value="rooms">Room availability</option>
              <option value="accomodations">Special Accomodations</option>
              <option value="website">Website Issues</option>
              <option value="pricing">Pricing</option>
              <option value="orange">Other</option>

              </select>

            { /*Generate message field*/ }
            <label htmlFor="message">Message: </label>
            <textarea
              id="message"
              type="text"
              placeholder="JohnSmith@Gmail.com"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="contact-input"
              required
            />

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
      </div>
</div>
  );
};

export default Contact;
