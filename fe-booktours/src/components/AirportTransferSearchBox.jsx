import { SearchIcon, SwitchHorizontalIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AirfieldData } from "../statics/datas/AirfieldData";
import AirportTransferService from "../services/AirportTransferService";

const airfields = AirfieldData;
const AirportTransferSearchBox = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    airfield: 0,
    address: "",
    date: new Date().toISOString().split("T")[0],
    time: "00:00",
    airfieldToAddress: false,
  });

  useEffect(() => {
    // Mỗi lần time thay đổi thì kiểm tra ngày đang chọn có phải ngày hiện tại không, nếu là ngày hiện tại thì thời gian phải lớn hơn thời gian hiện tại
    if (search.date === new Date().toISOString().split("T")[0]) {
      const currentTime = new Date().toLocaleTimeString("en-GB").split(":");
      const selectedTime = search.time.split(":");
      if (
        parseInt(selectedTime[0]) < parseInt(currentTime[0]) ||
        (parseInt(selectedTime[0]) === parseInt(currentTime[0]) &&
          parseInt(selectedTime[1]) < parseInt(currentTime[1]))
      ) {
        setSearch({ ...search, time: currentTime.join(":") });
      }
    }
  }, [search.time]);

  const handleSearch = async () => {
    try {
      const response = await AirportTransferService.getAirportTransferByAirport(
        airfields[search.airfield].airfieldId,
        1,
        1
      );
      // console.log(response);
      if (response.status === 200) {
        const state = {
          ...search,
          airfieldName: airfields[search.airfield].airfieldName,
        }
        navigate(
          `/detail-airport-transfer/${response.data?.airportTransferId}`,
          { state: { state } }
        );
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("handleSearch -> error", error);
    }
  };
  return (
    <>
      <div className="grid md:grid-cols-4 gap-3 my-5">
        <div>
          <div className="mt-1">
            {search.airfieldToAddress ? (
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                value={search.airfield}
                onChange={(e) =>
                  setSearch({ ...search, airfield: e.target.value })
                }
              >
                {airfields.map((airfield, index) => (
                  <option value={index} key={index}>
                    {airfield.airfieldName}({airfield.locationName} -{" "}
                    {airfield.airfieldId})
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="Nhập địa chỉ đón/đến"
                value={search.address}
                onChange={(e) =>
                  setSearch({ ...search, address: e.target.value })
                }
              />
            )}
          </div>
        </div>
        <div>
          <div className="mt-1">
            {!search.airfieldToAddress ? (
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                value={search.airfield}
                onChange={(e) =>
                  setSearch({ ...search, airfield: e.target.value })
                }
              >
                {airfields.map((airfield, index) => (
                  <option value={index} key={index}>
                    {airfield.airfieldName}({airfield.locationName} -{" "}
                    {airfield.airfieldId})
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="Nhập địa chỉ đón/đến"
                value={search.address}
                onChange={(e) =>
                  setSearch({ ...search, address: e.target.value })
                }
              />
            )}
          </div>
        </div>
        <div>
          <div className="mt-1">
            <input
              type="date"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Nhập địa chỉ đón/đến"
              value={search.date}
              // Không thể chọn ngày trước ngày hiện tại
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSearch({ ...search, date: e.target.value })}
            />
          </div>
        </div>
        <div>
          <div className="mt-1">
            <input
              type="time"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Nhập địa chỉ đón/đến"
              value={search.time}
              // Chỉ chọn số phút là bội của 5
              onChange={(e) => setSearch({ ...search, time: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="grid md:flex gap-3">
        <button
          className="h-full w-full mt-auto mb-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          onClick={handleSearch}
        >
          <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Tìm kiếm
        </button>
        <button
          className="h-full w-full mt-auto mb-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          onClick={() =>
            setSearch({
              ...search,
              airfieldToAddress: !search.airfieldToAddress,
            })
          }
        >
          <SwitchHorizontalIcon
            className="-ml-1 mr-3 h-5 w-5"
            aria-hidden="true"
          />
          Đổi chiều(
          {search.airfieldToAddress
            ? "Sân bay -> Địa chỉ"
            : "Địa chỉ -> Sân bay"}
          )
        </button>
      </div>
    </>
  );
};

export default AirportTransferSearchBox;
