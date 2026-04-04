import express from "express";
import { findRecipes } from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/find", protect, findRecipes);

export default router;
