import express from "express";
import {
  createBooking,
  getMyBookings,
} from "../controllers/booking.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = express.Router();

/* ======================
   USER BOOKING
====================== */

// ✅ USER buat booking
router.post(
  "/",
  requireAuth,
  requireRole("user"),
  createBooking
);

// ✅ USER lihat booking sendiri
router.get(
  "/me",
  requireAuth,
  requireRole("user"),
  getMyBookings
);

export default router;
