const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const tenantRoutes = require("./routes/tenantRoutes");

// Load environment variables
dotenv.config();

const app = express();

// ✅ Enable CORS properly
app.use(
  cors({
    origin: "http://localhost:3001", // Change this if your frontend runs on a different port
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle Preflight (OPTIONS) requests
app.options("*", cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api", tenantRoutes);

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });
  res.json({ message: "User registered successfully" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ user: { name: user.name, email: user.email } });
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
