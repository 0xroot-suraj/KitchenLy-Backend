import axios from "axios";

const SPOON_BASE = "https://api.spoonacular.com/recipes";

export const findRecipes = async (req, res) => {
  try {
    const { ingredients } = req.body; // array or comma string
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
    const aiResponse = await fetch("https://apifreellm.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: aiPrompt }),
    });

    const data = await aiResponse.json();

    if (data.status === "success") {
      const substitutions = data.response; 
      res.json({ recipes, substitutions });
    } else {
      console.error("AI API Error:", data.error);
      res.status(500).json({ error: data.error });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
};
