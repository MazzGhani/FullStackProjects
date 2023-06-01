const express = require("express");
const { initializeDb } = require("../controllers/initialize");
const router = express.Router();

router.get("/", initializeDb);

module.exports = router;
