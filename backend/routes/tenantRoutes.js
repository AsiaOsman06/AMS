const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenantController");

// Get all tenants
router.get("/tenants", tenantController.getTenants);

// Add a new tenant
router.post("/tenants", tenantController.addTenant);

module.exports = router;
