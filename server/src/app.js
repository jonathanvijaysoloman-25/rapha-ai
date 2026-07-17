const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const symptomRoutes = require("./routes/symptomRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const medicalReportRoutes = require("./routes/medicalReportRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const locationRoutes = require("./routes/locationRoutes");
//const authRoutes = require("./routes/authRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Rapha AI Backend is Running 🚀");
});

// Routes
app.use("/api/symptoms", symptomRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/medical-report", medicalReportRoutes);
app.use("/api/location", locationRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.use("/api/doctors", doctorRoutes);

//app.use("/api/auth", authRoutes);

module.exports = app;