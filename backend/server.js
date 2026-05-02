import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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