const fs = require("fs");
const { extractText } = require("../services/ocrService");
const { getGroqResponse } = require("../services/groqServices");

const analyzeMedicalReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("📄 File received:", req.file.filename);

    // Extract text from uploaded file
    const extractedText = await extractText(req.file.path);

    console.log("✅ Text extracted");

    if (!extractedText || extractedText.trim().length === 0) {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        success: false,
        message: "No readable text found in the uploaded file.",
      });
    }

    const systemPrompt = `
You are Rapha AI, a medical report analyzer.

Return ONLY valid JSON.

{
  "summary": "",
  "normalFindings": [],
  "abnormalFindings": [],
  "possibleHealthConcerns": [],
  "dietRecommendations": [],
  "lifestyleRecommendations": [],
  "questionsForDoctor": [],
  "disclaimer": "This is AI analysis, not medical advice."
}

Rules:
- Return ONLY JSON.
- No markdown.
- No \`\`\`json.
- No explanation.
- No diagnosis.
- Use simple language.
`;

    const aiResponse = await getGroqResponse(systemPrompt, extractedText);

    console.log("🤖 Raw AI Response:");
    console.log(aiResponse);

    // Delete uploaded file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Clean markdown if Groq returns it
    const cleanedResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedAnalysis;

    try {
      parsedAnalysis = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("❌ JSON Parse Error");
      console.error(cleanedResponse);

      return res.status(500).json({
        success: false,
        message: "AI returned an invalid JSON response.",
      });
    }

    return res.status(200).json({
      success: true,
      analysis: parsedAnalysis,
    });

  } catch (error) {
    console.error("❌ Medical Report Error:", error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

module.exports = {
  analyzeMedicalReport,
};