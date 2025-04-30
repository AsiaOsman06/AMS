const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const tenantRoutes = require("./routes/tenantRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware for parsing JSON bodies
app.use(express.json());

// ✅ Create MySQL pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Gatien12?", // your password
  database: "ams_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", tenantRoutes);

// Dummy data: Maintenance staff list
const maintenanceStaff = [
  { id: 1, name: "Technician1" },
  { id: 2, name: "Technician2" },
  { id: 3, name: "Technician3" },
  { id: 4, name: "Technician4" },
];

// Route to get maintenance staff
app.get("/api/maintenanceStaff", (req, res) => {
  res.json(maintenanceStaff);
});

// ✅ API: Register new tenant
app.post("/api/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [existingUser] = await pool.query(
      "SELECT * FROM tenants WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO tenants (name, email, phone, password) VALUES (?, ?, ?, ?)",
      [name, email, phone, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ API: Add tenant manually
app.post("/api/tenants", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await pool.query(
      "INSERT INTO tenants (name, email, phone, password) VALUES (?, ?, ?, ?)",
      [name, email, phone, password]
    );
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ API: Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM tenants WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
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
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ API: Contact Form
app.post("/api/contact", async (req, res) => {
  const { name, email, topic, message } = req.body;

  if (!name || !email || !topic || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = "INSERT INTO contact_form (name, email, topic, message) VALUES (?, ?, ?, ?)";
    await pool.query(query, [name, email, topic, message]);
    res.status(201).json({ success: "Your message has been submitted successfully" });
  } catch (error) {
    console.error("Error inserting contact form data:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// ✅ API: Applications (Rental Applications)
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

    await pool.query(query, [
      firstName,
      lastName,
      email,
      building,
      room,
      creditScore,
      licenseNumber,
      accommodations,
    ]);

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ API: Submit Maintenance Ticket (Corrected Version)
app.post("/api/submitTicket", async (req, res) => {
  const { topic, urgency, description, assignedTo, createdBy } = req.body;

  // Corrected validation
  if (!topic || !urgency || !description || !assignedTo || !createdBy) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = `
      INSERT INTO tickets (topic, urgency, description, assignedTo, createdBy, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    await pool.query(query, [
      topic,
      urgency,
      description,
      assignedTo,
      createdBy,
      'Pending'  // Default status when ticket is created
    ]);

    res.status(201).json({ message: "Ticket submitted successfully" });
  } catch (error) {
    console.error("Ticket submission error:", error);
    res.status(500).json({ error: "Database error" });
  }
});


// ✅ Start server after checking DB connection
async function startServer() {
  try {
    await pool.getConnection(); // test connection
    console.log("Connected to MySQL database with Pool");

    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
