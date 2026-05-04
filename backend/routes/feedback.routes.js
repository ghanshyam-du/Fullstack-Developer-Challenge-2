import express from "express";
import {feedbackSubmit, getAllFeedbacks} from "../controller/feedback.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:assignmentId", protect, feedbackSubmit);
router.get("/", protect, adminOnly, getAllFeedbacks);


export default router;