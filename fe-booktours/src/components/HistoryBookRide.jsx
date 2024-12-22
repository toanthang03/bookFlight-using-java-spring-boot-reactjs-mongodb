import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalProvider";
import { Link } from "react-router-dom";
import formatDateYYYYMMDD from "../utils/format-date-yyyymmdd";

const HistoryBookRide = () => {
  const context = useContext(GlobalContext);

  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Lịch sử đặt chuyến xe đưa đón
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Thông tin các chuyến xe đưa đón đã được bạn đặt
        </p>
      </div>
      <div className="px-4 py-5 sm:px-6 flex flex-col">
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
                      Mã dịch vụ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Mã đặt
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ngày đặt
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Xem chi tiết
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {context.profile?.bookRideHistories?.map((booking, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="w-5 truncate px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link
                          to={`/booktour-detail/${booking.airportTransferId}/${booking.bookRideId}`}
                          className="hover:text-sky-500"
                        >
                          {booking.bookRideId}
                        </Link>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                        {booking.airportTransferId}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatDateYYYYMMDD(booking.bookingDate)}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          to={`/bookride-detail/${booking.airportTransferId}/${booking.bookRideId}`}
                          className="hover:text-sky-500"
                        >
                          Xem chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBookRide;
