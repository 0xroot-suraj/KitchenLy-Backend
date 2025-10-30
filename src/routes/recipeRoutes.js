import express from "express";
import { findRecipes } from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get recipes based on pantry ingredients
router.post("/find", protect, findRecipes);

export default router;
