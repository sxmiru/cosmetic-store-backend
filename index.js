import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routers/productRouter.js";

const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
  const tokenValue = req.header("Authorization");
  if (tokenValue != null) {
    const token = tokenValue.replace("Bearer ", "");
    jwt.verify(token, "cbc-6505", (error, decoded) => {
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

const connectionString =
  "mongodb+srv://admin:123@cluster0.pxgfklk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

app.get("/", (req, res) => {
  console.log(req);
  res.json({
    message: "This is a get request",
  });
  console.log("This is a get request");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({
    message: "This is a post request",
  });
  console.log("This is a post request");
});

app.delete("/", (req, res) => {
  console.log("This is a delete request");
  res.json({
    message: "This is a delete request",
  });
  console.log("This is a delete request");
});

app.put("/", (req, res) => {
  console.log("This is a put request");
  res.json({
    message: "This is a put request",
  });
  console.log("This is a put request");
});

app.listen(5000, () => {
  console.log("server started");
});
