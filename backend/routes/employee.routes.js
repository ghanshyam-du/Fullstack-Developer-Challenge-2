import express from "express";
import {getAllEmployees, createEmployee, deleteEmployee, updateEmployee} from "../controller/employee.controller.js";
const router = express.Router();

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.delete("/:id", deleteEmployee);
router.put("/:id", updateEmployee);

export default router;