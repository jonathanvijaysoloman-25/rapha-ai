const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const extractText = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  try {
    // PDF Processing
    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);

      return pdfData.text.trim();
    }

    // Image OCR
    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      const { data } = await Tesseract.recognize(
        filePath,
        "eng"
      );

      return data.text.trim();
    }

    throw new Error("Unsupported file format.");
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to extract text from the uploaded file.");
  }
};

module.exports = {
  extractText,
};