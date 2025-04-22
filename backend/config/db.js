const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'florida1',
  database: process.env.DB_NAME || 'ams_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database!");
});

module.exports = db;
