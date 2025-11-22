import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

const FlightCard = ({ trip }) => {
  const defaultDate = trip?.fromDate ? trip.fromDate.split("T")[0] : "";
  const end = trip?.toDate ? trip.toDate.split("T")[0] : "";

  const [origin, setOrigin] = useState("");
  const [date, setDate] = useState(defaultDate);

  const handleSearch = () => {
    const dest = trip?.destination ? trip.destination.split(",")[0] : "";
    const start = date;

    if (!origin) {
      alert("Please enter your city");
      return;
    }
    if (!start) {
      alert("Please select a start date");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedStart = new Date(start);
    selectedStart.setHours(0, 0, 0, 0);

    if (selectedStart < today) {
      alert("Please select a valid start date");
      return;
    }

    const url = `https://www.google.com/travel/flights?q=Flights%20to%20${dest}%20from%20${origin}%20on%20${start}%20through%20${end}`;

    window.open(url, "_blank");
  };

  return (
    <div className="relative z-30 bg-gray-50 p-5 rounded-lg border border-gray-100 mt-10 mb-6 ml-3 md:w-[57%] min-h-[150px]">
      <h2 className="text-md font-medium text-[#3F2978] mb-4 flex items-center gap-3">
        <FontAwesomeIcon icon={faPlane} className="text-[#3F2978] text-lg" />
        Find Flights
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-3">
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
              From (Your City)
            </label>
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-black font-medium focus:outline-none focus:border-[#3F2978]"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>

          {/* Date Field (Trip Start Date) */}
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
              Trip Start Date
            </label>
            <input
              type="date"
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-black focus:outline-none focus:border-[#3F2978] cursor-pointer"
              style={{
                accentColor: "#3F2978",
                colorScheme: "light",
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-[#3F2978] text-gray-100 text-sm py-3 rounded-lg hover:bg-[#362169] cursor-pointer transition flex justify-center items-center gap-2"
        >
          Search on Google Flights
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
