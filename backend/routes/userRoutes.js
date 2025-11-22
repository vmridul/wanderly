import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const user = await User.create({ name, email });

    res.json(user);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
