import express from "express";
import {
  requireSignIni,
  isAuth
} from "../middlewares/user-middlewares/index.js";
import { findUserbyID } from "../controllers/user.js";
import { generateToken, processPayment } from "../controllers/braintree.js";
const braintreeRouter = express.Router();

braintreeRouter.get("/getToken/:userId", requireSignIni, isAuth, generateToken);
braintreeRouter.post("/payment/:userId", requireSignIni, isAuth, processPayment);

braintreeRouter.param("userId", findUserbyID)

export { braintreeRouter };
