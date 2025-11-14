import express, { Router } from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';

const orderRouter = Router();
orderRouter.post("/", createOrder)
orderRouter.get("/", getOrders)

export default orderRouter;

