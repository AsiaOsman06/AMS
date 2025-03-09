import React, { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // ✅ Added phone state
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !phone || !password) {
      setError("All fields are required");
      return;
    }

    //sending inputs to the backend
    try {
      await axios.post("http://localhost:5002/api/register", {
        name,
        email,
        phone,
        password,
      });

      //this is working when you register
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);

      // Clear input fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">REGISTER</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-3"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-3"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-3"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 w-full rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
