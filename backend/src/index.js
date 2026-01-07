import express from "express";
import cors from "cors";
import reviewsRouter from "./routes/reviews.js";

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(express.json());

app.use("/api/reviews", reviewsRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
