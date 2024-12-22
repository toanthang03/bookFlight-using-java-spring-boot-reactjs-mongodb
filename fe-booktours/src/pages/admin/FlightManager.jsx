import React, { useEffect, useRef, useState } from "react";
import FlightService from "../../services/FlightService";
import DataService from "../../services/DataService";
import {
  DatabaseIcon,
  EyeIcon,
  PencilAltIcon,
  PlayIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import formatPrice from "../../utils/format-price";
import { Link } from "react-router-dom";
import { AirfieldData } from "../../statics/datas/AirfieldData";
import { AirlineData } from "../../statics/datas/AirlineData";
import FlightCreate from "../../components/admin/FlightCreate";
import Pagination from "../../components/admin/Pagination";

const airFields = AirfieldData; // 2 input(select)
const airLines = AirlineData; // 1 input(select)
const FlightManager = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [flights, setFlights] = useState([]);
  const [searchData, setSearchData] = useState({
    departure: "",
    destination: "",
    airline: "",
    departureDate: "2024-01-01",
    minPrice: 0,
    maxPrice: 999999999,
    cancelable: "",
    active: "",
    sortBy: "price",
    sortType: "asc",
    page: 1,
    limit: 5,
  });

  useEffect(() => {
    document.title = "Quản lý chuyến bay";
  }, []);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await FlightService.getFlights(searchData);
        // console.log(response.data);
        setFlights(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlights();
  }, [searchData]);

  return (
    <>
      <FlightCreate
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
      <main className="flex-1">
        <div className="py-6 h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Thông tin các chuyến bay
            </h1>
            <p className="text-gray-500 italic">
              Xem các chuyến bay, thêm chuyến bay mới, cập nhật thông tin
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="py-4">
              {/* border-2 border-dashed border-gray-200 */}
              <div className="rounded-lg">
                {/* Filter */}
                <div className="mt-5 md:gap-5 md:flex">
                  <div className="md:mb-0 mb-3 flex gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={() => setOpen(true)}
                    >
                      <PlusIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Thêm chuyến bay
                    </button>
                  </div>
                  <div className="md:w-2/3 md:ml-auto grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        value={searchData.departure}
                        onChange={(e) => {
                          if (e.target.value === searchData.destination) {
                            setSearchData({
                              ...searchData,
                              departure: searchData.destination,
                              destination: searchData.departure,
                            });
                          } else {
                            setSearchData({
                              ...searchData,
                              departure: e.target.value,
                            });
                          }
                        }}
                      >
                        <option value="">Sân bay xuất phát</option>
                        {airFields.map((item, index) => (
                          <option key={index} value={item.airfieldId}>
                            {item.airfieldName} - {item.locationName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        value={searchData.destination}
                        onChange={(e) => {
                          {
                            if (e.target.value === searchData.departure) {
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
                        }}
                      >
                        <option value="">Sân bay đến</option>
                        {airFields.map((item, index) => (
                          <option key={index} value={item.airfieldId}>
                            {item.airfieldName} - {item.locationName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        value={searchData.airline}
                        onChange={(e) =>
                          setSearchData({
                            ...searchData,
                            airline: e.target.value,
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
                </div>
                <div className="mt-5 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Mã chuyến bay
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Điểm đi
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Điểm đến
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Hãng hàng không
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Giá vé thường
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Giá vé VIP
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Trạng thái
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              ></th>
                            </tr>
                          </thead>
                          <tbody>
                            {flights?.map((flight, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {flight.flightCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {flight.departure?.locationName}
                                  {flight.tickets?.filter(
                                    (ticket) => ticket.confirmed === false
                                  ).length > 0 && (
                                    <p className="text-red-500 text-sm">
                                      (
                                      {
                                        flight.tickets?.filter(
                                          (ticket) => ticket.confirmed === false
                                        ).length
                                      }{" "}
                                      lượt đặt chưa xác nhận)
                                    </p>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {flight.destination?.locationName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {flight.airline?.airlineName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatPrice(flight.normalPrice)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatPrice(flight.vipPrice)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {flight.active
                                    ? "Hoạt động"
                                    : "Ngưng hoạt động"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <Link
                                    to={`/admin/flight-update/${flight.flightCode}`}
                                    className="text-sky-500 hover:text-sky-700"
                                  >
                                    <PencilAltIcon className="h-6 w-6" />
                                  </Link>
                                  <Link
                                    to={`/admin/flight-booking-management/${flight.flightCode}`}
                                    className="text-teal-500 hover:text-teal-700"
                                  >
                                    <EyeIcon className="h-6 w-6" />
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {flights?.length === 0 && (
                          <div className="text-center py-4 text-gray-500 h-52">
                            Không có dữ liệu
                          </div>
                        )}
                      </div>
                      <Pagination
                        page={searchData.page}
                        limit={searchData.limit}
                        onNext={() => {
                          if (flights?.length === searchData.limit) {
                            setSearchData({
                              ...searchData,
                              page: searchData.page + 1,
                            });
                          }
                        }}
                        onPrevious={() => {
                          if (searchData.page > 1) {
                            setSearchData({
                              ...searchData,
                              page: searchData.page - 1,
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default FlightManager;
