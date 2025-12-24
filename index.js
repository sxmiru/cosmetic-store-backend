import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";
import cors from 'cors'
import orderRouter from "./routers/orderRouter.js";
dotenv.config();

const app = express();

app.use(bodyparser.json());

app.use(cors());

//Authenticaion
app.use((req, res, next) => {
  const tokenValue = req.header("Authorization");
  if (tokenValue != null) {
    const token = tokenValue.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (decoded == null) {
        res.status(401).json({
          message: "Unauthorized",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    next();
  }
});

const connectionString = process.env.MONGO_URI;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Failed to connect to database");
  });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter)

app.listen(5000, () => {
  console.log("server started");
});
