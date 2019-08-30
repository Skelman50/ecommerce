import express from "express";
import { getCategory, createCategory } from "../controllers/category.js";
import {
  requireSignIni,
  isAuth,
  isAdmin
} from "../middlewares/user-middlewares/index.js";
import { findUserbyID } from "../controllers/user.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategory);
categoryRouter.post(
  "/create/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  createCategory
);

categoryRouter.param("userId", findUserbyID);

export { categoryRouter };
