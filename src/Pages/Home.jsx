import React, { useState, useEffect } from "react";
import wanderly from "../assets/wanderly.png";
import wanderlyWhite from "../assets/wanderly_white.png";
import GoogleLogo from "../assets/google.png";
import { useAuth } from "../AuthContext";
import { signInWithGoogle } from "../firebase";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import booking from "../assets/booking.png";
import oyo from "../assets/oyo.png";
import bg from "../assets/bg.png";
import ProfileMenu from "./Elements/ProfileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handlePlanning = async () => {
    if (!user) {
      try {
        const result = await signInWithGoogle();
        const user = result.user;
        console.log("User:", user.email);

        await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: user.displayName, email: user.email }),
        });

        console.log("User saved to backend");
        navigate("/trips");
      } catch (error) {
        console.error("Error during sign-in:", error);
      }
    }
    navigate("/trips");
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

  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      console.log("User:", user.email);

      await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user.displayName, email: user.email }),
      });

      console.log("User saved to backend");
      navigate("/trips");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-800 overflow-x-hidden bg-[#F3F4F6]">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 mb-1 rounded-lg w-12 h-12 flex items-center justify-center">
              <img src={scrolled ? wanderly : wanderlyWhite} alt="" />
            </div>
            <span
              className={`text-2xl font-bricereg font-heading font-black ${scrolled ? "text-[#3F2978]" : "text-white"} tracking-tight`}
            >
              Wanderly
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {!user && !loading ? (
              <button
                onClick={handleSignIn}
                className="bg-white hover:bg-gray-100 cursor-pointer pl-7 flex items-center gap-2 text-black px-5 py-2.5 rounded-lg transition"
              >
                Sign In With Google
                <img src={GoogleLogo} alt="google-logo" className="w-8 h-8" />
              </button>
            ) : (
              <ProfileMenu user={user} handleLogout={handleLogout} />
            )}
          </div>

          <button
            className="md:hidden text-[#3F2978] text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4">
            Menu
            {!user && !loading ? (
              <button
                onClick={handleSignIn}
                className="bg-[#3F2978] cursor-pointer pl-7 flex items-center gap-2 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#2a1b52] transition shadow-lg shadow-purple-200"
              >
                Sign In With Google
                <img src={GoogleLogo} alt="google-logo" className="w-8 h-8" />
              </button>
            ) : (
              <div className="flex flex-col gap-4 border-t pt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full border border-[#3F2978]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-left font-medium text-red-600 hover:text-red-700 transition cursor-pointer flex items-center gap-2"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header
        style={{ backgroundImage: `url(${bg})` }}
        className="relative h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-stripes min-h-[80vh] flex items-center isolate"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* CENTER: Hero Text */}
            <div className="w-full lg:w-1/2  text-center z-10 order-1 lg:order-2 ">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-brice font-heading font-black text-white leading-tight mb-0 tracking-tight">
                Plan your next <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-200">
                  adventure.
                </span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto font-manrope">
                Build detailed day-wise itineraries, track real ticket prices,
                view everything on a map.
              </p>

              <div className="flex flex-col mt-10 font-manrope sm:flex-row gap-4 justify-center">
                <button
                  onClick={handlePlanning}
                  className="bg-white hover:bg-gray-100 cursor-pointer text-black px-8 py-4 rounded-xl font-medium text-lg transition shadow-xl flex items-center justify-center gap-2 group"
                >
                  Start Planning Free
                  <i className="fa-solid fa-chevron-right text-sm group-hover:translate-x-1 transition-transform"></i>
                </button>
                <button
                  onClick={() => navigate("/demo-itinerary")}
                  className="bg-white/50 backdrop-blur-md hover:bg-white/60 cursor-pointer text-black/70 px-8 py-4 rounded-xl font-medium text-lg transition shadow-lg flex items-center justify-center gap-2"
                >
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-30 bg-aesthetic-dots relative flex flex-col items-center isolate">
        <div className="container mx-auto mt-5 px-6 flex flex-col items-center relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-brice font-heading font-black text-[#3F2978] mb-4">
              Your Trips, Organized
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-manrope">
              Search what you need, sort everything easily, and keep your
              budgets and day-plans perfectly organized with Wanderly.
            </p>
          </div>

          <div className="w-full max-w-[720px] flex flex-col items-center">
            {/* Search & Sort Bar */}
            <div className="hidden md:flex flex-col md:flex-row justify-between items-center w-full text-sm gap-4 mb-3">
              {/* Sort */}
              <div className="bg-white py-2 px-4 gap-5 flex items-center rounded-md h-12 md:h-10 shadow-sm w-full md:w-auto justify-between md:justify-start">
                <span className="text-[#3F2978] font-medium">Sort by:</span>
                <div className="flex">
                  <button
                    className={`text-[#3F2978]  text-xs font-bold uppercase tracking-wider transition-colors px-3 py-1 rounded-md`}
                  >
                    Date
                  </button>
                  <button
                    className={`text-[#3F2978] text-xs font-bold uppercase tracking-wider transition-colors px-3 py-1 rounded-md ml-2`}
                  >
                    Budget
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="bg-white px-4 gap-2 flex items-center rounded-md h-12 md:h-10 shadow-sm w-full md:w-60 focus-within:ring-2 focus-within:ring-[#b5a4dd] transition-all">
                <input
                  type="text"
                  disabled="true"
                  placeholder="Search"
                  className="outline-0 w-full placeholder-[#9185B0] text-[#3F2978] bg-transparent"
                />
                <i className="fa-solid fa-location-dot text-[#3F2978] text-lg"></i>
              </div>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-5 text-[#656592] text-xs font-bold tracking-wide rounded-md bg-white/20 backdrop-blur-xl border border-white/20 shadow-sm w-full h-9 items-center px-6 uppercase mb-3">
              <span className="ml-1">DESTINATION</span>
              <span className="ml-7">DURATION</span>
              <span className="ml-10">BUDGET</span>
              <span className="ml-8">TRAVELLERS</span>
              <span></span>
            </div>

            {/* Trip Cards List */}
            <div className="w-full flex items-center flex-col gap-4">
              {/* Trip 1 */}
              <div className="text-[#3F2978] md:py-0 py-2 grid grid-cols-2 grid-rows-3 md:grid md:grid-cols-5 md:grid-rows-1 items-center text-sm bg-white md:max-w-[720px] rounded-3xl h-38 md:h-18 max-w-82 px-4 border border-[#CFD0D5] shadow-[0px_5px_0px_#EFEFEF,0px_6px_0px_#CFD0D5] hover:shadow-[0px_5px_0px_#EFEFEF,0px_6px_0px_#CFD0D5,0px_7px_6px_#d3d3d3] transition-all ease-in-out group">
                {/* Destination */}
                <div className="flex items-center gap-2 md:ml-2 col-span-1">
                  <i className="fa-solid fa-location-dot w-4 h-4 text-[#3F2978]"></i>
                  <span className="truncate font-bold">Mumbai, India</span>
                </div>

                {/* Dates */}
                <div className="flex md:ml-7.5 items-center gap-2 md:gap-1 min-w-40 col-span-1 text-slate-500">
                  <i className="fa-solid fa-calendar w-4 h-4 text-[#3F2978]"></i>
                  <span>23 Nov - 26 Nov</span>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-2 md:gap-1 md:ml-9.5 col-span-1 font-light">
                  <i className="fa-solid fa-money-bill w-4 h-4 text-[#3F2978]"></i>
                  <span>₹40,000</span>
                </div>

                {/* Travellers */}
                <div className="flex items-center gap-2 md:gap-1 md:ml-7 col-span-1 text-slate-500">
                  <i className="fa-solid fa-user w-4 h-4 text-[#3F2978]"></i>
                  <span>4</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 justify-end col-span-1">
                  <button className="bg-[#f8e2e2] rounded-2xl py-3 px-4 hover:bg-[#f6d6d6] ease-in-out cursor-pointer transition-colors">
                    <i className="fa-solid fa-trash text-[#704040]"></i>
                  </button>
                  <button className="bg-[#F8F8E2] rounded-2xl py-3 px-4 font-medium text-[#60571e] hover:bg-[#f5f5cc] ease-in-out cursor-pointer transition-colors">
                    <i className="fa-solid fa-copy text-[#60571e]"></i>
                  </button>
                </div>
              </div>

              {/* Trip 2 */}
              <div className="text-[#3F2978] md:py-0 py-2 grid grid-cols-2 grid-rows-3 md:grid md:grid-cols-5 md:grid-rows-1 items-center text-sm bg-white md:max-w-[720px] rounded-3xl h-38 md:h-18 max-w-82 px-4 border border-[#CFD0D5] shadow-[0px_5px_0px_#EFEFEF,0px_6px_0px_#CFD0D5] hover:shadow-[0px_5px_0px_#EFEFEF,0px_6px_0px_#CFD0D5,0px_7px_6px_#d3d3d3] transition-all ease-in-out group">
                {/* Destination */}
                <div className="flex items-center gap-2 md:ml-2 col-span-1">
                  <i className="fa-solid fa-location-dot w-4 h-4 text-[#3F2978]"></i>
                  <span className="truncate font-bold">Udaipur, India</span>
                </div>

                {/* Dates */}
                <div className="flex md:ml-7.5 items-center gap-2 md:gap-1 min-w-40 col-span-1 text-slate-500">
                  <i className="fa-solid fa-calendar w-4 h-4 text-[#3F2978]"></i>
                  <span>21 Nov - 24 Nov</span>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-2 md:gap-1 md:ml-9.5 col-span-1 font-light">
                  <i className="fa-solid fa-money-bill w-4 h-4 text-[#3F2978]"></i>
                  <span>₹30,000</span>
                </div>

                {/* Travellers */}
                <div className="flex items-center gap-2 md:gap-1 md:ml-7 col-span-1 text-slate-500">
                  <i className="fa-solid fa-user w-4 h-4 text-[#3F2978]"></i>
                  <span>3</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 justify-end col-span-1">
                  <button className="bg-[#f8e2e2] rounded-2xl py-3 px-4 hover:bg-[#f6d6d6] ease-in-out cursor-pointer transition-colors">
                    <i className="fa-solid fa-trash text-[#704040]"></i>
                  </button>
                  <button className="bg-[#F8F8E2] rounded-2xl py-3 px-4 font-medium text-[#60571e] hover:bg-[#f5f5cc] ease-in-out cursor-pointer transition-colors">
                    <i className="fa-solid fa-copy text-[#60571e]"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO */}
      <section className="py-24 bg-white relative overflow-hidden isolate">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/40 blur-3xl -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[-1]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/40 blur-3xl translate-x-1/2 translate-y-1/2 rounded-full pointer-events-none z-[-1]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-brice font-heading font-black text-[#3F2978] mb-4">
              Why Wanderly?
            </h2>
            <p className="text-slate-600 font-manrope max-w-2xl mx-auto">
              Designed for modern travelers who love organization but hate the
              hassle.
            </p>
          </div>

          {/* BENTO 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 max-w-6xl mx-auto h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 bg-[#F3E8FF] rounded-[2.5rem] p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/50 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#3F2978] shadow-sm mb-6">
                  <i className="fa-solid fa-ticket text-2xl"></i>
                </div>
                <h3 className="text-3xl font-bricereg font-bold text-[#3e1f5e] mb-4">
                  Updated Ticket Prices
                </h3>
                <p className="text-slate-600 font-body leading-relaxed mb-8 max-w-sm">
                  Find flight and attraction prices from the internet to plan
                  your budget smartly.
                </p>

                <div className="mt-auto bg-white/60 backdrop-blur-md rounded-xl p-8 hidden md:flex flex-col gap-4 shadow-sm border border-white/50 translate-y-4 transition-transform duration-500">
                  <div className="bg-slate-200/60 rounded-lg px-4 py-2 flex items-center gap-2 w-fit">
                    <i className="fa-solid fa-ticket text-[#3F2978]"></i>
                    <span className="text-[#3F2978] font-bold text-sm font-body">
                      Ticket Prices{" "}
                      <span className="text-xs font-normal opacity-70 ml-1">
                        per person
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 font-body text-sm">
                    {[
                      { name: "Gateway of India", price: "FREE" },
                      { name: "CSMV Museum", price: "₹150" },
                      { name: "Marine Drive", price: "FREE" },
                      { name: "Haji Ali Dargah", price: "FREE" },
                      { name: "Siddhivinayak", price: "FREE" },
                      { name: "Dhobi Ghat", price: "FREE" },
                      { name: "Bandra Fort", price: "FREE" },
                      { name: "Elephanta Caves", price: "₹40" },
                      { name: "Juhu Beach", price: "FREE" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-slate-700 cursor-default"
                      >
                        <span className="font-medium text-slate-800">
                          {item.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                            item.price === "FREE"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bento 2*/}
            <div className="md:col-span-1 md:row-span-2 bg-[#E0F2FE] rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm mb-6 relative z-10">
                <i className="fa-solid fa-map-location-dot text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bricereg font-bold text-[#0c4a6e] mb-2 relative z-10">
                Interactive Map
              </h3>
              <p className="text-sky-700/80 text-sm font-body mb-6 relative z-10">
                Visualize your full route using interactive map with day wise
                filters.
              </p>

              {/* MAP GRAPHIC */}
              <div className="hidden lg:block flex-1 bg-[#F9F5ED] rounded-2xl overflow-hidden relative border border-white/50 shadow-inner">
                <div
                  className="absolute top-0 left-0 bottom-0 w-1/3 bg-[#CBE6F6]"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 80% 20%, 90% 40%, 60% 60%, 80% 80%, 50% 100%, 0 100%)",
                  }}
                ></div>
                <div
                  className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-[#CBE6F6]"
                  style={{ clipPath: "circle(70% at 100% 100%)" }}
                ></div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
                  <path
                    d="M100 0 V 100"
                    stroke="#FDE047"
                    strokeWidth="6"
                    fill="none"
                  />
                  <path
                    d="M100 100 Q 120 150 150 200"
                    stroke="#FDE047"
                    strokeWidth="6"
                    fill="none"
                  />
                  <path
                    d="M100 50 H 250"
                    stroke="#FDE047"
                    strokeWidth="6"
                    fill="none"
                  />
                  <path
                    d="M180 50 V 150 H 280"
                    stroke="#FDE047"
                    strokeWidth="6"
                    fill="none"
                  />
                  <path
                    d="M80 120 Q 110 140 180 120"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M200 0 V 250"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                </svg>

                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 27 28 Q 25 36 30 45"
                    stroke="#8B5CF6"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="3 3"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#3F2978] font-heading font-bold tracking-widest opacity-40 text-xl">
                  MUMBAI
                </div>

                {[
                  { id: "1.1", top: "75%", left: "38%" },
                  { id: "2.2", top: "45%", left: "28%" },
                  { id: "2.1", top: "25%", left: "25%" },
                ].map((marker, i) => (
                  <div
                    key={i}
                    className="absolute bg-[#8B5CF6] text-white text-[8px] px-2 py-1.5 rounded-lg transition-transform cursor-pointer z-20"
                    style={{ top: marker.top, left: marker.left }}
                  >
                    {marker.id}
                  </div>
                ))}
              </div>
            </div>

            {/* Bento 3 */}
            <div className="md:col-span-1 bg-[#FEF3C7] rounded-[2.5rem] p-6 flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm mb-4">
                  <i className="fa-solid fa-circle-info text-2xl"></i>
                </div>

                <h3 className="text-xl font-bricereg font-bold text-[#78350f] mb-1">
                  Smart Tooltips
                </h3>
                <p className="text-[#92400e] text-xs font-body mb-4">
                  Hover for history & details.
                </p>
              </div>

              <div className="hidden md:block absolute -bottom-6 -right-6 transform rotate-[-12deg] group-hover:rotate-[-6deg] group-hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="absolute top-6 -left-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-white/60 z-0 transition-all duration-500 group-hover:-translate-x-2">
                  <div className="flex items-center gap-2">
                    <span className="opacity-50 font-body text-[8px] font-bold text-[#3e1f5e]">
                      1.1
                    </span>
                    <span className="font-heading font-bold text-[9px] text-[#3e1f5e] whitespace-nowrap">
                      Gateway of India
                    </span>
                  </div>
                </div>

                <div className="w-48 bg-white rounded-xl p-2.5 shadow-2xl border border-white/60 relative z-10">
                  <div className="h-20 w-full bg-slate-100 rounded-lg mb-2 overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=400&auto=format&fit=crop"
                      alt="Gateway of India"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <h4 className="text-[#3F2978] font-bold font-heading text-xs mb-0.5">
                    Gateway of India
                  </h4>
                  <p className="text-slate-500 text-[8px] leading-relaxed font-body line-clamp-2">
                    20th-century arch-monument overlooking the Arabian Sea.
                  </p>
                </div>
              </div>
            </div>

            {/* Bento 4 */}
            <div className="overflow-hidden relative md:col-span-1 bg-[#DCFCE7] rounded-[2.5rem] p-8 flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                <i className="fa-solid fa-hotel text-2xl"></i>
              </div>
              <div className="">
                <div className="hidden lg:block absolute top-28 -left-7 bg-white/60 backdrop-blur-sm px-3 rounded-lg shadow-sm border border-white/60 z-10 transition-all duration-500 group-hover:translate-x-2">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="flex items-center gap-0 h-3 w-80 p-6 gap-2 rounded-lg">
                        <div className="flex items-center rounded-md justify-center gap-1">
                          <FontAwesomeIcon
                            icon={faHouse}
                            className="text-[#3F2978] text-md"
                          />
                          <p className="font-manrope text-xs font-semibold text-[#3F2978]">
                            Hotels
                          </p>
                        </div>

                        <div className="flex gap-2 items-center opacity-90">
                          {/* Booking.com */}
                          <div className="flex items-center hover:bg-gray-100 rounded-lg">
                            <div
                              style={{
                                width: "30px",
                                height: "30px",
                                backgroundSize: "30px",
                                backgroundPosition: "center",
                                backgroundImage: `url(${booking})`,
                              }}
                              className="w-5 h-5 rounded-xl cursor-pointer transition"
                            ></div>
                            <span className="text-[#2e5087] cursor-pointer font-medium text-xs">
                              Booking.com
                            </span>
                          </div>

                          {/* OYO */}
                          <div className="flex items-center gap-1  hover:bg-gray-100 rounded-lg">
                            <div
                              style={{
                                width: "30px",
                                height: "30px",
                                backgroundSize: "30px",
                                backgroundImage: `url(${oyo})`,
                              }}
                              className="w-5 h-5 rounded-xl cursor-pointer transition"
                            />
                            <span className="text-[#872e2e] cursor-pointer font-medium text-xs">
                              OYO
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bricereg font-bold text-[#064e3b] mt-2">
                  One-Click Search
                </h3>
                <p className="text-[#065f46] text-sm mt-1">
                  Find & book flights and hotels instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3F2978] text-white py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 mb-1 rounded-lg w-12 h-12 flex items-center justify-center">
              <img src={wanderlyWhite} alt="" />
            </div>
            <span className="text-2xl font-bricereg font-black tracking-tight">
              Wanderly
            </span>
          </div>

          <p className="text-purple-300 text-sm">
            Designed & Developed by Mridul
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
