import express from "express";
import { getList, addItem, togglePurchased, deleteItem } from "../controllers/shoppingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getList)
  .post(protect, addItem);

router.route("/:id")
  .patch(protect, togglePurchased)
  .delete(protect, deleteItem);

export default router;
