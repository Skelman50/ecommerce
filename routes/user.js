import express from "express";
import { findUserbyID } from "../controllers/user.js";
import { requireSignIni, isAuth, isAdmin } from "../middlewares/user-middlewares/user.js";

const userRouter = express.Router();

userRouter.get(
  "/secret/:userId",
  requireSignIni,
  isAuth,
  isAdmin,
  (req, res) => {
    res.json({
      user: req.profile
    });
  }
);

userRouter.param("userId", findUserbyID);

export { userRouter };
