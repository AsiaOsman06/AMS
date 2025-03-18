import React, { useState } from "react";
import axios from "axios";
import "./TenantForm.css"; // ✅ Import CSS file

const TenantForm = ({ setTenants }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const response = await axios.post("http://localhost:5002/api/tenants", {
       name,
       email,
       phone
     });

     setTenants((prevTenants) => [...prevTenants, { name, email, phone }]);
     setName("");
     setEmail("");
     setPhone("");
   } catch (error) {
     console.error(
       "Error adding tenant:",
       error.response?.data?.error || error.message
     );
     alert(
       "Failed to add tenant: " +
         (error.response?.data?.error || "Unknown error")
     );
   }
 };


  return (
    <form onSubmit={handleSubmit} className="tenant-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="tenant-input"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="tenant-input"
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="tenant-input"
        required
      />
      <button type="submit" className="tenant-btn">
        Add Tenant
      </button>
    </form>
  );
};

export default TenantForm;
