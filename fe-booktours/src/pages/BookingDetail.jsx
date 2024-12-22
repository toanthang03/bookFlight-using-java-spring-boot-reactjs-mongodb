import React, { useEffect, useState } from "react";
import Step from "../components/Step";
import { useParams } from "react-router-dom";
import TourService from "../services/TourService";
import TourCard2 from "../components/TourCard2";
import formatPrice from "../utils/format-price";
import formatDateYYYYMMDD from "../utils/format-date-yyyymmdd";

const BookingDetail = () => {
  const { tourId, bookingCode } = useParams();

  const [tour, setTour] = useState({});
  const [bookTour, setBookTour] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBookTour = async () => {
      try {
        const response = await TourService.getBookTour(tourId, bookingCode);
        // console.log(response);
        if (response.status === 200) {
          setBookTour(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchTour = async () => {
      try {
        const response = await TourService.getTourById(tourId);
        // console.log(response);
        if (response.status === 200) {
          setTour(response.data);
          document.title = `Chi tiết đặt tour: ${response.data?.tourName}`;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookTour();
    fetchTour();
  }, []);
  return (
    <main className="my-7 bg-white max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <Step currentStep={3} />
        <h1 className="sr-only">Checkout</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Chi tiết đặt tour
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Thông tin chi tiết đặt tour
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Người đặt</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookTour?.booker?.fullName}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ngày đặt</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDateYYYYMMDD(bookTour?.bookingDate)}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Khởi hành</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDateYYYYMMDD(bookTour?.departureDate)}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Số hành khách
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookTour?.adultNumber} người lớn
                  {bookTour?.childrenNumber > 0 &&
                    `, ${bookTour?.childrenNumber} trẻ em`}
                  {bookTour?.youngChildrenNumber > 0 &&
                    `, ${bookTour?.youngChildrenNumber} trẻ nhỏ`}
                  {bookTour?.baby > 0 && `, ${bookTour?.baby} em bé`}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Dịch vụ đã chọn
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookTour?.tourServices?.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {bookTour?.tourServices?.map((service) => (
                        <li key={service.serviceId}>{service.serviceName}</li>
                      ))}
                    </ul>
                  ) : (
                    "Không có dịch vụ nào"
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tổng tiền</dt>
                <dd className="mt-1 text-2xl font-extrabold text-red-600 sm:mt-0 sm:col-span-2">
                  {formatPrice(bookTour?.totalPrice)}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email liên hệ
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookTour?.emailBooking}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Số điện thoại
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookTour?.booker?.phone}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Địa chỉ liên hệ
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookTour?.booker?.address}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ghi chú</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookTour?.note?.length > 0
                    ? bookTour?.note
                    : "Không có ghi chú"}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Tình trạng xác nhận
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookTour?.confirmed ? "Đã xác nhận" : "Chưa xác nhận"}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Thông tin tour
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <TourCard2 tour={tour} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingDetail;
