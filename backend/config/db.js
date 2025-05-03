const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a pool instead of a single connection.
// Pools handle connections efficiently and expose a promise‐based API.
const pool = mysql.createPool({
  host: process.env.DB_HOST     || "localhost",
  user: process.env.DB_USER     || "root",
  password: process.env.DB_PASSWORD || "Othello22",
  database: process.env.DB_NAME   || "ams_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection once at startup:
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Connected to the MySQL database!");
    conn.release();
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
})();

module.exports = pool;
