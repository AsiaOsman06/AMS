import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
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
        .get("http://localhost:5000/api/tenants")
        .then((response) => setTenants(response.data))
        .catch((error) => console.error("Error fetching tenants:", error));
    }
  }, [user]);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4 flex justify-between">
          <h1 className="text-3xl font-bold">Apartment Management System</h1>
          <div>
            {user ? (
              <>
                <span className="mr-4">Welcome, {user.name}</span>
                <button
                  onClick={() => setUser(null)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mr-4 text-blue-500">
                  Login
                </Link>
                <Link to="/register" className="text-green-500">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              user ? (
                <>
                  <TenantForm setTenants={setTenants} />
                  <TenantList tenants={tenants} />
                </>
              ) : (
                <p className="text-center text-red-500">
                  Please log in to view tenants.
                </p>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
