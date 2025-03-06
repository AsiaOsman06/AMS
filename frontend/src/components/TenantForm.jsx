import React, { useState } from "react";
import axios from "axios";

const TenantForm = ({ setTenants }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/tenants", { name, email, phone })
      .then(() => {
        setTenants((prevTenants) => [...prevTenants, { name, email, phone }]);
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => console.error("Error adding tenant:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Add Tenant
      </button>
    </form>
  );
};

export default TenantForm;
