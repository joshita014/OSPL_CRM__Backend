import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config";
import userRouter from "./features/users/user.router.js";
import projectRouter from "./features/projects/project.router.js";

const app = express();
const PORT = 8000 || process.env.PORT;

// 1. Middleware
app.use(cors());
app.use(express.json());
// 2. Routes
app.use("/api/auth", userRouter);
app.use("/api/project", projectRouter);

// 3. MongoDB connection
mongoose
  .connect(process.env.URL)
  .then(() => console.log("Connected to MongoDB..!"))
  .catch((err) => console.log("Unable to connect to DB..! Try Again..." + err));

// 4. Server
app.listen(PORT, () => console.log(`Server up and running on  ${PORT}`));
