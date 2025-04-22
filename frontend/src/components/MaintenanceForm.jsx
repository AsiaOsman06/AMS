import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const MaintenanceForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    urgency: "",
    description: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  //  Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5002/api/submitTicket", {
        subject: formData.subject,
        urgency: formData.urgency,
        description: formData.description
      });

      setSuccess("Ticket submitted!");
      setTimeout(() => navigate("/tenantHome"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Ticket failed to submit");
    }
  };

  return (
    <div className="form-container">
        <div className="Title">Ticket</div>

        {/*  Display error or success */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {/*  Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="row-title">Topic:  </div>
            
            <input
              type="text"
              name="topic"
              placeholder="topic (MAX 30 characters)"
              value={formData.topic}
              onChange={handleChange}
              maxLength={30}
              required
            />
          </div>

          <div className="form-row">
            <div className="row-title">Urgency:  </div>
            
            <select
            name="urgency"
            id="urgency"
            value={formData.urgency}
            onChange={handleChange}
            required
            >
                <option value="urgent">Urgent</option>
                <option value="somewhat urgent">Somewhat urgent</option>
                <option value="not urgent">Special Accommodations</option>
            </select>
          </div>

          <div className="form-row">
            <div className="row-title">Description:  </div>

            <textarea
              type="text"
              name="description"
              placeholder="My faucet is leaking..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
    </div>
  );
};

export default MaintenanceForm;