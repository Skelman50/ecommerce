import express from "express";
import {
  requireSignIni,
  isAuth,
  isAdmin
} from "../middlewares/user-middlewares/index.js";
import { findUserbyID } from "../controllers/user.js";
import { createProduct } from "../controllers/product.js";

const productRouter = express.Router();

productRouter.post(
  "/create/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  createProduct
);

productRouter.param("userId", findUserbyID);

export { productRouter };
