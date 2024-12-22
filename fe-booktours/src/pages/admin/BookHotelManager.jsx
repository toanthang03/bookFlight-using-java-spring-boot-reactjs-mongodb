import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HotelService from "../../services/HotelService";

const BookHotelManager = () => {
  const { hotelCode } = useParams();

  const [hotelBookings, setHotelBookings] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    document.title = "Quản lý đặt phòng khách sạn";
  }, []);

  useEffect(() => {
    const fetchHotelBookings = async () => {
      try {
        const response = await HotelService.getBookingByDate(hotelCode, date);
        // console.log(response.data);
        setHotelBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotelBookings();
  }, [date]);

  const handleConfirm = async (bookingCode) => {
    try {
      const response = await HotelService.confirmBooking(
        hotelCode,
        bookingCode
      );
      setHotelBookings((prev) =>
        prev.map((booking) =>
          booking.bookingCode === bookingCode
            ? { ...booking, confirmed: true }
            : booking
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div>
    //   <input
    //     type="date"
    //     value={date}
    //     onChange={(e) => setDate(e.target.value)}
    //   />
    // </div>
    <main className="flex-1">
      <div className="py-6 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Thông tin đặt khách sạn
          </h1>
          <p className="text-gray-500 italic">
            Xem các thông tin đặt phòng của khách sạn
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4">
            {/* border-2 border-dashed border-gray-200 */}
            <div className="rounded-lg">
              {/* Filter */}
              <div className="mt-5 md:gap-5 md:flex">
                <div className="md:w-1/3 md:ml-auto">
                  <div>
                    <input
                      type="date"
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      placeholder="Nhập mã vé và tìm kiếm"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
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
                              Loại phòng
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Số phòng
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Nhận phòng
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Trả phòng
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Tổng tiền
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Thanh toán
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Xác nhận
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {hotelBookings
                            ?.sort((a, b) => {
                              if (a.confirmed === b.confirmed) {
                                return 0;
                              }
                              return a.confirmed ? -1 : 1;
                            })
                            .map((booking, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {booking.bookingCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {booking.bookingDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {booking.roomTypeId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {booking.numberOfRooms}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {booking.checkInDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {booking.checkOutDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {booking.totalPrice}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {booking.payment
                                    ? "Đã thanh toán"
                                    : "Chưa thanh toán"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <input
                                    type="checkbox"
                                    className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                                    checked={booking.confirmed}
                                    disabled={booking.confirmed}
                                    onChange={() =>
                                      handleConfirm(booking.bookingCode)
                                    }
                                  />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {hotelBookings?.length === 0 && (
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

export default BookHotelManager;
