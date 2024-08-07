import express from "express";
import { createOrder } from "../controllers/order.js";
import authHandler from "../middleware/authHandler.js";
const router = express.Router();

router.post("/", authHandler, createOrder);

export default router;
