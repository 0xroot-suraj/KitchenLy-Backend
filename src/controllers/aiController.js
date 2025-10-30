// src/controllers/aiController.js
import axios from "axios";

export const askIngrida = async (req, res) => {
  try {
    const { message, pantryItems } = req.body;

    const prompt = `
You are Ingrida — a friendly and smart cooking assistant for KitchenLy.
User’s pantry items: ${pantryItems?.join(", ") || "unknown"}.
User says: "${message}".

Your task:
- Suggest a recipe idea based on what’s already in the user’s pantry.
- Try to use only available ingredients.
- If a few ingredients are missing, politely suggest making a shopping list for them (but keep it short).
- Don’t include unnecessary or unrelated ingredients.
- Keep the tone warm, casual, and helpful.
- Reply naturally in 2–4 sentences.
`;

    // --- ✅ OpenRouter API call ---
    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // fast, free, good quality
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
          "HTTP-Referer": "https://kitchenly.onrender.com",
          "X-Title": "KitchenLy Ingrida AI",
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    const reply =
      aiResponse.data?.choices?.[0]?.message?.content?.trim() ||
      "Ingrida couldn’t think of anything right now!";

    res.json({ reply });
  } catch (error) {
    console.error("Ingrida AI error:", error.message);
    if (error.response) {
      console.error("OpenRouter response:", error.response.data);
    }
    res.status(500).json({
      message: "Ingrida is having a kitchen crisis! (LLM error)",
    });
  }
};
