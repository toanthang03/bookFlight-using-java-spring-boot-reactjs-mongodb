import { SearchIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocationData } from "../statics/datas/LocationData";

const locations = LocationData;
const HotelSearchBox = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchByHotelName: true,
    hotelName: "",
    locationId: "",
  });
  const handleSearch = () => {
    // console.log(searchData);
    if (searchData.searchByHotelName) {
      if (searchData.hotelName?.length < 1) {
        alert("Vui lòng nhập tên khách sạn");
        return;
      }
      navigate(`/hotels?hotelName=${searchData.hotelName}`);
    } else {
      navigate(`/hotels?locationId=${searchData.locationId}`);
    }
  };

  return (
    <div>
      <div>
        <label className="text-base font-medium text-gray-900">
          Tìm kiếm khách sạn
        </label>
        <p className="text-sm leading-5 text-gray-500">
          Lựa chọn các thức tìm kiếm 1 khách sạn
        </p>
        <fieldset className="mt-4">
          <legend className="sr-only">Notification method</legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            <div className="flex items-center">
              <input
                name="searchMethod"
                type="radio"
                checked={searchData.searchByHotelName}
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchByHotelName: true,
                    locationId: "",
                  });
                }}
                className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
              />
              <label
                htmlFor="searchMethod"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Tìm kiếm theo tên khách sạn
              </label>
            </div>
            <div className="flex items-center">
              <input
                name="searchMethod"
                type="radio"
                checked={!searchData.searchByHotelName}
                onChange={(e) => {
                  setSearchData({
                    ...searchData,
                    searchByHotelName: false,
                    hotelName: "",
                  });
                }}
                className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
              />
              <label
                htmlFor="searchMethod"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Tìm kiếm theo địa điểm
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            Tên khách sạn {searchData.searchByHotelName ? "" : "(disabled)"}
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Nhập tên khách sạn"
              disabled={!searchData.searchByHotelName}
              value={searchData.hotelName}
              onChange={(e) => {
                setSearchData({
                  ...searchData,
                  hotelName: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Địa điểm {!searchData.searchByHotelName ? "" : "(disabled)"}
          </label>
          <div className="mt-1">
            <select
              disabled={searchData.searchByHotelName}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={searchData.locationId}
              onChange={(e) => {
                setSearchData({
                  ...searchData,
                  locationId: e.target.value,
                });
              }}
            >
              <option value="">Tất cả điểm đi</option>
              {locations.map((location, index) => (
                <option key={index} value={location.locationId}>
                  {location.locationName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex mt-3">
          <button
            className="w-full ml-auto mt-auto mb-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            onClick={handleSearch}
          >
            <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelSearchBox;
