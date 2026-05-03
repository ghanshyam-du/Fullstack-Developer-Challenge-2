import express from "express";
import {getAllReviews, createReview, updateReview} from "../controller/review.controller.js";

const router = express.Router();

router.get("/", getAllReviews);
router.post("/", createReview);
router.put("/:id", updateReview);

export default router;