import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlightService from "../services/FlightService";
import formatPrice from "../utils/format-price";

const DetailTicketFlight = () => {
  const { flightCode, ticketId } = useParams();

  const [ticket, setTicket] = useState({});
  useEffect(() => {
    document.title = "Chi tiết vé máy bay";
    const fetchTicket = async () => {
      try {
        const response = await FlightService.getTicket(flightCode, ticketId);
        // console.log(response.data);

        setTicket(response.data);
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
              Chi tiết vé máy bay
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Thông tin chi tiết vé máy bay
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Chuyến bay
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket?.flightName}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Hãng bay</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket?.airlineName}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Sân bay đi
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket?.departureAirfield}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Sân bay đến
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket?.destinationAirfield}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Mã vé</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket?.ticket?.ticketId}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ngày đặt</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket?.ticket?.bookingDate}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Số khách</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket?.ticket?.passengers?.length}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Số vé</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket?.ticket?.passengers?.filter((p) => p.vip).length} thương gia,{" "}
                  {ticket?.ticket?.passengers?.filter((p) => !p.vip).length} thường
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tổng tiền</dt>
                <dd className="mt-1 text-2xl font-extrabold text-red-600 sm:mt-0 sm:col-span-2">
                  {formatPrice(ticket?.ticket?.totalPrice)}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Xác nhận</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {ticket?.ticket?.confirmed ? "Đã xác nhận" : "Chưa xác nhận"}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Thanh toán</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {ticket?.ticket?.payment ? "Đã thanh toán" : "Chưa thanh toán"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailTicketFlight;
