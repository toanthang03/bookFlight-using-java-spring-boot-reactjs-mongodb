import React, { useEffect, useState } from "react";
import FlightService from "../../services/FlightService";
import { Link } from "react-router-dom";
import {
    CashIcon,
    ChevronRightIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  UserIcon,
} from "@heroicons/react/outline";
import formatPrice from "../../utils/format-price";

const FlightReport = () => {
  const [revenueOfAirline, setRevenueOfAirline] = useState([]);
  const [top5FlightMostBooked, setTop5FlightMostBooked] = useState([]);
  const [percentCanceledFlight, setPercentCanceledFlight] = useState({});
  const [revenueByDays, setRevenueByDays] = useState(0.0);
  const [countBookedTicketByDays, setCountBookedTicketByDays] = useState(0);
  const [mostUserBookedTicket, setMostUserBookedTicket] = useState({});

  useEffect(() => {
    document.title = "Báo cáo chuyến bay";
    const fetchData = async () => {
      // revenueOfAirline
      try {
        // revenueOfAirline
        const response = await FlightService.getRevenueByAirline();
        // console.log(response.data);
        setRevenueOfAirline(response.data);

        // top5FlightMostBooked
        const response2 = await FlightService.getTop5Flight();
        // console.log(response2.data);
        setTop5FlightMostBooked(response2.data);

        // percentCanceledFlight
        const response3 = await FlightService.getCancelTicketRate();
        // console.log(response3.data);
        setPercentCanceledFlight(response3.data);

        // revenueByDays
        const response4 = await FlightService.getRevenueInRecentDays(7);
        // console.log(response4.data);
        setRevenueByDays(response4.data);

        // countBookedTicketByDays
        const response5 = await FlightService.getTicketInRecentDays(7);
        // console.log(response5.data);
        setCountBookedTicketByDays(response5.data);

        // mostUserBookedTicket
        const response6 = await FlightService.getTopCustomerInRecentDays(7);
        // console.log(response6.data);
        setMostUserBookedTicket(response6.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="flex-1">
      <div className="py-6 h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 md:px-8">
          <div className="mt-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Thông số đáng chú ý trong tuần qua
              </h2>
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CurrencyDollarIcon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Doanh thu
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {formatPrice(revenueByDays)}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <Link
                        to="/admin/flight-management"
                        className="font-medium text-cyan-700 hover:text-cyan-900"
                      >
                        Xem tất cả
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ScaleIcon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Lượng đặt vé
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {countBookedTicketByDays}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <Link
                        to="/admin/flight-management"
                        className="font-medium text-cyan-700 hover:text-cyan-900"
                      >
                        Xem tất cả
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <UserIcon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Khách hàng đặt vé nhiều nhất trong tuần qua
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {mostUserBookedTicket?.name}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <Link
                        to="/admin/user-management"
                        className="font-medium text-cyan-700 hover:text-cyan-900"
                      >
                        Xem tất cả
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
              Doanh thu từ các hãng bay
            </h2>

            <div className="shadow sm:hidden">
              <ul
                role="list"
                className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
              >
                {revenueOfAirline?.map((airline, index) => (
                  <li key={index}>
                    <Link
                      to="#"
                      className="block px-4 py-4 bg-white hover:bg-gray-50"
                    >
                      <span className="flex items-center space-x-4">
                        <span className="flex-1 flex space-x-2 truncate">
                          <CashIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="flex flex-col text-gray-500 text-sm truncate">
                            <span className="truncate">{airline._id}</span>
                            <span>
                              <span className="text-gray-900 font-medium">
                                {formatPrice(airline.totalRevenue)}
                              </span>{" "}
                            </span>
                          </span>
                        </span>
                        <ChevronRightIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                aria-label="Pagination"
              >
                <div className="flex-1 flex justify-between">
                  <Link
                    to="/admin/flight-management"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                  >
                    Xem tất cả
                  </Link>
                </div>
              </nav>
            </div>
            <div className="hidden sm:block">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tên hãng
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Doanh thu
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {revenueOfAirline?.map((airline, index) => (
                          <tr key={index} className="bg-white">
                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex">
                                <Link
                                  to="#"
                                  className="group inline-flex space-x-2 truncate text-sm"
                                >
                                  <CashIcon
                                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  <p className="text-gray-500 truncate group-hover:text-gray-900">
                                    {airline._id}
                                  </p>
                                </Link>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <span>{formatPrice(airline.totalRevenue)}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    <nav
                      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                      aria-label="Pagination"
                    >
                      <div className="flex-1 flex justify-between sm:justify-end">
                        <Link
                          to="/admin/flight-management"
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Xem tất cả
                        </Link>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FlightReport;
