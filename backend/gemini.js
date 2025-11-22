import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateItinerary(trip) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
  const prompt = `Return ONLY a valid JSON array. No text, no markdown, no explanations.

Generate a day-wise itinerary for this trip:

Destination: ${trip.destination}
Dates: ${trip.fromDate} to ${trip.toDate}
Budget: ${trip.budget}x
Travellers: ${trip.travellers}
Notes: ${trip.notes}

Count the number of days between the dates and generate EXACTLY that many objects.

Each object MUST follow this structure:

{
  "day": 1,
  "title": "",
  "description": "",
  "places_to_visit": [
    { "name": "", "lat": 0, "lon": 0, "ticket":100 }
  ],
  "estimated_cost": 0,
  "budget_details": {
    "food": 0,
    "travel": 0,
    "tickets": 0,
    "misc": 0
  }
}

IMPORTANT RULES:
- The top-level JSON MUST be an array.
- Dont add arbitary high prices to the budget to make it equal to what I have provided at start
- Get ticket prices from internet of applicable places.
- Don't add high ticket prices
- If budget is unrealtically high/low give results for average budget for that place.
- If a place has free entry, set ticket price to 0.
- Add ticket real price for ticket requirement parameter in "places_to_visit" object
- If ticket prices you getting are in dollars/any other currency, convert it into INR (Indian Rupees) by real conversion rates.
- Leave some budget for hotels and flights as well by referencing to average hotels and flights prices for that destination
- Do NOT add same "place to visit" on multiple days.
- Keep description concise.
- Include suggested must visit places near the destination
- Include details as well in between description and mention take which transport and for where
- Destination coordinates should be correct
- Each day's "places_to_visit" must be the exact location from Google Maps or a verified source.
- Each day MUST be its own object.
- NO extra commentary.
- NO markdown or code fences.
- Output MUST be directly parsable by JSON.parse().

`;

  const response = await model.generateContent(prompt);

  let raw = response.response.text().trim();
  raw = raw.replace(/```json|```/g, "");
  return JSON.parse(raw);
}
