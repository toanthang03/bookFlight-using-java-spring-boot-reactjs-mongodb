import React, { useEffect, useState } from "react";
import AirportTransferService from "../../services/AirportTransferService";
import { Link } from "react-router-dom";
import {
  DatabaseIcon,
  EyeIcon,
  PencilAltIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import DataService from "../../services/DataService";
import formatPrice from "../../utils/format-price";

const AirportTransferManager = () => {
  const [airportTransfers, setAirportTransfers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Quản lý dịch vụ đưa đón sân bay";
  }, []);

  useEffect(() => {
    const fetchAirportTransfers = async () => {
      try {
        const response = await AirportTransferService.getAirportTransfers();
        // console.log(response);
        const filteredAirportTransfers = response.data?.filter(
          (airportTransfer) => {
            return airportTransfer.airfield?.airfieldName
              .toLowerCase()
              .includes(search.toLowerCase());
          }
        );
        setAirportTransfers(filteredAirportTransfers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAirportTransfers();
  }, [search]);

  return (
    <main className="flex-1">
      <div className="py-6 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Thông tin các sân bay hỗ trợ đưa đón khách hàng
          </h1>
          <p className="text-gray-500 italic">
            Xem các sân bay hỗ trợ đưa đón khách hàng, số lượng phương tiện hỗ
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4">
            {/* border-2 border-dashed border-gray-200 */}
            <div className="rounded-lg">
              {/* Filter */}
              <div className="mt-5 gap-5 md:flex">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex">
                    <input
                      type="text"
                      className="my-auto appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      placeholder="Tìm kiếm sân bay"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex">
                    <button
                      className="w-full inline-flex items-center px-3 py-2 md:py-1 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={() => setSearch("")}
                    >
                      <RefreshIcon
                        className="-ml-1 mr-3 h-5 w-5"
                        aria-hidden="true"
                      />
                      Làm mới
                    </button>
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
                              Id
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Sân bay
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Số phương tiện hỗ trợ
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Lượng đặt
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Doanh thu
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
                          {airportTransfers?.map((airportTransfer, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {airportTransfer.airportTransferId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {airportTransfer.airfield?.airfieldName}
                                {airportTransfer.bookRides?.filter(
                                        (bookRide) =>
                                          bookRide.confirmed === false
                                      ).length > 0 && (
                                <p className="text-red-500 text-sm">
                                  <span>
                                    (
                                    {
                                      airportTransfer.bookRides?.filter(
                                        (bookRide) =>
                                          bookRide.confirmed === false
                                      ).length
                                    }{" "}
                                    lượt đặt chưa xác nhận)
                                  </span>
                                </p>
                              )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {airportTransfer.vehicles?.length}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {airportTransfer.bookRides?.length}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatPrice(
                                  airportTransfer.bookRides?.reduce(
                                    (total, bookRide) =>
                                      total + bookRide.totalCost,
                                    0
                                  )
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {airportTransfer.active
                                  ? "Đang hoạt động"
                                  : "Ngưng hoạt động"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Link
                                  to={`/admin/airport-transfer-edit/${airportTransfer.airportTransferId}`}
                                  className="text-sky-500 hover:text-sky-700"
                                >
                                  <PencilAltIcon className="h-6 w-6" />
                                </Link>
                                <Link
                                  to={`/admin/book-ride/${airportTransfer.airportTransferId}`}
                                  className="text-teal-500 hover:text-teal-700"
                                >
                                  <EyeIcon className="h-6 w-6" />
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {airportTransfers?.length === 0 && (
                        <div className="text-center py-4 text-gray-500 h-52">
                          Không có dữ liệu
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  );
};

export default AirportTransferManager;
