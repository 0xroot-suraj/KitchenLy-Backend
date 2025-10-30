import express from "express";
import { getPantry, addItem, deleteItem } from "../controllers/pantryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getPantry)
  .post(protect, addItem);

router.route("/:id")
  .delete(protect, deleteItem);

export default router;
