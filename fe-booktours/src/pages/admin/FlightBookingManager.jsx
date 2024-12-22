import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SaveIcon, TableIcon } from "@heroicons/react/outline";
import formatPrice from "../../utils/format-price";
import { CSVLink } from "react-csv";
import FlightService from "../../services/FlightService";
import formatDateYYYYMMDD from "../../utils/format-date-yyyymmdd";

const FlightBookingManager = () => {
  const { flightCode } = useParams();
  const [changed, setChanged] = useState(false);
  const [flight, setFlight] = useState({});
  const [scheduleId, setScheduleId] = useState("");
  const [searchTicket, setSearchTicket] = useState("");
  const [confirmed, setConfirmed] = useState("1");

  useEffect(() => {
    document.title = "Quản lý đặt vé chuyến bay";
    const fetchFlight = async () => {
      try {
        const response = await FlightService.getFlight(flightCode);
        // console.log(response.data);
        setFlight(response.data);
        setScheduleId(response.data.schedules[0].scheduleId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlight();
  }, []);

  const handleChange = async () => {
    console.log(flight);

    try {
      const response = await FlightService.updateFlight(flightCode, flight);
      // console.log(response);

      if (response.status === 200) {
        alert("Lưu thành công");
        setChanged(false);
      } else {
        alert(response.message);
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
            Thông tin đặt vé chuyến bay {flight?.flightName}
          </h1>
          <p className="text-gray-500 italic">
            Xem các thông tin đặt vé của chuyến bay
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4">
            {/* border-2 border-dashed border-gray-200 */}
            <div className="rounded-lg">
              {/* Filter */}
              <div className="mt-5 md:gap-5 md:flex">
                {flight?.tickets?.filter(
                  (ticket) =>
                    ticket.scheduleId === scheduleId &&
                    ticket.confirmed === true
                )?.length > 0 && (
                  <div className="md:mb-0 mb-3 flex gap-3">
                    <CSVLink
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      filename="danh-sach-dat-ve-may-bay.csv"
                      data={flight?.tickets
                        ?.filter(
                          (ticket) =>
                            ticket.scheduleId === scheduleId &&
                            ticket.confirmed === true
                        )
                        .map((ticket) => ({
                          "Mã vé": ticket.ticketId,
                          "Ngày đặt": formatDateYYYYMMDD(ticket.bookingDate),
                          "Số khách": ticket?.passengers?.length,
                          "Tổng tiền": formatPrice(ticket.totalPrice),
                          "Điện thoại": ticket.contactInfo?.phone,
                          "Trạng thái": ticket.confirmed
                            ? "Đã xác nhận"
                            : "Chưa xác nhận",
                        }))}
                    >
                      <TableIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Xuất danh sách
                    </CSVLink>
                    {changed && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        onClick={handleChange}
                      >
                        <SaveIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Lưu thay đổi
                      </button>
                    )}
                  </div>
                )}

                <div className="md:w-1/3 md:ml-auto grid md:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      placeholder="Nhập mã vé và tìm kiếm"
                      value={searchTicket}
                      onChange={(e) => setSearchTicket(e.target.value)}
                    />
                  </div>
                  <div>
                    <select
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      value={scheduleId}
                      onChange={(e) => setScheduleId(e.target.value)}
                    >
                      {flight?.schedules?.map((item, index) => (
                        <option key={index} value={item.scheduleId}>
                          {item.departureDate} - {item.departureTime}
                        </option>
                      ))}
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
                              Mã vé
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
                              Số khách
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
                              Điện thoại
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
                          {flight?.tickets
                            ?.filter(
                              (ticket) =>
                                ticket.scheduleId === scheduleId &&
                                ticket.ticketId.includes(searchTicket)
                            )
                            // Sort theo đã xác nhận trước
                            .sort((a, b) => {
                              if (a.confirmed === b.confirmed) {
                                return 0;
                              }
                              return a.confirmed ? -1 : 1;
                            })
                            .map((ticket, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {ticket.ticketId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDateYYYYMMDD(ticket.bookingDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {ticket?.passengers?.length}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatPrice(ticket.totalPrice)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {ticket.contactInfo?.phone}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <input
                                    type="checkbox"
                                    className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                                    checked={ticket.confirmed}
                                    disabled={ticket.confirmed}
                                    onChange={(e) => {
                                      setFlight({
                                        ...flight,
                                        tickets: flight.tickets?.map((item) =>
                                          item.ticketId === ticket.ticketId
                                            ? {
                                                ...item,
                                                confirmed: e.target.checked,
                                              }
                                            : item
                                        ),
                                      });
                                      setChanged(true);
                                    }}
                                  />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {flight?.tickets?.filter(
                        (ticket) => ticket.scheduleId === scheduleId
                      ).length === 0 && (
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

export default FlightBookingManager;
