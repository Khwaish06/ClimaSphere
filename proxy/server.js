const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Allow all origins and credentials (important for mobile browser compatibility)
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/api/chat", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ message: response.data.choices[0].message.content });
  } catch (err) {
    console.error("❌ OpenRouter API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000; // ⬅️ Optional: allow Render to choose the port
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
