const db = require("../config/db");

// Get all tenants
exports.getTenants = (req, res) => {
  db.query("SELECT * FROM tenants", (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error retrieving tenants", error: err });
    res.status(200).json(results);
  });
};

// Add a new tenant
exports.addTenant = (req, res) => {
  const { name, email, phone } = req.body;
  const query = "INSERT INTO tenants (name, email, phone) VALUES (?, ?, ?)";
  db.query(query, [name, email, phone], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error adding tenant", error: err });
    res
      .status(201)
      .json({
        message: "Tenant added successfully",
        tenantId: results.insertId,
      });
  });
};
