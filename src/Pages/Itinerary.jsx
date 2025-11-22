import React from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItineraryDisplay from "./Elements/ItineraryDisplay";

const Itinerary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [trip, setTrip] = useState(null);

  const handleFetch = async () => {
    if (!user) return;

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/trips/find/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 403 || res.status === 404) navigate("/create");
    const data = await res.json();
    setTrip(data);
    console.log(data);
  };

  useEffect(() => {
    if (!loading && user) {
      handleFetch();
    }
  }, [user, loading]);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/create");
    }
  }, [user, navigate, loading]);

  return (
    <div>
      <ItineraryDisplay trip={trip} />
    </div>
  );
};

export default Itinerary;
