const mongoose = require("mongoose");

const medicalReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    cloudinaryId: {
      type: String,
    },

    reportType: {
      type: String,
      enum: [
        "Blood Test",
        "CBC",
        "Liver Function",
        "Kidney Function",
        "X-Ray",
        "MRI",
        "CT Scan",
        "Prescription",
        "Health Checkup",
        "Other",
      ],
      default: "Other",
    },

    extractedText: {
      type: String,
      default: "",
    },

    aiAnalysis: {
      summary: String,

      abnormalValues: [
        {
          parameter: String,
          value: String,
          normalRange: String,
          status: String,
        },
      ],

      possibleConditions: [String],

      precautions: [String],

      dietRecommendations: [String],

      lifestyleRecommendations: [String],

      recommendedSpecialist: String,

      emergencyLevel: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",
      },

      disclaimer: String,
    },

    processingStatus: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Failed"],
      default: "Pending",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MedicalReport", medicalReportSchema);