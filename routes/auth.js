import express from "express";
import { signUp, signIn, signOut } from "../controllers/auth.js";
import { validator } from "../helpers/validator/index.js";
const { userSignUpValidator, validation } = validator;

const authRouter = express.Router();

authRouter.post("/signup", userSignUpValidator, validation, signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);

export { authRouter };
