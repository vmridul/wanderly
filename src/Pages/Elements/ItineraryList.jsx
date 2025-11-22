import BudgetTable from "./BudgetTable";
import FlightCard from "./FlightCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import WikiPreviewTooltip from "./WikiPreviewTooltip";
import Hotels from "./Hotels";

const ItineraryList = ({ trip }) => {
  const itinerary = trip?.details || [];

  const allPlaces = itinerary.flatMap((d) => d.places_to_visit);

  return (
    <div>
      <FlightCard trip={trip} />
      <Hotels trip={trip} />

      <div className="bg-[#fcfbff] -ml-5 pl-6">
        <hr className="text-gray-100 -ml-5 mt-5 mb-6" />

        <span className="text-2xl font-bricereg text-[#3F2978] ml-8">
          Itinerary
        </span>

        <div className="max-w-200 font-manrope overflow-y-auto mt-4 px-8 relative overflow-visible">
          {itinerary.map((day, i) => (
            <div key={i} className="mb-5">
              <h3 className="font-semibold text-xl text-[#3F2978] flex flex-wrap items-center gap-2">
                <span className="bg-[#E5E4F9] rounded-md px-3 py-1">
                  DAY {day.day}
                </span>

                <span className="flex-1 min-w-[200px]">{day.title}</span>
              </h3>

              <div className="text-md ml-22 mb-4 text-[#3f2978]">
                {day.description}
              </div>

              <div className="flex gap-3 ml-21 flex-wrap">
                {day.places_to_visit.map((place, j) => (
                  <div
                    key={j}
                    className="text-gray-700 px-2 flex gap-2 py-1 bg-[#f5f5ff] hover:bg-[#f2f2f9] rounded-xl text-sm cursor-pointer hover:text-[#3F2978]"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/search?q=${encodeURIComponent(
                          place.name
                        )}&tbm=isch`,
                        "_blank"
                      )
                    }
                  >
                    <span>{`${i + 1}.${j + 1}`}</span>
                    <WikiPreviewTooltip title={place.name} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <hr className="text-gray-100 -ml-5 mb-3 mt-4" />
      </div>

      <div className="ml-6 p-4">
        <div className="flex mb-3 items-center justify-center max-w-62 bg-[#eaf4f6] rounded-md">
          <FontAwesomeIcon
            icon={faTicket}
            className="text-[#295b78] ml-3 text-lg"
          />
          <span className="text-lg font-semibold text-[#295b78] px-2 py-1 inline-block">
            Ticket Prices <span className="text-xs">per person</span>
          </span>
        </div>

        <div className="flex gap-x-5 max-w-190 flex-wrap text-md items-start">
          {allPlaces.map((place, i) => (
            <div key={i} className="mb-2 text-[#295b78]">
              <div className="flex items-center gap-2">
                {place.name}
                <div
                  className={`px-2 font-medium rounded-md ${
                    place.ticket == 0 ? "bg-[#f8fcff]" : "bg-[#e5f2fd]"
                  }`}
                >
                  {place.ticket == 0 ? "FREE" : `₹${place.ticket}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs mb-3 -mt-4 ml-10 font-light text-gray-600">
        Ticket prices shown are approximate
      </div>

      <BudgetTable details={itinerary} />
    </div>
  );
};

export default ItineraryList;
