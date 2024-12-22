import React, { useEffect, useState } from "react";
import { AirfieldData } from "../statics/datas/AirfieldData";
import { AirlineData } from "../statics/datas/AirlineData";

const airFields = AirfieldData; // 2 input(select)
const airLines = AirlineData; // 1 input(select)
const minMaxPrices = [
  { title: "Dưới 1 triệu", minPrice: 0, maxPrice: 1000000 },
  { title: "1 triệu - 3 triệu", minPrice: 1000000, maxPrice: 3000000 },
  { title: "3 triệu - 7 triệu", minPrice: 3000000, maxPrice: 7000000 },
  { title: "7 triệu - 12 triệu", minPrice: 7000000, maxPrice: 12000000 },
  { title: "Trên 12 triệu", minPrice: 12000000, maxPrice: 999999999 },
]; // 1 input(select)
const sorts = [
  { title: "Giá tăng dần", sortBy: "price", sortType: "asc" },
  { title: "Giá giảm dần", sortBy: "price", sortType: "desc" },
  // { title: "Thời gian bay tăng dần", sortBy: "duration", sortType: "asc" },
  // { title: "Thời gian bay giảm dần", sortBy: "duration", sortType: "desc" },
]; // 1 input(select)
const FlightSearchBox2 = (props) => {
  const [minMaxPriceSelected, setMinMaxPriceSelected] = useState(0);
  const [sortSelected, setSortSelected] = useState(0);

  useEffect(() => {
    props.setSearchData({
      ...props.searchData,
      minPrice: minMaxPrices[minMaxPriceSelected].minPrice,
      maxPrice: minMaxPrices[minMaxPriceSelected].maxPrice,
    });
  }, [minMaxPriceSelected]);

  useEffect(() => {
    props.setSearchData({
      ...props.searchData,
      sortBy: sorts[sortSelected].sortBy,
      sortType: sorts[sortSelected].sortType,
    });
  }, [sortSelected]);

  return (
    <div className="mt-4 p-5 bg-white rounded-lg border border-solid shadow-sm">
      <h1 className="text-center font-semibold text-2xl uppercase text-sky-700">
        Tìm chuyến bay phù hợp với yêu cầu của bạn
      </h1>
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <label htmlFor="comment" className="sr-only">
            Điểm đi
          </label>
          <div className="mt-1">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={props.searchData.departure}
              onChange={(e) => {
                if (e.target.value === props.searchData.destination) {
                  props.setSearchData({
                    ...props.searchData,
                    departure: props.searchData.destination,
                    destination: props.searchData.departure,
                    page: 1,
                  });
                } else {
                  props.setSearchData({
                    ...props.searchData,
                    departure: e.target.value,
                    page: 1,
                  });
                }
              }}
            >
              <option value="">Tất cả điểm đi</option>
              {airFields.map((item, index) => (
                <option key={index} value={item.airfieldId}>
                  {item.airfieldName} - {item.locationName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="sr-only">
            Điểm đến
          </label>
          <div className="mt-1">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={props.searchData.destination}
              onChange={(e) => {
                {
                  if (e.target.value === props.searchData.departure) {
                    props.setSearchData({
                      ...props.searchData,
                      destination: props.searchData.departure,
                      departure: props.searchData.destination,
                      page: 1,
                    });
                  } else {
                    props.setSearchData({
                      ...props.searchData,
                      destination: e.target.value,
                      page: 1,
                    });
                  }
                }
              }}
            >
              <option value="">Tất cả điểm đến</option>
              {airFields.map((item, index) => (
                <option key={index} value={item.airfieldId}>
                  {item.airfieldName} - {item.locationName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="sr-only">
            Hãng bay
          </label>
          <div className="mt-1">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={props.searchData.airline}
              onChange={(e) =>
                props.setSearchData({
                  ...props.searchData,
                  airline: e.target.value,
                  page: 1,
                })
              }
            >
              <option value="">Tất cả hãng bay</option>
              {airLines.map((item, index) => (
                <option key={index} value={item.airlineId}>
                  {item.airlineName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="sr-only">
            Ngày bay
          </label>
          <div className="mt-1">
            <input
              type="date"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              min={new Date().toISOString().split("T")[0]}
              value={props.searchData.departureDate}
              onChange={(e) =>
                props.setSearchData({
                  ...props.searchData,
                  departureDate: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="sr-only">
            Mức giá
          </label>
          <div className="mt-1">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={minMaxPriceSelected}
              onChange={(e) => setMinMaxPriceSelected(parseInt(e.target.value))}
            >
              {minMaxPrices.map((item, index) => (
                <option key={index} value={index}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="sr-only">
            Sắp xếp theo
          </label>
          <div className="mt-1">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={sortSelected}
              onChange={(e) => setSortSelected(parseInt(e.target.value))}
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
    </div>
  );
};

export default FlightSearchBox2;
