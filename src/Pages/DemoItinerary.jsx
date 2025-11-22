import React from "react";
import ItineraryDisplay from "./Elements/ItineraryDisplay";

const DemoItinerary = () => {
  const itinerary = {
    destination: "Mumbai, MH, India",
    lat: "18.9733536",
    long: "72.82810491917377",
    fromDate: "2025-11-23",
    toDate: "2025-11-26",
    budget: 40000,
    travellers: 4,
    notes: "",
    details: [
      {
        day: 1,
        title: "South Mumbai Heritage Walk",
        description:
          "Explore the colonial heart of Mumbai. Start at the iconic Gateway of India, then visit the nearby Chhatrapati Shivaji Maharaj Vastu Sangrahalaya. Conclude the day with a sunset walk along the Queen's Necklace, Marine Drive. Use local taxis or ride-sharing apps between these nearby locations.",
        places_to_visit: [
          {
            name: "Gateway of India",
            lat: 18.9219841,
            lon: 72.8346543,
            ticket: 0,
          },
          {
            name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
            lat: 18.926914,
            lon: 72.832539,
            ticket: 150,
          },
          {
            name: "Marine Drive",
            lat: 18.943335,
            lon: 72.82443,
            ticket: 0,
          },
        ],
        estimated_cost: 3200,
        budget_details: {
          food: 1800,
          travel: 800,
          tickets: 600,
          misc: 0,
        },
      },
      {
        day: 2,
        title: "Spiritual Sites & City Views",
        description:
          "Experience Mumbai's diverse spirituality. Visit the serene Haji Ali Dargah situated in the sea, followed by the revered Shree Siddhivinayak Temple. Get a glimpse of the city's unique outdoor laundry system at Dhobi Ghat. It's best to hire a taxi for the day or use ride-sharing apps for this route.",
        places_to_visit: [
          {
            name: "Haji Ali Dargah",
            lat: 18.9829,
            lon: 72.8087,
            ticket: 0,
          },
          {
            name: "Shree Siddhivinayak Temple",
            lat: 19.017,
            lon: 72.8303,
            ticket: 0,
          },
          {
            name: "Dhobi Ghat",
            lat: 18.9863,
            lon: 72.8256,
            ticket: 0,
          },
        ],
        estimated_cost: 2500,
        budget_details: {
          food: 1600,
          travel: 700,
          tickets: 0,
          misc: 200,
        },
      },
      {
        day: 3,
        title: "Bandra's Charms and Juhu Beach",
        description:
          "Discover the trendy suburb of Bandra. Start at the historic Bandra Fort for panoramic sea views. Stroll along the Bandstand Promenade, known for celebrity homes. End the day relaxing and enjoying street food at the lively Juhu Beach. Use auto-rickshaws for local travel within Bandra and Juhu.",
        places_to_visit: [
          {
            name: "Bandra Fort",
            lat: 19.0435,
            lon: 72.8193,
            ticket: 0,
          },
          {
            name: "Bandstand Promenade",
            lat: 19.0449,
            lon: 72.8225,
            ticket: 0,
          },
          {
            name: "Juhu Beach",
            lat: 19.0988,
            lon: 72.8258,
            ticket: 0,
          },
        ],
        estimated_cost: 3000,
        budget_details: {
          food: 2000,
          travel: 600,
          tickets: 0,
          misc: 400,
        },
      },
      {
        day: 4,
        title: "Ancient Caves and Bustling Markets",
        description:
          "Take a morning ferry from the Gateway of India to explore the ancient rock-cut temples of Elephanta Caves, a UNESCO World Heritage site. Return to the mainland in the afternoon to experience the vibrant chaos and shopping at Crawford Market before departure.",
        places_to_visit: [
          {
            name: "Elephanta Caves",
            lat: 18.9634,
            lon: 72.9315,
            ticket: 40,
          },
          {
            name: "Crawford Market",
            lat: 18.9515,
            lon: 72.8353,
            ticket: 0,
          },
        ],
        estimated_cost: 3500,
        budget_details: {
          food: 1500,
          travel: 1240,
          tickets: 160,
          misc: 600,
        },
      },
    ],
    userEmail: "email@gmail.com",
    tripId: "1234567",
  };
  return (
    <div>
      <ItineraryDisplay trip={itinerary} />
    </div>
  );
};

export default DemoItinerary;
