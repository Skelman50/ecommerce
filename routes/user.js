import express from "express";
import {
  findUserbyID,
  getUser,
  updateUser,
  purchaseHistory
} from "../controllers/user.js";
import {
  requireSignIni,
  isAuth,
  isAdmin
} from "../middlewares/user-middlewares/index.js";

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

userRouter.get("/:userId", requireSignIni, isAuth, getUser);
userRouter.get(
  "/ordersByUser/:userId",
  requireSignIni,
  isAuth,
  purchaseHistory
);
userRouter.put("/:userId", requireSignIni, isAuth, updateUser);

userRouter.param("userId", findUserbyID);

export { userRouter };
