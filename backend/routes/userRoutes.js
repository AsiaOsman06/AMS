const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // ✅ use pool
const authMiddleware = require("../middleware/authMiddleware");

// GET Current User
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const [results] = await pool.query("SELECT id, name FROM tenants WHERE id = ?", [req.user.id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Database error in /me:", err);
    return res.status(500).json({ error: "User fetch failed" });
  }
});

module.exports = router;
