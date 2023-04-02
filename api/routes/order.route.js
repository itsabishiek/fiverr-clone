import express from "express";
import {
  confirmPayment,
  createPaymentIntent,
  getOrders,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, createPaymentIntent);
router.put("/", verifyToken, confirmPayment);

export default router;
