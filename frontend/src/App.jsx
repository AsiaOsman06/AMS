import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TenantList from "./components/TenantList";
import TenantForm from "./components/TenantForm";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [tenants, setTenants] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5002/api/tenants")
        .then((response) => setTenants(response.data))
        .catch((error) => console.error("Error fetching tenants:", error));
    }
  }, [user]);

  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Apartment Management System</h1>
          <div className="space-x-6">
            <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
            <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
            <Link to="/buildings" className="hover:text-yellow-400 transition">Buildings</Link>
            {user ? (
              <>
                <span className="text-yellow-400">Welcome, {user.name}</span>
                <button
                  onClick={() => setUser(null)}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
                <Link to="/register" className="hover:text-yellow-400 transition">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              user ? (
                <div className="mt-6">
                  <TenantForm setTenants={setTenants} />
                  <TenantList tenants={tenants} />
                </div>
              ) : (
                <div className="text-center mt-16">
                  <h2 className="text-4xl font-bold text-gray-800">Welcome to the Apartment Management System</h2>
                  <p className="text-lg text-gray-600 mt-2">
                    Explore our apartment listings and find your perfect home.
                  </p>
                  <div className="mt-6 space-x-4">
                    <Link to="/buildings" className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition">
                      View Apartments
                    </Link>
                    <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition">
                      Apply Now
                    </Link>
                  </div>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
