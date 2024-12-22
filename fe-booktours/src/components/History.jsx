import React, { useContext, useEffect, useState } from "react";
import {
  Switch,
  SwitchDescription,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/react";
import { GlobalContext } from "../contexts/GlobalProvider";
import formatDateYYYYMMDD from "../utils/format-date-yyyymmdd";
import { Link } from "react-router-dom";
import TourService from "../services/TourService";

const History = () => {
  const context = useContext(GlobalContext);

  useEffect(() => {
    document.title = "Lịch sử đặt tour";
  }, []);

  const handleCancelTour = async (tourId, bookingCode) => {
    try {
      const response = await TourService.cancelBookTour(tourId, bookingCode);
      alert(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Lịch sử đặt tour
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Thông tin các bookTour của bạn
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
                      Mã đặt tour
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Mã tour
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {context.profile?.bookingHistories?.map((booking, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="w-5 truncate px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link
                          to={`/booktour-detail/${booking.tourId}/${booking.bookingCode}`}
                          className="hover:text-sky-500"
                        >
                          {booking.bookingCode}
                        </Link>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                        {booking.tourId}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatDateYYYYMMDD(booking.bookingDate)}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <p
                          className="cursor-pointer text-sky-600 hover:text-sky-900"
                          onClick={() =>
                            handleCancelTour(
                              booking.tourId,
                              booking.bookingCode
                            )
                          }
                        >
                          Hủy tour
                        </p>
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

export default History;
