import express from "express";
import { createReview, getReviewsByInfluencer } from "../controllers/review.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", requireAuth, requireRole("user"), createReview);
router.get("/influencer/:id", getReviewsByInfluencer);

export default router;
