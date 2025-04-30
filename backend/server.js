const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const tenantRoutes = require("./routes/tenantRoutes");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

// Load environment variables
dotenv.config();

const app = express();

//create a mysql connection pool
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abdifatah1748$$", // Replace with your actual MySQL password
  database: "ams_db",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// ✅ Enable CORS properly
app.use(
  cors({
    origin: "http://localhost:3000", // Change this if your frontend runs on a different port
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle Preflight (OPTIONS) requests
// app.options("*", cors())T
// Middleware
app.use(express.json());

// Routes
app.use("/api", tenantRoutes);

/*
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });
  res.json({ message: "User registered successfully" });
});
*/

// API Tenants
app.post("/api/tenants", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    db.query(
      "INSERT INTO User (name, email, phone,password) VALUES (?, ?, ?)",
      [name, email, phone, password],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "User added successfully" });
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//API REGISTER

app.post("/api/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the email already exists
    db.query(
      "SELECT * FROM User WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length > 0) {
          return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into MySQL
        db.query(
          "INSERT INTO User (name, email, phone, password) VALUES (?, ?, ?, ?)",
          [name, email, phone, hashedPassword],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/*app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ user: { name: user.name, email: user.email } });
});
*/

//API LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    db.query(
      "SELECT * FROM User WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length === 0) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = results[0];

        // Compare passwords
        // const isMatch = await bcrypt.compare(password, user.password);
        if (password !== user.password) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
        });
      }
    );
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
