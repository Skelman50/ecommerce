import express from "express";
import { findUserbyID } from "../controllers/user.js";
import { createOrder } from "../controllers/order.js";
import {
  requireSignIni,
  isAuth
} from "../middlewares/user-middlewares/index.js";

const orderRouter = express.Router();

orderRouter.post("/create/:userId", requireSignIni, isAuth, createOrder);
orderRouter.param("userId", findUserbyID);

export { orderRouter };
