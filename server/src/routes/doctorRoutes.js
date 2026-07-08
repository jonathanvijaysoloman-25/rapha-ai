const express = require("express");
const router = express.Router();

const { getNearbyDoctors } = require("../controllers/doctorController");

// GET nearby doctors
router.get("/nearby", getNearbyDoctors);

module.exports = router;