import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlightService from "../services/FlightService";
import formatPrice from "../utils/format-price";
import HotelService from "../services/HotelService";
import formatDateYYYYMMDD from "../utils/format-date-yyyymmdd";

const BookHotelDetail = () => {
  const { hotelCode, bookingCode } = useParams();

  const [booking, setBooking] = useState({});
  useEffect(() => {
    document.title = "Chi tiết vé máy bay";
    const fetchTicket = async () => {
      try {
        const response = await HotelService.getBookingHotel(
          hotelCode,
          bookingCode
        );
        // console.log(response.data);

        setBooking(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTicket();
  }, []);

  return (
    <main className="my-7 bg-white max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Chi tiết đơn đặt khách sạn
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Thông tin chi tiết đơn đặt khách sạn
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Mã khách sạn
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {hotelCode}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Mã đơn đặt
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {booking?.bookingCode}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ngày đặt</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDateYYYYMMDD(booking?.bookingDate)}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Loại phòng
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {booking?.roomTypeId}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Số phòng đặt
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {booking?.numberOfRooms} phòng
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Ngày nhận phòng
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {booking?.checkInDate}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Ngày trả phòng
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {booking?.checkOutDate}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tổng tiền</dt>
                <dd className="mt-1 text-2xl font-extrabold text-red-600 sm:mt-0 sm:col-span-2">
                  {formatPrice(booking?.totalPrice)}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tình trạng xác nhận</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {booking?.confirmed ? "Đã xác nhận" : "Chưa xác nhận"}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Thanh toán
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {booking?.payment ? "Đã thanh toán" : "Chưa thanh toán"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookHotelDetail;
