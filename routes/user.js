import express from "express";
import { signUp } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);

export { userRouter };
