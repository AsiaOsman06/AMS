const express = require('express');
const router = express.Router();
const pool = require("../config/db"); // ✅ use pool

// PUT /api/tickets/update-status
router.put('/update-status', async (req, res) => {
    const { ticketId, status } = req.body;
  
    const validStatuses = ["Pending", "In Progress", "Completed", "Rejected", "Approved"];
    if (!ticketId || !status) {
      return res.status(400).json({ error: 'Missing ticketId or status' });
    }
  
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
  
    try {
      const [result] = await pool.execute(
        'UPDATE tickets SET status = ? WHERE id = ?',
        [status, ticketId]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
  
      res.json({ message: 'Status updated successfully' });
    } catch (error) {
      console.error('Error updating ticket status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  

router.get('/completed', async (req, res) => {
    try {
      const [rows] = await pool.query(`
      SELECT 
        tickets.id,
        tickets.topic,
        tickets.urgency,
        tickets.description,
        tickets.assignedTo,
        tickets.createdAt,
        tenants.name AS tenant,
        existingTenant.building,
        existingTenant.room
      FROM tickets
      JOIN tenants ON tickets.createdBy = tenants.id
      JOIN existingTenant ON tenants.id = existingTenant.id
      WHERE tickets.status = 'Completed'`
        //"SELECT id, topic, urgency, description, assignedTo, createdAt FROM tickets WHERE status = 'Completed'"
      );
      res.json(rows);
    } catch (err) {
      console.error("Error fetching completed tickets:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update ticket info (edit)
router.put("/:id", async (req, res) => {
    const ticketId = req.params.id;
    const { topic, urgency, description, status } = req.body;
  
    const fields = [];
    const values = [];
  
    if (topic) {
      fields.push("topic = ?");
      values.push(topic);
    }
  
    if (urgency) {
      fields.push("urgency = ?");
      values.push(urgency);
    }
  
    if (description) {
      fields.push("description = ?");
      values.push(description);
    }
  
    if (status) {
      fields.push("status = ?");
      values.push(status);
    }
  
    if (fields.length === 0) {
      return res.status(400).json({ error: "No valid fields to update." });
    }
  
    const sql = `UPDATE tickets SET ${fields.join(", ")} WHERE id = ?`;
    values.push(ticketId);
  
    try {
      const [result] = await pool.query(sql, values);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json({ message: "Ticket updated successfully" });
    } catch (err) {
      console.error("Error updating ticket:", err);
      res.status(500).json({ error: "Failed to update ticket" });
    }
  });
  

module.exports = router;
