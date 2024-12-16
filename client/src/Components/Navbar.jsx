import React, { useState } from "react";
import { navbar } from "./Data/navbar-data";
import FilterComponent from "./FilterComponent"; 
import AnalysisComponent from "./AnalysisComponent"; 
import UploadComponent from "./UploadComponent";

export default function ProcessNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filteredData, setFilteredData] = useState(null);

  const handleFilterSubmit = (data) => {
    setFilteredData(data); 
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/8 bg-gray-300 p-4 space-y-4">
        <ul className="flex flex-col space-y-2">
          {navbar.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex cursor-pointer p-2 rounded-md text-lg ${
                activeIndex === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
            >
              <div className="m-1">{item.icon}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow justify-center align-center items-center text-center bg-white p-5 space-y-4">
        <div className="text-5xl font-bold">{navbar[activeIndex].header}</div>
        {activeIndex === 0 && <FilterComponent onFilterSubmit={handleFilterSubmit} />}
        {activeIndex === 1 && <AnalysisComponent filteredData={filteredData} />}
      </div>
    </div>
  );
}
