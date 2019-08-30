import express from "express";
import {
  requireSignIni,
  isAuth,
  isAdmin
} from "../middlewares/user-middlewares/index.js";
import { findUserbyID } from "../controllers/user.js";
import {
  createProduct,
  productById,
  readProduct,
  deleteProduct,
  updateProduct,
  productsList
} from "../controllers/product.js";

const productRouter = express.Router();

productRouter.post(
  "/create/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  createProduct
);

productRouter.get("/:productId", readProduct);

productRouter.delete(
  "/:productId/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  deleteProduct
);

productRouter.put(
  "/:productId/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  updateProduct
);

productRouter.get("/", productsList);

productRouter.param("userId", findUserbyID);
productRouter.param("productId", productById);

export { productRouter };
