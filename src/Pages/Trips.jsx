import React, { useState, useEffect } from "react";
import tripBg from "../assets/12.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import wanderly from "../assets/wanderly.png";
import handleCopy from "./Elements/Copy";
import ProfileMenu from "./Elements/ProfileMenu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendar,
  faMoneyBill,
  faUser,
  faTrash,
  faCirclePlus,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

const Trips = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { user, loading } = useAuth();
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => navigate("/create");

  const handleDelete = async (tripId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this trip?",
      );
      if (!confirmDelete) return;

      await fetch(`${import.meta.env.VITE_API_URL}/api/trips/${tripId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      setTrips((prevTrips) =>
        prevTrips.filter((trip) => trip.tripId !== tripId),
      );

      console.log("Trip deleted successfully");
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };
  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to Logout?");
      if (!confirmLogout) return;
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchTrips = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/trips/${user.email}`,
        );
        const data = await res.json();
        setTrips(Array.isArray(data) ? data : data.trips || []);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    };

    fetchTrips();
  }, [user]);

  const filteredTrips = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === "date") return new Date(a.fromDate) - new Date(b.fromDate);
    if (sortBy === "budget") return a.budget - b.budget;
    return 0;
  });

  return (
    <div className="overflow-x-hidden relative min-h-screen flex flex-col items-center font-manrope bg-[#fafafa]">
      {/* Background with Fade Effect */}
      <div
        className="absolute inset-x-0 top-0 z-0 blur-sm saturate-60 hue-rotate-30 pointer-events-none"
        style={{
          backgroundImage: `url(${tripBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          height: "70vh",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      ></div>

      <div
        onClick={() => navigate("/")}
        className="absolute left-10 top-5 flex items-center gap-2 cursor-pointer z-10"
      >
        <div className="p-2 mb-1 rounded-lg w-12 h-12 flex items-center justify-center">
          <img src={wanderly} alt="" />
        </div>
        <span className="text-2xl font-bricereg font-heading font-black text-[#3F2978] tracking-tight">
          Wanderly
        </span>
      </div>
      <div className="absolute right-10 top-5 flex items-center md:gap-8 z-10">
        {user && !loading && (
          <ProfileMenu user={user} handleLogout={handleLogout} />
        )}
      </div>
      {/* Header */}
      <div className="flex flex-col items-center mt-6 relative z-10">
        <h1 className="text-3xl md:text-4xl text-[#3F2978] font-brice mt-25 tracking-wide">
          My Trips
        </h1>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center w-180 mt-10 text-sm">
          <div className="bg-white p-5 pr-0 gap-23 md:gap-5 flex items-center rounded-md h-10 md:w-62 w-80">
            <span className="text-[#3F2978]">Sort by:</span>
            <div>
              <button
                onClick={() => setSortBy(sortBy === "date" ? "" : "date")}
                className={`text-[#3F2978] cursor-pointer ${
                  sortBy === "date" ? "hover:bg-[#ddd5f1]" : "hover:bg-gray-100"
                } h-10 pl-5 pr-5 ${
                  sortBy === "date" ? "bg-[#ddd5f1]" : "bg-white"
                }`}
              >
                Date
              </button>
              <button
                onClick={() => setSortBy(sortBy === "budget" ? "" : "budget")}
                className={`text-[#3F2978] cursor-pointer ${
                  sortBy === "budget"
                    ? "hover:bg-[#ddd5f1]"
                    : "hover:bg-gray-100"
                } h-10 pl-5 pr-5 rounded-r-md ${
                  sortBy === "budget" ? "bg-[#ddd5f1]" : "bg-white"
                }`}
              >
                Budget
              </button>
            </div>
          </div>

          <div className="bg-white w-80 p-5 gap-2 flex items-center rounded-md h-10 focus-within:outline focus-within:outline-[#b5a4dd]">
            <input
              type="text"
              placeholder="Search"
              className="outline-0 w-82 placeholder-[#9185B0]"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-[#3F2978] text-lg"
            />
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-5 text-[#656592] text-xs tracking-wide rounded-md bg-white/20 backdrop-blur-xl border items-center border-white/20 shadow-sm w-180 h-9 mt-3 px-6">
        <span className="ml-1">DESTINATION</span>
        <span className="ml-7">DURATION</span>
        <span className="ml-10">BUDGET</span>
        <span className="ml-8">TRAVELLERS</span>
        <span></span>
      </div>

      {/* Trips List */}
      <div>
        {sortedTrips.length > 0 ? (
          sortedTrips.map((trip, index) => (
            <Link
              to={`/trip/${trip.tripId}`}
              key={trip.tripId}
              className={`text-[#3F2978] md:py-0 py-2 grid grid-cols-2 grid-rows-3 md:grid md:grid-cols-5 md:grid-rows-1 items-center text-sm bg-white md:max-w-[720px] rounded-3xl h-38 md:h-18 max-w-82 px-4 border border-[#CFD0D5] shadow-[0px_5px_0px_#EFEFEF,0px_6px_0px_#CFD0D5] hover:shadow-[0px_5px_0px_#EFEFEF,0px_6px_0px_#CFD0D5,0px_7px_6px_#d3d3d3] transition-all ease-in-out ${
                index === 0 ? "mt-3" : "mt-4"
              }`}
            >
              {/* Destination */}
              <div className="flex items-center gap-1 ml-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="w-4 h-4 text-[#3F2978]"
                />
                <span className="truncate">{trip.destination}</span>
              </div>

              {/* Dates */}
              <div className="flex md:ml-7.5 items-center gap-1 min-w-40">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="w-4 h-4 text-[#3F2978]"
                />
                <span>
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

              {/* Budget */}
              <div className="flex items-center gap-1 ml-2 md:ml-9.5">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="w-4 h-4 text-[#3F2978]"
                />
                <span>₹{trip.budget}</span>
              </div>

              {/* Travellers */}
              <div className="flex items-center gap-1 md:ml-7">
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-4 h-4 text-[#3F2978]"
                />
                <span>{trip.travellers}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 md:justify-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(trip.tripId);
                  }}
                  className="bg-[#f8e2e2] rounded-2xl py-1 px-6 md:py-3 md:px-4 hover:bg-[#f6d6d6] ease-in-out cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-[#704040]" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCopy(trip.tripId);
                  }}
                  className="bg-[#F8F8E2] rounded-2xl py-1 px-6 md:py-3 md:px-5 font-medium text-[#60571e] hover:bg-[#f5f5cc] ease-in-out cursor-pointer"
                >
                  <FontAwesomeIcon icon={faCopy} className="text-[#704040]" />
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="mt-8 z-[100] text-[#3F2978]">No Trips Found</p>
        )}
      </div>

      {/* Create Button */}
      <button
        onClick={handleClick}
        className="flex mb-16 text-white  cursor-pointer z-[100] justify-center items-center gap-2 mt-6 bg-[#3F2978] rounded-2xl w-80 md:w-180 h-11"
      >
        Create a new trip{" "}
        <FontAwesomeIcon icon={faCirclePlus} className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Trips;
