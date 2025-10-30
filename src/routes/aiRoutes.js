import express from "express";
import { askIngrida } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/ask", protect, askIngrida);
export default router;
