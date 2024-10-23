import { useState } from "react";

const Datepickerr = ({ dateType,value, setdate }) => {
  return (
    <div className="relative inline-block w-64 mr-10">
      <label
        htmlFor="date-picker"
        className="block text-sm font-medium text-white"
      >
        {dateType} date:
      </label>
      <input value={value} onChange={(e) => setdate(e.target.value)}
        type="date"
        className="mt-1 block w-full p-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      {/* <input
        id="date-picker"
        type="date"
        className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      /> */}
    </div>
  );
};

export default Datepickerr;
