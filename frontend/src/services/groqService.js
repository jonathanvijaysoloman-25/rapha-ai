const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function sendMessageToGroq(message) {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are Rapha AI Health Assistant. Give simple, safe medical explanations. Do NOT give dangerous prescriptions. Always suggest consulting a doctor for serious symptoms.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    return data.choices?.[0]?.message?.content || "No response";
  } catch (error) {
    console.error("Groq error:", error);
    return "Error connecting to AI";
  }
}