import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const DateRangePicker = ({ setFrom, setTo }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleStartChange = (date) => {
    setStartDate(date);
    setFrom(date ? formatDate(date) : null);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
    setTo(date ? formatDate(date) : null);
  };

  return (
    <div className="flex flex-row justify-between w-110">
      <div className="flex flex-col gap-2">
        <div className="flex items-center p-2 gap-2 h-12 pl-5 bg-white rounded-md w-54">
          <FontAwesomeIcon
            icon={faCalendar}
            className="w-5 h-5 text-[#3F2978]"
          />
          <DatePicker
            selected={startDate}
            onChange={handleStartChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            placeholderText="From"
            className="pl-3 outline-none placeholder-[#9185B0] text-[#3F2978] text-sm tracking-wide font-manrope"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center bg-white pl-5 h-12 rounded-md p-2 gap-2 w-54">
          <FontAwesomeIcon
            icon={faCalendar}
            className="w-5 h-5 text-[#3F2978]"
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            placeholderText="To"
            className="pl-3 outline-none placeholder-[#9185B0] tracking-wide text-[#3F2978] text-sm font-manrope"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
