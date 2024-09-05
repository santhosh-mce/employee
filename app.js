import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import auditTrailRoutes from "./routes/auditTrailRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Route setup
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/auditTrails", auditTrailRoutes);

// Serve static files in production

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
