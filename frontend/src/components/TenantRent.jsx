// TenantRent.jsx
import React, { useEffect, useState } from "react";
import "./TenantRent.css";

const TenantRent = () => {
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [dueAmount, setDueAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    // Fetch payment history and due info from backend
    fetch("/api/get-payment-info")
      .then((res) => res.json())
      .then((data) => {
        setPaymentHistory(data.history || []);
        setDueAmount(data.dueAmount || "");
        setDueDate(data.dueDate || "");
      })
      .catch((err) => console.error("Error loading payment info:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { amount, password };

    fetch("/api/pay-rent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Payment response:", data);
        // Optionally refresh the history list
      })
      .catch((error) => console.error("Payment error:", error));
  };

  return (
    <div className="tenant-rent-container">
      {/* Left Column – Payment History */}
      <div className="payment-history">
        <div className="payment-header">Payment history</div>
        {paymentHistory.map((entry, idx) => (
          <div className="payment-entry" key={idx}>
            <div className={`payment-date ${entry.highlight ? "highlight" : ""}`}>
              {entry.date}
            </div>
            <div className="payment-amount">{entry.amount}</div>
          </div>
        ))}
      </div>

      {/* Right Column – Make Payment */}
      <div className="make-payment-box">
        <div className="make-payment-header">Make Payment</div>
        <div className="payment-due">Due: ${dueAmount}</div>
        <div className="payment-date-due">Due <u>by:</u> {dueDate}</div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="amount">Amount:</label>
            <div className="amount-input">
              <span>$</span>
              <input
                type="text"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <input
              className="password-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-button-wrapper">
            <button type="submit">Authorize</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantRent;
