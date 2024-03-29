import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import { categoryRouter } from "./routes/category.js";
import { productRouter } from "./routes/product.js";
import { braintreeRouter } from "./routes/braintree.js";
import { orderRouter } from "./routes/order.js";

dotenv.config();

const app = express();

const databaseURL = process.env.DATABASE;

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Database start"));

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/braintree", braintreeRouter);
app.use("/api/order", orderRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server run on port ${port}`));
