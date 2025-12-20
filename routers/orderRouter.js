import express, { Router } from 'express';
import { createOrder, getOrders, updateOrder } from '../controllers/orderController.js';

const orderRouter = Router();
orderRouter.post("/", createOrder)
orderRouter.get("/:page/:limit", getOrders)
orderRouter.put("/:orderId", updateOrder)


export default orderRouter;

