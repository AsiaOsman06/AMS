import React, { useEffect, useState } from "react";
import "./TenantRent.css";

const TenantRent = () => {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [dueAmount, setDueAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetchPaymentInfo(user.id);
    }
  }, [user]);

  const fetchPaymentInfo = (tenantId) => {
    fetch(`http://localhost:5002/api/get-payment-info/${tenantId}`)
      .then((res) => res.json())
      .then((data) => {
        setPaymentHistory(data.history || []);
        setDueAmount(data.dueAmount || "0");
        setDueDate(data.dueDate || "N/A");
      })
      .catch((err) => console.error("Error loading payment info:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      setMessage("User not found.");
      return;
    }

    if (parseFloat(dueAmount) <= 0) {
      setMessage("No rent is currently due.");
      return;
    }

    const payload = {
      amount,
      password,
      tenantId: user.id,
    };

    fetch("http://localhost:5002/api/pay-rent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Payment successful!") {
          setMessage(data.message);
          setAmount("");
          setPassword("");
          fetchPaymentInfo(user.id);
        } else {
          setMessage("Payment failed");
        }
      })
      .catch((error) => {
        console.error("Payment error:", error);
        setMessage("Payment failed");
      });
  };

  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="tenant-rent-container">
      <div className="payment-history">
        <div className="payment-header">Payment history</div>
        {paymentHistory.length > 0 ? (
          paymentHistory.map((entry, idx) => (
            <div className="payment-entry" key={idx}>
              <div className="payment-date">{entry.date}</div>
              <div className="payment-amount">{entry.amount}</div>
            </div>
          ))
        ) : (
          <p>No payments yet.</p>
        )}
      </div>

      <div className="make-payment-box">
        <div className="make-payment-header">Make Payment</div>
        <div className="payment-due">Due: ${dueAmount}</div>
        <div className="payment-date-due">
          Due <u>by:</u> {dueDate}
        </div>

        {message && (
          <p
            style={{ color: message.includes("successful") ? "green" : "red" }}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="amount">Amount:</label>
            <div className="amount-input">
              <span>$</span>
              <input
                type="text"
                id="amount"
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
