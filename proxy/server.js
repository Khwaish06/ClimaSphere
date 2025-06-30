const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
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

app.listen(5000, () => {
  console.log("✅ Proxy server running on port 5000");
});
