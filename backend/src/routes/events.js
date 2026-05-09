import express from "express";
import UpcomingEvent from "../models/UpcomingEvent.js";

const router = express.Router();

// Public upcoming events
router.get("/", async (req, res) => {
  try {
    const events = await UpcomingEvent.find().sort({ startDate: 1, createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("EVENTS FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

export default router;
