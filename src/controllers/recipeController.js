import axios from "axios";

export const findRecipes = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ message: "No ingredients provided" });
    }

    const response = await axios.get(
      "https://api.spoonacular.com/recipes/findByIngredients",
      {
        params: {
          ingredients: ingredients.join(","),
          number: 10,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("🔥 Recipe Error:", error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to fetch recipes",
      error: error.response?.data || error.message,
    });
  }
};