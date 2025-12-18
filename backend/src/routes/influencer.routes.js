import express from "express";
import {
  getAllInfluencers,
  getInfluencerById,
  getMyInfluencerProfile,
  updateMyInfluencerProfile,
  getMyInfluencerBookings,
  updateBookingStatus,
} from "../controllers/influencer.controller.js";

import { requireAuth, requireRole } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/* ======================
   INFLUENCER (LOGIN)
====================== */

router.get(
  "/me/profile",
  requireAuth,
  requireRole("influencer"),
  getMyInfluencerProfile
);

router.patch(
  "/me/profile",
  requireAuth,
  requireRole("influencer"),
  upload.single("avatar"),
  updateMyInfluencerProfile
);

router.get(
  "/me/bookings",
  requireAuth,
  requireRole("influencer"),
  getMyInfluencerBookings
);

router.patch(
  "/me/bookings/:id",
  requireAuth,
  requireRole("influencer"),
  updateBookingStatus
);

/* ======================
   PUBLIC
====================== */

router.get("/", getAllInfluencers);
router.get("/:id", getInfluencerById);

export default router;
