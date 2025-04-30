import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const MaintenanceForm = ({ user }) => {
  const [formData, setFormData] = useState({
    topic: "",
    urgency: "",
    description: "",
    assignedTo: ""
  });

  const [userId, setUserId] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Directly set userId from user prop
  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
    }
  }, [user]);  

  // Fetch maintenance staff list
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        //const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5002/api/maintenanceStaff");
        setStaffList(response.data); // Assume it's an array like [{id, name}]
      } catch (err) {
        console.error("Error fetching maintenance staff:", err);
      }
    };
    fetchStaff();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if(!userId){
      setError("User ID not loaded");
      return;
    }

    try {
      //const token = localStorage.getItem("token");
      await axios.post("http://localhost:5002/api/submitTicket", {
        topic: formData.topic,
        urgency: formData.urgency,
        description: formData.description,
        assignedTo: formData.assignedTo,
        createdBy: userId
      });

      setSuccess("Ticket submitted successfully!");
      setTimeout(() => navigate("/tenantHome"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Ticket failed to submit");
    }
  };

  return (
    <div className="form-container">
      <div className="Title">Maintenance Ticket</div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="row-title">Topic:</div>
          <input
            type="text"
            name="topic"
            placeholder="Topic (MAX 30 characters)"
            value={formData.topic}
            onChange={handleChange}
            maxLength={30}
            required
          />
        </div>

        <div className="form-row">
          <div className="row-title">Urgency:</div>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            required
          >
            <option value="">Select urgency</option>
            <option value="urgent">Urgent</option>
            <option value="somewhat urgent">Somewhat Urgent</option>
            <option value="not urgent">Not Urgent</option>
          </select>
        </div>

        <div className="form-row">
          <div className="row-title">Description:</div>
          <textarea
            name="description"
            placeholder="My faucet is leaking..."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="row-title">Assign To:</div>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
          >
            <option value="">Select Maintenance Staff</option>
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.name}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
};

export default MaintenanceForm;
