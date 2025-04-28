const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // ✅ use pool
const bcrypt = require("bcryptjs");

// LOGIN Route (no JWT)
router.post("/login", async (req, res) => {
  //console.log("Received login request:", req.body); // 🔥 ADD THIS LINE
  const { email, password } = req.body;

  try {
    const [results] = await pool.query("SELECT * FROM tenants WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Directly send user info (NO TOKEN)
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;