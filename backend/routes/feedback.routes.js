import express from "express";
import {feedbackSubmit, getAllFeedbacks} from "../controller/feedback.controller.js";

const router = express.Router();

router.post("/:assignmentId", feedbackSubmit);
router.get("/", getAllFeedbacks);


export default router;