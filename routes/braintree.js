import express from "express";
import {
  requireSignIni,
  isAuth
} from "../middlewares/user-middlewares/index.js";
import { findUserbyID } from "../controllers/user.js";
import { generateToken } from "../controllers/braintree.js";
const braintreeRouter = express.Router();

braintreeRouter.get("/getToken/:userId", requireSignIni, isAuth, generateToken);

braintreeRouter.param("userId", findUserbyID)

export { braintreeRouter };
