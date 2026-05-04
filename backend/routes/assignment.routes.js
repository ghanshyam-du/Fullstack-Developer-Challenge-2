import express from "express";
import { createAssignment, getMyAssignment, getAllAssignments } from "../controller/assignment.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
const router = express.Router();


router.post("/", protect,adminOnly, createAssignment);    
router.get("/all", protect,adminOnly, getAllAssignments); 

router.get("/my", protect, getMyAssignment);

export default router;
  