import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import { categoryRouter } from "./routes/category.js";
import { productRouter } from "./routes/product.js";

dotenv.config();

const app = express();

const databaseURL = process.env.DATABASE;

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Database start"));

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server run on port ${port}`));
