import { SearchIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocationData } from "../statics/datas/LocationData";

const regions = ["Miền Bắc", "Miền Trung", "Miền Nam"];
const prices = [
  { title: "Dưới 5 triệu", min: 0, max: 5000000 },
  { title: "Từ 5 đến 10 triệu", min: 5000000, max: 10000000 },
  { title: "Từ 10 đến 20 triệu", min: 10000000, max: 20000000 },
  { title: "Từ 20 triệu trở lên", min: 20000000, max: 99999999 },
];
const locations = LocationData;
const TourSearchBox = () => {
  const navigate = useNavigate();
  const [searchTour, setSearchTour] = useState({
    region: 0,
    location: locations[0].locationName,
    priceRange: 0,
  });

  const handleSearch = () => {
    navigate(
      `/tours?region=${regions[
        searchTour.region
      ].normalize(
        "NFC"
      )}&location=${searchTour.location}&minPrice=${prices[searchTour.priceRange].min}&maxPrice=${
        prices[searchTour.priceRange].max
      }`
    );
  };
  return (
    <div className="grid md:grid-cols-4 gap-3 my-5">
      <div>
        <div className="mt-1">
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            value={searchTour.region}
            onChange={(e) =>
              setSearchTour({
                ...searchTour,
                region: e.target.value,
              })
            }
          >
            {regions.map((region, index) => (
              <option key={index} value={index}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div className="mt-1">
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            value={searchTour.location}
            onChange={(e) =>
              setSearchTour({
                ...searchTour,
                location: e.target.value,
              })
            }
          >
            {locations
              .filter(
                (location) =>
                  location.regionName ===
                  regions[searchTour.region].normalize("NFC")
              )
              .map((location, index) => (
                <option key={index} value={location.locationName}>
                  {location.locationName}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div>
        <div className="mt-1">
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            value={searchTour.priceRange}
            onChange={(e) =>
              setSearchTour({
                ...searchTour,
                priceRange: e.target.value,
              })
            }
          >
            {prices.map((price, index) => (
              <option key={index} value={index}>
                {price.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <button
          className="h-full w-full mt-auto mb-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          onClick={handleSearch}
        >
          <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default TourSearchBox;
