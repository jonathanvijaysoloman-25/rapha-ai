const { getGroqResponse } = require("../services/groqServices");

const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({
        success: false,
        message: "Please provide symptoms.",
      });
    }

    const systemPrompt = `
You are Rapha AI, an intelligent healthcare assistant.

Based on the user's symptoms:
1. Suggest possible conditions (not a diagnosis).
2. Explain why they may occur.
3. Recommend basic precautions.
4. Mention when the user should see a doctor.
5. End with a disclaimer that this is not medical advice.

Keep the response simple and easy to understand.
`;

    const aiResponse = await getGroqResponse(systemPrompt, symptoms);

    res.status(200).json({
      success: true,
      response: aiResponse,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = { analyzeSymptoms };