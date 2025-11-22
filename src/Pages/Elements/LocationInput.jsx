import React, { useState, useRef } from "react";

const GEOAPIFY_KEY = "8494ddd743e645afabdc73e5ade81c06";

export default function LocationInput({ setDestination, setLat, setLong }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const timeoutRef = useRef(null);
  const [isValidLocation, setIsValidLocation] = useState(false);

  const fetchSuggestions = async (text) => {
    if (!text) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        text
      )}&apiKey=${GEOAPIFY_KEY}&lang=en&limit=6&type=city`;
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data.features || []);
      setSelectedIndex(-1); // reset highlight
    } catch (err) {
      console.error("Geoapify fetch error", err);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setIsValidLocation(false); // user is typing → not valid until selected
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (val.length > 1) fetchSuggestions(val);
      else setSuggestions([]);
    }, 250);
  };

  const selectPlace = (place) => {
    const name = place.properties.formatted;
    const latitude = place.properties.lat;
    const longitude = place.properties.lon;

    setQuery(name);
    setSuggestions([]);
    setSelectedIndex(-1);
    setIsValidLocation(true);

    setDestination(name);
    setLat(latitude);
    setLong(longitude);
    console.log("Selected:", {
      name,
      lat: place.properties.lat,
      lon: place.properties.lon,
    });
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        selectPlace(suggestions[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  return (
    <div style={{ width: 320, position: "relative", margin: 16 }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onBlur={() => {
          if (!isValidLocation) setQuery("");
        }}
        onKeyDown={handleKeyDown}
        placeholder="Enter destination"
        aria-autocomplete="list"
        className="placeholder-[#9185B0] text-[#3F2978] text-sm font-manrope tracking-wide"
        aria-expanded={suggestions.length > 0}
        style={{
          width: "100%",
          border: "0px",
          outline: "none",
          padding: "0",
          boxSizing: "border-box",
        }}
      />

      {suggestions.length > 0 && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 6,
            marginTop: 6,
            padding: 0,
            listStyle: "none",
            maxHeight: 220,
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((place, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <li
                key={
                  place.properties.place_id || place.properties.formatted + idx
                }
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setSelectedIndex(idx)}
                onMouseLeave={() => setSelectedIndex(-1)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectPlace(place);
                }}
                style={{
                  padding: "8px 10px",
                  cursor: "pointer",
                  background: isSelected ? "#3F2978" : "white",
                  color: isSelected ? "white" : "#3F2978",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {place.properties.formatted}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
