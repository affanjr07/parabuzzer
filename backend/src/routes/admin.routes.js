import express from "express";
import {
  getInfluencers,
  createInfluencer,
  getAdminBookings
} from "../controllers/admin.controller.js";

const router = express.Router();

// Influencer
router.get("/influencer", getInfluencers);
router.post("/influencer", createInfluencer);

// ✅ Admin Transactions
router.get("/bookings", getAdminBookings);

export default router;
