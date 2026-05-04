import express from "express";
import {getAllEmployees, createEmployee, deleteEmployee, updateEmployee} from "../controller/employee.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", protect, adminOnly, getAllEmployees);
router.post("/", protect, adminOnly, createEmployee);
router.delete("/:id", protect, adminOnly, deleteEmployee);
router.put("/:id", protect, adminOnly, updateEmployee);

export default router;