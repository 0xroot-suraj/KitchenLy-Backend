import ShoppingItem from "../models/ShoppingItem.js";

export const getList = async (req, res) => {
  const list = await ShoppingItem.find({ user: req.user._id });
  res.json(list);
};

export const addItem = async (req, res) => {
  const { name, quantity, addedFromRecipe } = req.body;
  const item = new ShoppingItem({ user: req.user._id, name, quantity, addedFromRecipe });
  const saved = await item.save();
  res.status(201).json(saved);
};

export const togglePurchased = async (req, res) => {
  const item = await ShoppingItem.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) return res.status(404).json({ message: "Item not found" });
  item.purchased = !item.purchased;
  await item.save();
  res.json(item);
};

export const deleteItem = async (req, res) => {
  await ShoppingItem.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: "Item deleted" });
};
