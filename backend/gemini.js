import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const secretRules = import.meta.env.VITE_PROMPT.replace(/\\n/g, '\n');
const tripDetails = `
Generate a day-wise itinerary for this trip:
Destination: ${trip.destination}
Dates: ${trip.fromDate} to ${trip.toDate}
Budget: ${trip.budget}
Travellers: ${trip.travellers}
Notes: ${trip.notes}
`;

export async function generateItinerary(trip) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
  const finalPrompt = `${tripDetails}\n\n${secretRules}`;

  const response = await model.generateContent(finalPrompt);

  let raw = response.response.text().trim();
  raw = raw.replace(/```json|```/g, "");
  return JSON.parse(raw);
}
