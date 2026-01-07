import express from "express";
import {
  createReview,
  getAllReviews
} from "../controllers/reviewsController.js";

const router = express.Router();

// POST /api/reviews
router.post("/", createReview);

// GET /api/reviews
router.get("/", getAllReviews);

export default router;
