import { Category } from "../models/category.js";

export const getCategory = (req, res) => {};

export const createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const data = await category.save();
    res.json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};
