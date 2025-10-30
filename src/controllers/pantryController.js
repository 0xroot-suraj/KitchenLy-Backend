import PantryItem from "../models/PantryItem.js";

export const getPantry = async (req, res) => {
  const items = await PantryItem.find({ user: req.user._id });
  res.json(items);
};

export const addItem = async (req, res) => {
  const { name, quantity, category } = req.body;
  const item = new PantryItem({
    user: req.user._id,
    name,
    quantity,
    category,
  });
  const saved = await item.save();
  res.status(201).json(saved);
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  const deleted = await PantryItem.findOneAndDelete({ _id: id, user: req.user._id });
  if (!deleted) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item deleted" });
};
