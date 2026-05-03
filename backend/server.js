import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from './config/connection.js';
import authRoutes from "./routes/auth.routes.js";
import assignmentRoutes from "./routes/assignment.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import reviewRoutes from "./routes/review.routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/reviews", reviewRoutes);

connectDB()
.then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
});