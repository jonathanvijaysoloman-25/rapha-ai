const { getGroqResponse } = require("../services/groqServices");

const explainPrescription = async (req, res) => {
  try {
    const { medicine } = req.body;

    if (!medicine) {
      return res.status(400).json({
        success: false,
        message: "Please provide a medicine name.",
      });
    }

    const systemPrompt = `
You are Rapha AI, an intelligent healthcare assistant.

Explain the given medicine in simple language.

Your response should include:

1. What the medicine is.
2. What it is commonly used for.
3. Common side effects.
4. Important precautions.
5. General dosage guidance (do not provide personalized dosage).
6. End with the disclaimer:
"This information is for educational purposes only and is not a substitute for professional medical advice."

Keep the explanation simple and easy to understand.
`;

    const aiResponse = await getGroqResponse(systemPrompt, medicine);

    res.status(200).json({
      success: true,
      response: aiResponse,
    });

  } catch (error) {
    console.error("Prescription Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to explain prescription.",
    });
  }
};

module.exports = {
  explainPrescription,
};