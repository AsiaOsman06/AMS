import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitTicket = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5002/api/contact", {
        name,
        email,
        topic,
        message,
      });

      setSuccess(response.data.success);
      setError("");

      // Clear the form after submission
      setName("");
      setEmail("");
      setTopic("");
      setMessage("");
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong. Please try again.");
      setSuccess("");
    }
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
              matters, please reach out to us by phone.
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
              <h2>Contact Form</h2>
            </div>

            <form onSubmit={submitTicket}>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}

              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="contact-input"
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="JohnSmith@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="contact-input"
                required
              />

              <label htmlFor="topic">Topic:</label>
              <select
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="contact-input"
                required
              >
                <option value="">Select a topic</option>
                <option value="commodities">Commodities</option>
                <option value="rooms">Room availability</option>
                <option value="accommodations">Special Accommodations</option>
                <option value="website">Website Issues</option>
                <option value="pricing">Pricing</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                placeholder="Your message..."
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
