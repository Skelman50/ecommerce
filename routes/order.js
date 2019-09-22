import express from "express";
import { findUserbyID } from "../controllers/user.js";
import {
  createOrder,
  pushHistory,
  decreaseQuantity,
  listOrders,
  getStatusValues,
  orderbyId,
  updateOrderStatus
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

orderRouter.get("/list/:userId", requireSignIni, isAuth, isAdmin, listOrders);

orderRouter.get(
  "/status-values/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  getStatusValues
);

orderRouter.get(
  "/:orderId/status/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  updateOrderStatus
);

orderRouter.param("userId", findUserbyID);
orderRouter.param("orderId", orderbyId);

export { orderRouter };
