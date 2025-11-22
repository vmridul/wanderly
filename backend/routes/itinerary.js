import express from "express";
import { generateItinerary } from "../gemini.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { trip } = req.body;
  try {
    const itinerary = await generateItinerary(trip);
    res.json(itinerary);
  } catch (err) {
    console.error("Itinerary generation failed:", err);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

export default router;
