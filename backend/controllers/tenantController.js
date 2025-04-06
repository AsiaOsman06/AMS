const db = require("../config/db");

// Get all User
exports.getTenants = (req, res) => {
  db.query("SELECT * FROM User", (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error retrieving User", error: err });
    res.status(200).json(results);
  });
};

// Add a new User
exports.addTenant = (req, res) => {
  const { name, email, phone,password } = req.body;
  const query = "INSERT INTO User (name, email, phone,password,role) VALUES (?, ?, ?)";
  db.query(query, [name, email, phone,password], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error adding User", error: err });
    res.status(201).json({
      message: "User added successfully",
      tenantId: results.insertId,
    });
  });
};
