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

    // Call apifreellm.com
    const aiResponse = await axios.post(
      "https://apifreellm.com/api/chat",
      { message: prompt },
      { headers: { "Content-Type": "application/json" }, timeout: 20000 }
    );

    if (aiResponse.data?.status === "success" && aiResponse.data?.response) {
      res.json({ reply: aiResponse.data.response.trim() });
    } else {
      console.error("LLM API unexpected:", aiResponse.data);
      res.status(500).json({ message: "Ingrida is having a kitchen crisis! (LLM bad response)" });
    }

  } catch (error) {
    console.error("Ingrida AI error:", error.message);
    res.status(500).json({ message: "Ingrida is having a kitchen crisis! (LLM error)" });
  }
};
