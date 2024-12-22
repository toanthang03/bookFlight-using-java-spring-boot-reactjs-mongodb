import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AirportTransferService from "../services/AirportTransferService";
import formatDateYYYYMMDD from "../utils/format-date-yyyymmdd";
import formatPrice from "../utils/format-price";

const DetailBookRide = () => {
  const { airportTransferId, bookRideId } = useParams();
  const [bookRide, setBookRide] = useState({});

  useEffect(() => {
    const fetchBookRide = async () => {
      try {
        const response = await AirportTransferService.getBookRideById(
          airportTransferId,
          bookRideId
        );
        // console.log(response.data);
        if (response.status === 200) {
          setBookRide(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookRide();
  }, []);
  return (
    <main className="my-7 bg-white max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Chi tiết đặt dịch vụ đưa đón sân bay
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Thông tin chi tiết đặt dịch vụ đưa đón sân bay
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Mã đặt</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookRide?.bookRideId}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ngày đặt</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDateYYYYMMDD(bookRide?.bookingDate)}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Thời gian đón
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookRide?.pickUpDate}({bookRide?.pickUpTime})
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Địa chỉ đón/điểm đến
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookRide?.address}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Mã phương tiện
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookRide?.vehicleId}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Số phương tiện
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookRide?.quantityVehicle}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tổng tiền</dt>
                <dd className="mt-1 text-2xl font-extrabold text-red-600 sm:mt-0 sm:col-span-2">
                  {formatPrice(bookRide?.totalCost)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailBookRide;
