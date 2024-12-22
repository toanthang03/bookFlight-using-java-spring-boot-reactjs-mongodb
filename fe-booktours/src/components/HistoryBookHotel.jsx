import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalProvider";
import { Link } from "react-router-dom";
import formatDateYYYYMMDD from "../utils/format-date-yyyymmdd";
import HotelService from "../services/HotelService";

const HistoryBookHotel = () => {
  const context = useContext(GlobalContext);

  const handleCancelBooking = async (hotelCode, bookingCode) => {
    try {
      const response = await HotelService.cancelBookHotel(
        hotelCode,
        bookingCode
      );
      if (response.status === 200) {
        alert("Hủy đặt phòng thành công");
      } else {
        alert("Hủy đặt phòng thất bại, " + response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Lịch sử đặt khách sạn
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Thông tin các bookHotel của bạn
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
                      Mã khách sạn
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
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {context.profile?.hotelBookingHistories?.map(
                    (booking, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="w-5 truncate px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link
                            to={`/book-hotel-detail/${booking.hotelCode}/${booking.bookingCode}`}
                            className="hover:text-sky-500"
                          >
                            {booking.bookingCode}
                          </Link>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          {booking.hotelCode}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          {formatDateYYYYMMDD(booking.bookingDate)}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          <Link
                            to={`/book-hotel-detail/${booking.hotelCode}/${booking.bookingCode}`}
                            className="hover:text-sky-500"
                          >
                            Xem chi tiết
                          </Link>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          <p
                            className="hover:text-red-500 cursor-pointer"
                            onClick={() =>
                              handleCancelBooking(booking.hotelCode, booking.bookingCode)
                            }
                          >
                            Hủy đặt
                          </p>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBookHotel;
