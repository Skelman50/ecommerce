import express from "express";
import { findUserbyID } from "../controllers/user.js";
import {
  createOrder,
  pushHistory,
  decreaseQuantity,
  listOrders
} from "../controllers/order.js";
import {
  requireSignIni,
  isAuth,
  isAdmin
} from "../middlewares/user-middlewares/index.js";

const orderRouter = express.Router();

orderRouter.post(
  "/create/:userId",
  requireSignIni,
  isAuth,
  pushHistory,
  decreaseQuantity,
  createOrder
);

orderRouter.get(
  "/list/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  listOrders
);

orderRouter.param("userId", findUserbyID);

export { orderRouter };
