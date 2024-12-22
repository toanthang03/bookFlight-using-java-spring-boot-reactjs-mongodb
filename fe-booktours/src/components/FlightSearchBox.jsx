import { SearchIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AirfieldData } from "../statics/datas/AirfieldData";

const airFields = AirfieldData;
const FlightSearchBox = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    departure: 0,
    destination: 1,
    departureDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    // console.log(searchData);
  }, [searchData]);

  const handleSearch = () => {
    // console.log({
    //   departure: airFields[searchData.departure].airfieldId,
    //   destination: airFields[searchData.destination].airfieldId,
    //   departureDate: searchData.departureDate,
    // });
    navigate(
      `/flights?departure=${
        airFields[searchData.departure].airfieldId
      }&destination=${
        airFields[searchData.destination].airfieldId
      }&departureDate=${searchData.departureDate}`
    );
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-3 my-5">
        <div>
          <div className="mt-1">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={searchData.departure}
              onChange={(e) =>
                // Không được trùng với điểm đến
                {
                  if (parseInt(e.target.value) === searchData.destination) {
                    setSearchData({
                      ...searchData,
                      departure: searchData.destination,
                      destination: searchData.departure,
                    });
                  } else {
                    setSearchData({ ...searchData, departure: e.target.value });
                  }
                }
              }
            >
              {airFields.map((airField, index) => (
                <option key={index} value={index}>
                  {airField.airfieldName} ({airField.locationName})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="mt-1">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={searchData.destination}
              onChange={(e) =>
                // Không được trùng với điểm đến
                {
                  if (parseInt(e.target.value) === searchData.departure) {
                    setSearchData({
                      ...searchData,
                      destination: searchData.departure,
                      departure: searchData.destination,
                    });
                  } else {
                    setSearchData({
                      ...searchData,
                      destination: e.target.value,
                    });
                  }
                }
              }
            >
              {airFields.map((airField, index) => (
                <option key={index} value={index}>
                  {airField.airfieldName} ({airField.locationName})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="mt-1">
            <input
              type="date"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={searchData.departureDate}
              // Không thể chọn ngày trước ngày hiện tại
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setSearchData({ ...searchData, departureDate: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="grid md:flex gap-3">
        <button
          className="ml-auto mt-auto mb-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          onClick={handleSearch}
        >
          <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Tìm kiếm
        </button>
      </div>
    </>
  );
};

export default FlightSearchBox;
