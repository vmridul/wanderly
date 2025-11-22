import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import Trips from "./Pages/Trips";
import Create from "./Pages/Create";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Itinerary from "./Pages/Itinerary";
import DemoItinerary from "./Pages/DemoItinerary";
import { useAuth } from "./AuthContext";
import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  const PrivateRoute = ({ children }) => {
    if (loading)
      return (
        <div className="min-h-screen font-bricereg bg-cover bg-center flex justify-center gap-3 pt-70 h-screen text-xl text-[#3F2978]">
          Loading
          <div className="w-7 h-7 border-4 border-gray-300 border-t-[#3F2978] rounded-full animate-spin"></div>
        </div>
      );
    if (!user) return <Navigate to="/" replace />;
    return children;
  };

  const PageWrapper = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        closeOnClick
        theme="light"
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/trips"
            element={
              <PrivateRoute>
                <PageWrapper>
                  <Trips />
                </PageWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <PageWrapper>
                  <Create />
                </PageWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/trip/:id"
            element={
              <PageWrapper>
                <Itinerary />
              </PageWrapper>
            }
          />
          <Route
            path="/demo-itinerary"
            element={
              <PageWrapper>
                <DemoItinerary />
              </PageWrapper>
            }
          />
          <Route
            path="*"
            element={
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
