import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot from react-dom/client
import "./tailwind.css";
import App from "./App";

// Ensure ReactDOM.createRoot is used properly
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
