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
  productsList,
  relatedProductList,
  categoriesList,
  listBySearch,
  getPhoto,
  listSearch
} from "../controllers/product.js";

const productRouter = express.Router();

productRouter.post(
  "/create/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  createProduct
);

productRouter.get("/once/:productId", readProduct);

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

productRouter.get("/related/:productId", relatedProductList);
productRouter.get("/categories", categoriesList);

productRouter.post("/by/search", listBySearch);
productRouter.get("/search", listSearch);
productRouter.get("/once/photo/:productId", getPhoto);

productRouter.param("userId", findUserbyID);
productRouter.param("productId", productById);

export { productRouter };
