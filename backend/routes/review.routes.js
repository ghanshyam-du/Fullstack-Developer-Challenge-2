import express from "express";
import {getAllReviews, createReview, updateReview} from "../controller/review.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",protect, adminOnly, getAllReviews);
router.post("/", protect, adminOnly, createReview);
router.put("/:id", protect, adminOnly, updateReview);

export default router;