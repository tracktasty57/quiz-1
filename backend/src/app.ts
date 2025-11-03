import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import errorMiddleware from "./middleware/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Add this line to mount the routes
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

mongoose.connect(process.env.MONGO_URI || "")
  .then(() => console.log("🟢 MongoDB connected"))
  .catch((err) => console.error("🔴 MongoDB connection error:", err));

export default app;
