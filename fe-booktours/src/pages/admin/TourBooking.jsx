import React, { useEffect, useState } from "react";
import Pagination from "../../components/admin/Pagination";
import { Link, useParams } from "react-router-dom";
import TourService from "../../services/TourService";
import formatDateYYYYMMDD from "../../utils/format-date-yyyymmdd";
import formatPrice from "../../utils/format-price";
import { CSVLink } from "react-csv";
import { TableIcon } from "@heroicons/react/outline";

const TourBooking = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState({});
  const [bookTours, setBookTours] = useState([]);
  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tourStatus, setTourStatus] = useState("Đã xác nhận");

  useEffect(() => {
    document.title = "Danh sách đặt tour";
    window.scrollTo(0, 0);

    const fetchTour = async () => {
      try {
        const response = await TourService.getTourById(tourId);
        if (response.status === 200) {
          setTour(response.data);
          document.title = `Danh sách đặt tour - ${response.data?.tourName}`;
          setBookTours(response.data?.bookTours);
          setDepartureDate(response.data?.departureDates[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTour();
  }, [tourId]);

  useEffect(() => {
    const filterBookTours = tour.bookTours?.filter(
      (bookTour) =>
        bookTour.departureDate === departureDate &&
        bookTour.confirmed === (tourStatus === "Đã xác nhận" ? true : false)
    );
    setBookTours(filterBookTours);
  }, [departureDate, tourStatus]);

  return (
    <main className="flex-1">
      <div className="py-6 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Thông tin đặt tour
          </h1>
          <p className="text-gray-500 italic">
            Xem các thông tin đặt tour từ khách hàng
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4">
            {/* border-2 border-dashed border-gray-200 */}
            <div className="rounded-lg">
              {/* Filter */}
              <div className="mt-5 gap-5 md:flex">
                <div className="md:mb-0 mb-3 flex gap-3">
                  {bookTours?.length > 0 && (
                    <CSVLink
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      data={bookTours?.map((bookTour) => ({
                        "Số booking": bookTour.bookingCode,
                        "Ngày đặt": formatDateYYYYMMDD(bookTour.bookingDate),
                        "Email đặt": bookTour.emailBooking,
                        "Ngày khởi hành": formatDateYYYYMMDD(
                          bookTour.departureDate
                        ),
                        "Số hành khách":
                          bookTour.adultNumber +
                          bookTour.childrenNumber +
                          bookTour.youngChildrenNumber +
                          bookTour.babyNumber,
                        "Tổng tiền": formatPrice(bookTour.totalPrice),
                      }))}
                      filename="danh-sach-dat-tour.csv"
                    >
                      <TableIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Xuất danh sách(CSV)
                    </CSVLink>
                  )}
                </div>
                <div className="ml-auto grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky500 focus:border-ssky00 sm:text-sm rounded-md"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    >
                      {tour.departureDates?.sort().map((date, index) => (
                        <option key={index} value={date}>
                          {formatDateYYYYMMDD(date)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky500 focus:border-ssky00 sm:text-sm rounded-md"
                      value={tourStatus}
                      onChange={(e) => setTourStatus(e.target.value)}
                    >
                      <option value="Đã xác nhận">Đã xác nhận</option>
                      <option value="Chưa xác nhận">Chưa xác nhận</option>
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
                              Số booking
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Ngày đặt
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Email đặt
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Ngày khởi hành
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Số hành khách
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Tổng tiền
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Xác nhận
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookTours?.map((bookTour, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {bookTour.bookingCode}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDateYYYYMMDD(bookTour.bookingDate)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {bookTour.emailBooking}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDateYYYYMMDD(bookTour.departureDate)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {bookTour.adultNumber +
                                  bookTour.childrenNumber +
                                  bookTour.youngChildrenNumber +
                                  bookTour.babyNumber}{" "}
                                người
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatPrice(bookTour.totalPrice)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <select
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                  value={
                                    bookTour?.confirmed
                                      ? "Đã xác nhận"
                                      : "Chưa xác nhận"
                                  }
                                  onChange={async (e) => {
                                    if (e.target.value === "Đã xác nhận") {
                                      const response =
                                        await TourService.confirmBookTour(
                                          tourId,
                                          bookTour.bookingCode
                                        );
                                      if (response.status === 200) {
                                        // Xóa bookTour đã xác nhận khỏi danh sách
                                        const newBookTours = bookTours.filter(
                                          (item) =>
                                            item.bookingCode !==
                                            bookTour.bookingCode
                                        );
                                      }
                                    }
                                    // cập nhật lại trạng thái
                                  }}
                                >
                                  <option value="Đã xác nhận">
                                    Đã xác nhận
                                  </option>
                                  <option value="Chưa xác nhận">
                                    Chưa xác nhận
                                  </option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {bookTours?.length === 0 && (
                        <div className="text-center py-4 text-gray-500 h-52">
                          Không có dữ liệu
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Pagination />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  );
};

export default TourBooking;
