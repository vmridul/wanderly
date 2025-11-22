import mongoose from "mongoose";
import { nanoid } from "nanoid";

const tripSchema = new mongoose.Schema({
  tripId: { type: String, default: () => nanoid(8), unique: true },
  destination: { type: String, required: true },
  lat: { type: String, required: true },
  long: { type: String, required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  budget: { type: Number, required: true },
  travellers: { type: Number, default: 1 },

  notes: { type: String, default: "" },

  details: { type: Array, default: [] },

  userEmail: { type: String },
}, { timestamps: true,collection: "trips" });

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
