const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenantController");

// Get all tenants
router.get("/User", tenantController.getTenants);

// Add a new tenant
router.post("/USer", tenantController.addTenant);

module.exports = router;
