import { Category } from "../models/category.js";

export const categotyById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error();
    }
    req.category = category;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Category not found" });
  }
};

export const createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const data = await category.save();
    res.json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const readCategory = (req, res) => {
  res.json(req.category);
};

export const updateCategory = async (req, res) => {
  const {
    body: { name }
  } = req;
  const category = req.category;
  category.name = name;
  try {
    const data = await category.save();
    res.json({ message: "Category updated", data });
  } catch (error) {
    res.status.json({ error });
  }
};

export const deleteCategory = async (req, res) => {
  const category = req.category;
  try {
    const result = await category.remove();
    if (!result) throw new Error();
    res.json({ message: "Category deleted sucess" });
  } catch (error) {
    res.status(400).json({ error: "Category not found" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ categories });
  } catch (error) {
    res.json({ error });
  }
};
