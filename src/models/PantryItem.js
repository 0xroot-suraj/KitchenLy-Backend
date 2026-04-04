import mongoose from "mongoose";

const pantryItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: String },
  category: { type: String },
  addedAt: { type: Date, default: Date.now },
});

export default mongoose.model("PantryItem", pantryItemSchema);
