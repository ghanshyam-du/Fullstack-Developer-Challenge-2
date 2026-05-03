import express from "express";
import { createAssignment, getMyAssignment, getAllAssignments } from "../controller/assignment.controller.js";

const router = express.Router();


router.post("/", createAssignment);    
router.get("/all", getAllAssignments); 

router.get("/my", getMyAssignment);

export default router;
  