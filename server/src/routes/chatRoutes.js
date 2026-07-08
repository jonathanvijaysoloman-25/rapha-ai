const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/health", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are Rapha AI Health Assistant. Give simple, safe medical explanations. Do NOT give dangerous prescriptions. Always recommend doctor for serious conditions.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    return res.json({ reply });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Chat failed",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;