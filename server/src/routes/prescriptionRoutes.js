
const express = require("express");
const router = express.Router();

const {
  explainPrescription,
} = require("../controllers/prescriptionController");

router.post("/", explainPrescription);

module.exports = router;