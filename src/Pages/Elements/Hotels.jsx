import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import booking from "../../assets/booking.png";
import oyo from "../../assets/oyo.png";

const Hotels = ({ trip }) => {
  if (!trip) return null;

  const { fromDate, toDate, destination, travellers = 1 } = trip;
  const adults = travellers;

  return (
    <div>
      <div className="flex items-center gap-10 mt-5 ml-3 mb-8 h-10 w-110 bg-gray-50 p-6 border border-gray-100 rounded-lg">
        <div className="flex items-center rounded-md justify-center gap-3">
          <FontAwesomeIcon icon={faHouse} className="text-[#3F2978] text-xl" />
          <p className="font-manrope text-md font-medium text-[#3F2978]">
            Hotels
          </p>
        </div>

        <div className="flex gap-4 items-center opacity-90">
          {/* Booking.com */}
          <div
            className="flex items-center hover:bg-gray-100 rounded-lg px-3"
            onClick={() => {
              const city = trip.destination.split(",")[0].trim();
              const checkIn = fromDate;
              const checkOut = toDate;

              const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
                city
              )}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&no_rooms=1&group_children=0`;

              window.open(url, "_blank");
            }}
          >
            <div
              style={{
                width: "35px",
                height: "35px",
                backgroundSize: "35px",
                backgroundPosition: "center",
                backgroundImage: `url(${booking})`,
              }}
              className="w-10 h-10 rounded-xl cursor-pointer transition"
            ></div>
            <span className="text-[#2e5087] cursor-pointer font-medium font-sm">
              Booking.com
            </span>
          </div>

          {/* OYO */}
          <div
            className="flex items-center gap-2  hover:bg-gray-100 rounded-lg px-3"
            onClick={() => {
              const city = trip.destination;
              const checkIn = trip.fromDate.split("-").reverse().join("%2F");
              const checkOut = trip.toDate.split("-").reverse().join("%2F");

              const encodedCity = encodeURIComponent(city);
              const encodedLocation = encodeURIComponent(`${city}, India`);

              const oyoUrl = `https://www.oyorooms.com/search/?checkin=${checkIn}&checkout=${checkOut}&city=${encodedCity}&country=india&filters%5Bcity_id%5D=14&guests=3&location=${encodedLocation}&roomConfig=3&roomConfig%5B%5D=3&rooms=1&searchType=city`;

              window.open(oyoUrl, "_blank");
            }}
          >
            <div
              style={{
                width: "35px",
                height: "35px",
                backgroundSize: "35px",
                backgroundImage: `url(${oyo})`,
              }}
              className="w-10 h-10 rounded-xl cursor-pointer transition"
            />
            <span className="text-[#872e2e] cursor-pointer font-medium font-xs">
              OYO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
