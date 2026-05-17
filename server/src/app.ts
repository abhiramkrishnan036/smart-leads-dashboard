import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import connectDB from "./config/database";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "https://smart-leads-frontend-v12m.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/leads",
  leadRoutes
);

app.get(
  "/",
  (req, res) => {
    res.send(
      "Smart Leads API Running..."
    );
  }
);

const PORT =
  process.env.PORT ||
  5000;

app.listen(
  PORT,
  () => {
    console.log(
      `🚀 Server running on port ${PORT}`
    );
  }
);