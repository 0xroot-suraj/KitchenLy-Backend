import axios from "axios";

const SPOON_BASE = "https://api.spoonacular.com/recipes";

export const findRecipes = async (req, res) => {
  try {
    const { ingredients } = req.body;
    const query = Array.isArray(ingredients)
      ? ingredients.join(",")
      : ingredients;

    const response = await axios.get(`${SPOON_BASE}/findByIngredients`, {
      params: {
        ingredients: query,
        number: 10,
        ranking: 1,
        ignorePantry: true,
        apiKey: process.env.SPOONACULAR_API_KEY,
      },
    });

    const recipes = response.data;

    const aiPrompt = `Given these ingredients: ${query}, suggest 3 substitutions for common missing items in recipes.`;

    // --- Updated AI API call (OpenRouter) ---
    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: aiPrompt }],
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

    const substitutions =
      aiResponse.data?.choices?.[0]?.message?.content?.trim() ||
      "No substitutions available right now.";

    res.json({ recipes, substitutions });
  } catch (error) {
    console.error("Server Error:", error.message);
    if (error.response) {
      console.error("OpenRouter response:", error.response.data);
    }
    res.status(500).json({ error: error.message });
  }
};
