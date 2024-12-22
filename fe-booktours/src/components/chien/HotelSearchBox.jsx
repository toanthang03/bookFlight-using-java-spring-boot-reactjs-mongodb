import { SearchIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { LocationData } from "../../statics/datas/LocationData";

const minMaxPrices = [
  { title: "Mọi tầm giá", minPrice: 0, maxPrice: -1 },
  { title: "Dưới 200 nghìn", minPrice: 0, maxPrice: 200000 },
  { title: "200 nghìn - 350 nghìn", minPrice: 200000, maxPrice: 350000 },
  { title: "350 nghìn - 500 nghìn", minPrice: 350000, maxPrice: 500000 },
  { title: "500 nghìn - 1 triệu", minPrice: 500000, maxPrice: 1000000 },
  { title: "Trên 1 triệu", minPrice: 1000000, maxPrice: 999999999 },
];
const sorts = [
  { title: "Giá tăng dần", sortBy: "price", sortType: "asc" },
  { title: "Giá giảm dần", sortBy: "price", sortType: "desc" },
  { title: "Tên (A -> Z)", sortBy: "hotelName", sortType: "asc" },
  { title: "Tên (Z -> A)", sortBy: "hotelName", sortType: "desc" },
];
const locations = LocationData;
const HotelSearchBox = (props) => {
  const [searchData, setSearchData] = useState({
    price: 0,
    sort: 0,
  });

  const handleSearch = () => {};

  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <div className="flex gap-1">
        <img
          className="h-10 my-auto"
          src="/src/assets/img/general/logo-dark.svg"
          alt="Company name"
        />
        <span className="my-auto font-bold">
          Đặt phòng khách sạn trực tuyến giá rẻ
        </span>
      </div>
      <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tên khách sạn
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Nhập tên khách sạn"
              value={props.searchData.hotelName}
              onChange={(e) =>
                props.setSearchData({
                  ...props.searchData,
                  hotelName: e.target.value,
                  page: 1,
                })
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Địa điểm(Tỉnh/Thành phố)
          </label>
          <div className="mt-1">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={props.searchData.locationId}
              onChange={(e) =>
                props.setSearchData({
                  ...props.searchData,
                  locationId: e.target.value,
                  page: 1,
                })
              }
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mức giá
          </label>
          <div className="mt-1">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={searchData.price}
              onChange={(e) => {
                setSearchData({
                  ...searchData,
                  price: e.target.value,
                  page: 1,
                });
                props.setSearchData({
                  ...props.searchData,
                  minPrice: minMaxPrices[e.target.value].minPrice,
                  maxPrice: minMaxPrices[e.target.value].maxPrice,
                });
              }}
            >
              {minMaxPrices.map((price, index) => (
                <option key={index} value={index}>
                  {price.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sắp xếp
          </label>
          <div className="mt-1">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={searchData.sort}
              onChange={(e) => {
                setSearchData({
                  ...searchData,
                  sort: e.target.value,
                  page: 1,
                });
                props.setSearchData({
                  ...props.searchData,
                  sortBy: sorts[e.target.value].sortBy,
                  sortType: sorts[e.target.value].sortType,
                });
              }}
            >
              {sorts.map((item, index) => (
                <option key={index} value={index}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex mt-3">
        <button
          className="ml-auto mt-auto mb-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          onClick={handleSearch}
        >
          <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default HotelSearchBox;
