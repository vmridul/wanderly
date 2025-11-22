import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const BudgetTable = ({ details }) => {
  const totalBudget = details.reduce(
    (totals, day) => {
      totals.total += day.estimated_cost;
      totals.food += day.budget_details.food;
      totals.travel += day.budget_details.travel;
      totals.tickets += day.budget_details.tickets;
      totals.misc += day.budget_details.misc;
      return totals;
    },
    { total: 0, food: 0, travel: 0, tickets: 0, misc: 0 }
  );

  return (
    <div className="ml-6 p-4 overflow-x-auto text-sm font-manrope text-[#3F2978]">
      <div className="flex mb-3 items-center justify-center md:max-w-56 bg-[#e4f9ed] rounded-md">
        <FontAwesomeIcon
          icon={faMoneyBill}
          className="text-[#297856] ml-3 text-lg"
        />
        <span className="text-lg font-semibold text-[#297856] px-2 py-1 inline-block">
          Budget Breakdown
        </span>
      </div>
      <table className="md:min-w-[200px] md:ml-0  md:w-187 border border-gray-100 rounded-2xl text-center">
        <thead className="bg-gray-50 rounded-lg">
          <tr>
            <th className="py-2 md:px-4 ">Day</th>
            <th className="py-2 md:px-4 ">Estimated Cost (₹)</th>
            <th className="py-2 md:px-4 ">Food (₹)</th>
            <th className="py-2 md:px-4 ">Travel (₹)</th>
            <th className="py-2 md:px-4 ">Tickets (₹)</th>
            <th className="py-2 md:px-4 ">Misc (₹)</th>
          </tr>
        </thead>
        <tbody>
          {details.map((day) => (
            <tr key={day.day} className="hover:bg-gray-50">
              <td className="py-2 md:px-4 ">{day.day}</td>
              <td className="py-2 md:px-4">{day.estimated_cost}</td>
              <td className="py-2 md:px-4">{day.budget_details.food}</td>
              <td className="py-2 md:px-4 ">{day.budget_details.travel}</td>
              <td className="py-2 md:px-4">{day.budget_details.tickets}</td>
              <td className="py-2 md:px-4 ">{day.budget_details.misc}</td>
            </tr>
          ))}

          {/* Total row */}
          <tr className="bg-[#fafefb] text-[#297856] font-semibold">
            <td className="py-2 md:px-4 ">Total </td>
            <td className="py-2 md:px-4 ">
              {totalBudget.total} + Hotel & Flights
            </td>
            <td className="py-2 md:px-4 ">{totalBudget.food}</td>
            <td className="py-2 md:px-4">{totalBudget.travel}</td>
            <td className="py-2 md:px-4">{totalBudget.tickets}</td>
            <td className="py-2 md:px-4 ">{totalBudget.misc}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
