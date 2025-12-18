import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const secretRules = process.env.VITE_PROMPT.replace(/\\n/g, '\n');

export async function generateItinerary(trip) {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
  const tripDetails = `
Generate a day-wise itinerary for this trip:
Destination: ${trip.destination}
Dates: ${trip.fromDate} to ${trip.toDate}
Budget: ${trip.budget}
Travellers: ${trip.travellers}
Notes: ${trip.notes}
`;
  const finalPrompt = `${tripDetails}\n\n${secretRules}`;

  const response = await model.generateContent(finalPrompt);

  let raw = response.response.text().trim();
  raw = raw.replace(/```json|```/g, "");
  return JSON.parse(raw);
}
