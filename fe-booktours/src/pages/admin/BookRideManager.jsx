import React, { useEffect, useState } from "react";
import AirportTransferService from "../../services/AirportTransferService";
import { useParams } from "react-router-dom";
import formatPrice from "../../utils/format-price";
import { RefreshIcon, SaveIcon } from "@heroicons/react/outline";

const BookRideManager = () => {
  const { airportTransferId } = useParams();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isChanged, setIsChanged] = useState(false);
  const [bookRides, setBookRides] = useState([]);
  const [airportTransfer, setAirportTransfer] = useState({});

  useEffect(() => {
    document.title = "Quản lý đặt dịch vụ đưa đón sân bay";
    const fetchBookRides = async () => {
      try {
        const response = await AirportTransferService.getAirportTransferById(
          airportTransferId,
          1,
          1
        );
        // console.log(response.data);
        setAirportTransfer(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookRides();
  }, []);

  const handleChange = async () => {
    // console.log(airportTransfer);

    try {
      const response = await AirportTransferService.updateAirportTransfer(
        airportTransfer
      );
      // console.log(response);
      if (response?.status === 200) {
        alert("Cập nhật thành công");
        setIsChanged(false);
      } else {
        alert("Có lỗi xảy ra(" + response?.message + ")");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex-1">
      <div className="py-6 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Thông tin đặt dịch vụ đưa đón sân bay
          </h1>
          <p className="text-gray-500 italic">
            Xem các thông tin chi tiết của khách hàng đặt dịch vụ đưa đón sân
            bay tại{" "}
            <span className="font-bold">
              {airportTransfer?.airfield?.airfieldName}
            </span>
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4">
            {/* border-2 border-dashed border-gray-200 */}
            <div className="rounded-lg">
              {/* Filter */}
              <div className="mt-5 gap-5 md:flex">
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="my-auto appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="Tìm kiếm sân bay"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  {isChanged && (
                    <button
                      type="button"
                      className="my-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      onClick={handleChange}
                    >
                      <SaveIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Lưu
                    </button>
                  )}
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
                              Địa chỉ
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Chiều đón
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Thời gian đón
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Phương tiện
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Số điện thoại
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
                              Xác nhận
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {airportTransfer?.bookRides
                            ?.filter(
                              (bookRide) => bookRide.pickUpDate === selectedDate
                            )
                            .map((bookRide, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {bookRide.bookRideId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {bookRide.address}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {bookRide.airfieldToAddress
                                    ? "Sân bay -> địa chỉ"
                                    : "Địa chỉ -> sân bay"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {bookRide.pickUpDate}({bookRide.pickUpTime})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {bookRide.vehicleId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {bookRide.bookerPhone}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatPrice(bookRide.totalCost)}
                                  <p>
                                    (
                                    {bookRide.payment
                                      ? bookRide.payment
                                          ?.confirmationPaymentCode
                                      : "Chưa thanh toán"}
                                    )
                                  </p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <input
                                    type="checkbox"
                                    className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                                    checked={bookRide.confirmed}
                                    onChange={(e) => {
                                      setAirportTransfer({
                                        ...airportTransfer,
                                        bookRides:
                                          airportTransfer.bookRides.map(
                                            (item) =>
                                              item.bookRideId ===
                                              bookRide.bookRideId
                                                ? {
                                                    ...item,
                                                    confirmed: e.target.checked,
                                                  }
                                                : item
                                          ),
                                      });
                                      setIsChanged(true);
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {airportTransfer?.bookRides?.filter(
                        (bookRide) => bookRide.pickUpDate === selectedDate
                      ).length < 1 && (
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

export default BookRideManager;
