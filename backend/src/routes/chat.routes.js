import express from "express";
import {
  getChatByBooking,
  sendMessage,
} from "../controllers/chat.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/booking/:bookingId",
  requireAuth,
  getChatByBooking
);

router.post(
  "/",
  requireAuth,
  sendMessage
);

export default router;
