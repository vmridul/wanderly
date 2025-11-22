import express from "express";
import Trip from "../models/Trip.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req,res) => {
    try{
        
        const { userEmail, destination,lat,long, fromDate, toDate, budget, travellers, notes, details } = req.body;
     
        const user = await User.findOne({ email: userEmail });
        if(!user) return res.status(401).json({ message: "User not found" });

        const newTrip = new Trip({
      userEmail,
      destination,
      lat,
      long,
      fromDate,
      toDate,
      budget,
      travellers,
      notes,
      details,
    });
    await newTrip.save();
    res.status(201).json(newTrip);
    }catch(error){
        console.error(error);
    res.status(500).json({ message: "Error saving trip", error });
    }
})

router.get("/:email",async(req,res) => {
    try{
        const trips = await Trip.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(trips);
    }catch(error){
        res.status(500).json({ message: "Error fetching trips", error });
    }
})

router.delete("/:tripId", async(req,res) => {
    try{

        const { tripId } = req.params;
    const trip = await Trip.findOne({ tripId });
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    await Trip.deleteOne({ tripId });
    res.json({ message: "Trip deleted successfully" });
    }catch(error){
        res.status(500).json({ error: "Error deleting trip" });
    }
})

router.get("/find/:tripId",async(req,res)=>{
    try{
        const {tripId} = req.params;
        const trip = await Trip.findOne({ tripId: tripId });
        if (!trip) return res.status(404).json({ message: "Trip not found" });
        res.status(200).json(trip);
    }catch(error){
        res.status(500).json({ error: "Error finding trip" });
    }
})

export default router;