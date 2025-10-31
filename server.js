import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import authRoutes from "./src/routes/auth.js";
import pantryRoutes from "./src/routes/pantryRoutes.js";
import recipeRoutes from "./src/routes/recipeRoutes.js";
import shoppingRoutes from "./src/routes/shoppingRoutes.js";
import aiRoutes from "./src/routes/aiRoutes.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Home page route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Docs page route
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "docs.html"));
});

// Status page route
app.get("/status", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "status.html"));
});

// Public health check route
app.get("/api/ping", async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState; // 0=disconnected,1=connected
    const dbConnected = dbState === 1;

    res.json({
      status: "ok",
      message: "KitchenLy backend is running smoothly 🍳",
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      dbConnected,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching health status",
      uptime: Math.floor(process.uptime()),
      dbConnected: false,
    });
  }
});


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/pantry", pantryRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/shopping", shoppingRoutes);
app.use("/api/ai", aiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
