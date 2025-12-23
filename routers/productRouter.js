import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductInfo,
  getProducts,
  searchProducts,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:productId", getProductInfo);
productRouter.get("/search/:query",searchProducts);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);

export default productRouter;