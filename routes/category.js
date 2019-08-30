import express from "express";
import {
  createCategory,
  categotyById,
  readCategory,
  updateCategory,
  deleteCategory,
  getAllCategories
} from "../controllers/category.js";
import {
  requireSignIni,
  isAuth,
  isAdmin
} from "../middlewares/user-middlewares/index.js";
import { findUserbyID } from "../controllers/user.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/create/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  createCategory
);

categoryRouter.put(
  "/:categoryId/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  updateCategory
);

categoryRouter.delete(
  "/:categoryId/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  deleteCategory
);

categoryRouter.get("/", getAllCategories);

categoryRouter.get("/:categoryId", readCategory);

categoryRouter.param("userId", findUserbyID);
categoryRouter.param("categoryId", categotyById);

export { categoryRouter };
