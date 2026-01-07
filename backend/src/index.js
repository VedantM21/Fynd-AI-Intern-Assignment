import express from "express";
import cors from "cors";
import reviewsRoutes from "./routes/reviews.js";

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://fynd-ai-intern-assignment-bay.vercel.app"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json());

// routes
app.use("/api/reviews", reviewsRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
