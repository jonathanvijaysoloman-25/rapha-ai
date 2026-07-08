import { useState } from "react";

export default function HealthChat() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I am Rapha AI Health Assistant. Ask me anything about health.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg = { role: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);

  setInput("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/chat/health", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: data.reply },
    ]);
  } catch {
    setMessages((prev) => [
      ...prev,
      { role: "bot", text: "Error connecting to server" },
    ]);
  }

  setLoading(false);
};

  return (
  <div className="min-h-screen flex flex-col text-white fade-up">

    {/* Header */}

    <div className="glass-card mb-6 p-6">

      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent">
        ❤️ Rapha AI Health Assistant
      </h1>

      <p className="text-gray-400 mt-2">
        Ask health questions, symptoms, medicines and general wellness advice.
      </p>

    </div>

    {/* Chat */}

    <div className="glass-card flex-1 overflow-y-auto p-6 space-y-5">

      {messages.map((msg, i) => (

        <div
          key={i}
          className={`flex ${
            msg.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >

          <div
            className={`max-w-[80%] px-5 py-4 rounded-3xl leading-7 shadow-lg transition-all duration-300 ${
              msg.role === "user"
                ? "bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white"
                : "bg-[#1b0b0b] border border-red-900/30 text-gray-100"
            }`}
          >

            {msg.text}

          </div>

        </div>

      ))}

      {loading && (

        <div className="flex">

          <div className="bg-[#1b0b0b] border border-red-900/30 rounded-3xl px-6 py-4">

            <div className="flex gap-2">

              <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce delay-200"></span>

            </div>

          </div>

        </div>

      )}

    </div>

    {/* Input */}

    <div className="glass-card mt-6 p-4">

      <div className="flex gap-3">

        <input
          className="flex-1 bg-[#150707] border border-red-900/40 rounded-2xl px-5 py-4 focus:border-red-500 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Ask a health question..."
        />

        <button
          onClick={sendMessage}
          className="red-btn"
        >
          Send
        </button>

      </div>

    </div>

  </div>
)}