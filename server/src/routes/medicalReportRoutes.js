const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMedicalReport");
const {
  analyzeMedicalReport,
} = require("../controllers/medicalReportController");


router.post(
  "/analyze",
  (req, res, next) => {
    console.log("✅ Analyze route hit");
    next();
  },
  upload.single("report"),
  analyzeMedicalReport
);

module.exports = router;