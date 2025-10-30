import mongoose from "mongoose";

const shoppingItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: String, default: "1" },
  addedFromRecipe: { type: String }, // optional: store recipe name
  addedAt: { type: Date, default: Date.now },
  purchased: { type: Boolean, default: false },
});

export default mongoose.model("ShoppingItem", shoppingItemSchema);
