const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const tenantRoutes = require("./routes/tenantRoutes");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

// Load environment variables
dotenv.config();

const app = express();

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abdifatah1748$$", // Replace with your actual password
  database: "ams_db"
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
    origin: "http://localhost:3000", // Update if frontend uses a different port
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api", tenantRoutes);

// API Tenants (Fix: Added 'password' to match SQL statement)
app.post("/api/tenants", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    db.query(
      "INSERT INTO User (name, email, phone, password) VALUES (?, ?, ?, ?)",
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

// API Register
app.post("/api/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    db.query("SELECT * FROM User WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

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
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// API Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    db.query("SELECT * FROM User WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
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
    });
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// API Contact Form
app.post("/api/contact", (req, res) => {
  const { name, email, topic, message } = req.body;

  if (!name || !email || !topic || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = "INSERT INTO contact_form (name, email, topic, message) VALUES (?, ?, ?, ?)";
  db.execute(query, [name, email, topic, message], (err, results) => {
    if (err) {
      console.error("Error inserting contact form data:", err);
      return res.status(500).json({ error: "Server error. Please try again later." });
    }

    console.log("Contact form data inserted:", results);
    res.status(201).json({ success: "Your message has been submitted successfully" });
  });
});

// API Applications
app.post("/api/applications", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    building,
    room,
    creditScore,
    licenseNumber,
    accommodations,
  } = req.body;

  if (!firstName || !lastName || !email || !building || !room || !creditScore || !licenseNumber) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = `
      INSERT INTO applications (
        first_name, last_name, email, building, room,
        credit_score, license_number, accommodations
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [firstName, lastName, email, building, room, creditScore, licenseNumber, accommodations],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Application submitted successfully" });
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
