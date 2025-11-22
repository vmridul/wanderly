import React, { useState, useEffect } from "react";
import createBg from "../assets/create_bg.png";
import LocationInput from "./Elements/LocationInput";
import DateRangePicker from "./Elements/DataRangePicker";
import { useAuth } from "../AuthContext";
import { signInWithGoogle } from "../firebase";
import GoogleLogo from "../assets/google.png";
import arrow from "../assets/arrow.png";
import { useNavigate } from "react-router-dom";

import LoadingBar from "./Elements/LoadingBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMoneyBill,
  faUser,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const Create = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const [longLoad, setLongLoad] = useState(false);

  const [destination, setDestination] = useState("");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [fromDate, setFrom] = useState();
  const [toDate, setTo] = useState();
  const [budget, setBudget] = useState();
  const [travellers, setTravellers] = useState();
  const [notes, setNotes] = useState("");
  const [details, setDetails] = useState("");

  const handleGenerate = async () => {
    setLoadingGenerate(true);
    const userEmail = user.email;
    try {
      const trip = {
        destination,
        lat,
        long,
        fromDate,
        toDate,
        budget,
        travellers,
        notes,
        userEmail,
      };
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/itinerary/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trip }),
        }
      );

      if (!res.ok) {
        navigate("/create");
        alert("Server Overloaded. Please try again later.");
        return;
      }

      const data = await res.json();
      setDetails(data);

      const tripToSave = {
        ...trip,
        details: data,
      };
      const newT = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripToSave),
      });
      const savedTrip = await newT.json();
      navigate(`/trip/${savedTrip.tripId}`);
      console.log("Trip generated!");
    } catch (error) {
      console.error("Error during generating:", error);
    }
  };

  const handleClick = () => navigate("/trips");

  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      console.log("User:", user.email);

      await fetch(`${VITE_API_URl}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user.displayName, email: user.email }),
      });

      console.log("User saved to backend ✅");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  useEffect(() => {
    let timer;

    if (loadingGenerate) {
      timer = setTimeout(() => {
        setLongLoad(true);
      }, 7000);
    } else {
      setLongLoad(false);
    }

    return () => clearTimeout(timer);
  }, [loadingGenerate]);

  if (loading)
    return (
      <div className="flex justify-center font-bricereg gap-3 pt-70 h-screen text-xl tracking-widest text-[#3F2978]">
        Loading
        <div className="w-7 h-7 border-4 border-gray-300 border-t-[#3F2978] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div
      className="overflow-x-hidden min-h-screen bg-cover bg-center p-5 relative"
      style={{ backgroundImage: `url(${createBg})` }}
    >
      {loadingGenerate && (
        <div
          className="fixed inset-0 bg-white flex items-center justify-center z-50
               transition-opacity duration-1000"
        >
          <div className="text-[#3F2978] text-xl flex font-bricereg flex-col items-center transform scale-95 transition-transform duration-1000">
            <LoadingBar />
            <div className="mt-5">Planning your trip</div>
            {longLoad ? (
              <div className="w-140 h-10 mt-6 px-5 py-2 bg-[#ffefc0] rounded-lg text-sm flex items-center justify-center text-amber-500 border border-dashed">
                Hang on tight! Loading may take some time, server is busy.
              </div>
            ) : (
              <div className="w-140 h-10 mt-6 px-5 py-2"></div>
            )}
          </div>
        </div>
      )}

      {/* Google Sign-in */}
      <div
        onClick={handleSignIn}
        className={`bg-[white] flex items-center justify-center pr-3 h-11 w-50 rounded-3xl ml-auto border border-gray-100 shadow-md hover:shadow-xl shadow-gray-100 cursor-pointer ${
          user ? "invisible" : ""
        }`}
      >
        <img src={GoogleLogo} alt="google-logo" className="w-10 h-10" />
        <span className="font-medium text-sm">Sign in with Google</span>
      </div>

      {/* My Trips button */}
      <div
        onClick={handleClick}
        className={`bg-white flex absolute top-5 gap-0 items-center justify-center h-10 w-40 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-500 ${
          !user ? "invisible" : ""
        }`}
      >
        <img src={arrow} alt="" className="w-5 h-5" />
        <span className="text-sm mr-3">My Trips</span>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl text-center text-[#3F2978] font-brice tracking-wide mt-15">
          Enter your trip details
        </h1>

        {/* Destination input */}
        <div className="bg-white rounded-md flex items-center pl-4.5 mt-15 h-12 w-80 md:w-110">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="w-5 h-5 text-[#3F2978]"
          />
          <LocationInput
            setDestination={setDestination}
            setLat={setLat}
            setLong={setLong}
          />
        </div>

        {/* Date picker */}
        <div className="mt-3">
          <DateRangePicker setFrom={setFrom} setTo={setTo} />
        </div>

        {/* Budget & Travellers */}
        <div className="flex md:flex-row flex-col h-12 gap-3 md:gap-2 mt-3 w-80 md:w-110">
          <div className="bg-white rounded-md flex items-center h-12 w-80 md:w-70 p-5 pr-0 gap-5">
            <FontAwesomeIcon
              icon={faMoneyBill}
              className="w-5 h-3 text-[#3F2978]"
            />
            <input
              type="number"
              placeholder="Budget"
              onChange={(e) => setBudget(e.target.value)}
              className="outline-0 text-[#3F2978] w-35 font-manrope text-sm tracking-wide placeholder-[#9185B0]"
            />
            <div className="text-[#3F2978] text-md flex items-center justify-center bg-gray-100 h-12 w-40 rounded-r-md">
              <span>₹</span>
            </div>
          </div>

          <div className="bg-white rounded-md flex items-center h-12 w-80 md:w-38 p-5 gap-4">
            <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-[#3F2978]" />
            <input
              type="number"
              placeholder="Travellers"
              onChange={(e) => setTravellers(e.target.value)}
              className="outline-0 text-[#3F2978] w-22 font-manrope text-sm tracking-wide placeholder-[#9185B0]"
            />
          </div>
        </div>

        {/* Notes */}
        <div
          onChange={(e) => setNotes(e.target.value)}
          className="flex bg-white w-80 md:w-110 mt-3 rounded-md h-12 p-5 items-center justify-between"
        >
          <FontAwesomeIcon icon={faPen} className="w-5 h-5 text-[#3F2978]" />
          <input
            type="text"
            placeholder="Optional details, eg.: ‘Include museums and cafes’"
            className="pl-4 flex-1 outline-0 text-[#3F2978] font-manrope text-sm tracking-wide placeholder-[#9185B0]"
          />
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          className="bg-[#3F2978] rounded-md w-80 md:w-110 h-12 mt-3 text-white font-medium text-sm hover:shadow-xl cursor-pointer ease-in-out"
        >
          Generate Trip Plan
        </button>
      </div>
    </div>
  );
};

export default Create;
