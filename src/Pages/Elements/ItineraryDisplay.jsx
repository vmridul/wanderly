import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMoneyBill,
  faUser,
  faCalendar,
  faTrash,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import arrow from "../../assets/arrow.png";
import handleCopy from "./Copy";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ItineraryList from "./ItineraryList";
import { useNavigate } from "react-router-dom";

const ItineraryDisplay = ({ trip }) => {
  if (!trip || !Array.isArray(trip.details)) {
    return (
      <div className="min-h-screen font-bricereg bg-cover bg-center flex justify-center gap-3 pt-70 h-screen text-xl text-[#3F2978]">
        Loading Itinerary
        <div className="w-7 h-7 border-4 border-gray-300 border-t-[#3F2978] rounded-full animate-spin"></div>
      </div>
    );
  }
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this trip?"
      );
      if (!confirmDelete) return;
      await fetch(`${import.meta.env.VITE_API_URL}/api/trips/${trip.tripId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      console.log("Trip deleted successfully");
      navigate("/trips");
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  const itinerary = trip.details;
  const [selectedDay, setSelectedDay] = useState(null);

  const colors = ["#8450E8", "#7A8BFF", "#A98CFF", "#6F7BFF", "#9662FF"];

  const allMarkers = itinerary.flatMap((day, dayIndex) =>
    day.places_to_visit.map((place, placeIndex) => ({
      ...place,
      label: `${dayIndex + 1}.${placeIndex + 1}`,
      day: dayIndex,
    }))
  );

  const filteredMarkers =
    selectedDay !== null
      ? allMarkers.filter((m) => m.day === selectedDay)
      : allMarkers;

  // ========= FIX 1: For map resize issues =========
  const FixMapSize = () => {
    const map = useMap();
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 150);
    }, []);
    return null;
  };

  // ========= FIX 2: Updated ChangeView =========
  const ChangeView = ({ markers }) => {
    const map = useMap();
    useEffect(() => {
      if (markers.length > 0) {
        const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lon]));
        map.fitBounds(bounds, { padding: [80, 80] });
      }
    }, [markers]);
    return null;
  };

  const [destinationImage, setDestinationImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (!trip?.destination) return;

    const fetchImage = async () => {
      const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      const cleanName = trip.destination.split(",")[0].trim();
      const cacheKey = `trip-image-${cleanName}`;
      const cachedImage = localStorage.getItem(cacheKey);
      if (cachedImage) {
        setDestinationImage(cachedImage);
        setIsImageLoading(false);
        return;
      }

      setIsImageLoading(true);

      const query = `${cleanName}`;
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape&order_by=popular&client_id=${accessKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const imageUrl = data.results[0].urls.regular;
          setDestinationImage(imageUrl);
          localStorage.setItem(cacheKey, imageUrl);
        }
      } catch (error) {
        console.error("Unsplash error:", error);
      } finally {
        setIsImageLoading(false);
      }
    };

    fetchImage();
  }, [trip?.destination]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden flex flex-col font-manrope w-full h-full p-4">
      <div
        className={` ml-2 z-50 flex justify-between items-center w-198 fixed text-nowrap}`}
      >
        <div
          onClick={() => navigate("/trips")}
          className=" flex items-center text-sm z-50 bg-white text-[#3F2978] px-3 py-2 rounded-lg shadow hover:bg-gray-50 transition cursor-pointer"
        >
          <img src={arrow} alt="" className="ml-1 w-5 h-5" />
          <span className="text-sm mr-3">Back</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="hidden md:flex items-center gap-1 px-5 py-2 bg-[#f5f5ff] rounded-lg">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-[#4e4070] text-sm"
            />
            <span className="text-[#4e4070] text-sm font-medium">
              {new Date(trip.fromDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}{" "}
              -{" "}
              {new Date(trip.toDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 px-5 py-2 bg-[#f5f5ff] rounded-lg">
            <FontAwesomeIcon
              icon={faMoneyBill}
              className="text-[#4e4070] text-sm"
            />
            <span className="text-[#4e4070] text-sm font-medium">
              ₹{trip.budget}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 px-5 py-2 bg-[#f5f5ff] rounded-lg">
            <FontAwesomeIcon icon={faUser} className="text-[#4e4070] text-sm" />
            <span className="text-[#4e4070] text-sm font-medium">
              {trip.travellers}
            </span>
          </div>
          <div
            onClick={handleDelete}
            className="flex md:ml-0 -ml-103 items-center gap-1 px-7 py-3 bg-[#f8e2e2] rounded-lg cursor-pointer hover:bg-[#f6d6d6]"
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="text-[#704040] text-sm"
            />
          </div>
          <div
            onClick={() => handleCopy(trip.tripId)}
            className="flex md:ml-0 -ml-103 items-center gap-1 px-7 py-3 bg-[#F8F8E2] hover:bg-[#f5f5cc] rounded-lg cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faCopy}
              className=" text-[#60571e] text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 w-130 md:w-216 h-60 flex items-center justify-center rounded-b-lg  -m-4 ">
        {isImageLoading ? (
          <div className="text-gray-400 text-sm">Loading image...</div>
        ) : (
          <div className="relative">
            <img
              src={destinationImage}
              alt={trip.destination}
              className="w-130 md:w-216 h-60 rounded-b-lg object-center object-cover transition-transform duration-700"
            />
            <div className="absolute top-0 left-0 bg-black w-130 md:w-216 h-60 opacity-30"></div>
            <div className="flex gap-2 items-center absolute bottom-5 left-12">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-[white] text-xl"
              />
              <span className="text-xl font-semibold text-white shadow-3xl">
                {trip?.destination}
              </span>
            </div>
          </div>
        )}
      </div>

      <ItineraryList trip={trip} />

      {/* MAP */}
      <div className="w-full h-[500px] relative mt-6 shadow-lg z-0 md:block md:fixed md:top-0 md:right-0 md:bottom-0 md:w-[40%] md:h-full md:mt-0 md:z-20 overflow-hidden">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md h-12 shadow-md rounded-3xl flex items-center gap-2 px-1 py-1 z-1000">
          {itinerary.map((day, index) => (
            <button
              key={index}
              onClick={() =>
                setSelectedDay(selectedDay === index ? null : index)
              }
              className={`px-3 cursor-pointer text-sm w-16 rounded-3xl h-10 transition-all duration-200 ${
                selectedDay === index
                  ? "bg-[#3F2978] text-gray-200"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Day {index + 1}
            </button>
          ))}
        </div>

        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={6}
          style={{ width: "100%", height: "100%" }}
        >
          <FixMapSize />
          <ChangeView markers={filteredMarkers} />

          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {filteredMarkers.map((place, index) => {
            const markerColor = colors[place.day % colors.length];
            const showLabel = selectedDay !== null;

            return (
              <Marker
                key={index}
                position={[place.lat, place.lon]}
                icon={L.divIcon({
                  className: "custom-marker",
                  html: `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
              <div style="
                background:${markerColor};
                color:white;
                border-radius:30%;
                width:26px;
                height:26px;
                display:flex;
                align-items:center;
                justify-content:center;
                font-weight:semibold;
                font-size:11px;
              ">${place.label}</div>
              ${
                showLabel
                  ? `<div style="
                      background:white;
                      color:#3F2978;
                      font-size:12px;
                      padding:2px 6px;
                      border-radius:6px;
                      margin-top:3px;
                      box-shadow:0 0 3px rgba(0,0,0,0.2);
                      white-space:nowrap;
                      font-weight:500;
                    ">${place.name}</div>`
                  : ""
              }
            </div>`,
                })}
              >
                {!showLabel && (
                  <Popup>
                    <span className="font-semibold">{place.name}</span>
                  </Popup>
                )}
              </Marker>
            );
          })}

          {selectedDay !== null && (
            <Polyline
              positions={itinerary[selectedDay].places_to_visit.map((p) => [
                p.lat,
                p.lon,
              ])}
              pathOptions={{
                color: colors[selectedDay % colors.length],
                weight: 3,
                opacity: 0.7,
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
