import React, { useEffect, useRef, useState } from "react";
import HotelService from "../../services/HotelService";
import { Link } from "react-router-dom";
import { EyeIcon, PencilAltIcon, PlusIcon } from "@heroicons/react/outline";
import HotelCreate from "../../components/admin/HotelCreate";
import Pagination from "../../components/admin/Pagination";

const HotelManager = () => {
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [searchData, setSearchData] = useState({
    hotelName: "",
    locationId: "",
    minPrice: 0,
    maxPrice: -1,
    active: 0,
    sortBy: "hotelName",
    sortType: "asc",
    page: 1,
    limit: 5,
  });
  useEffect(() => {
    document.title = "Quản lý các khách sạn";

    const fetchHotels = async () => {
      try {
        const response = await HotelService.getHotels(searchData);
        console.log(response.data);
        setHotels(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotels();
  }, [searchData]);
  return (
    <>
      <HotelCreate
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
      <main className="flex-1">
        <div className="py-6 h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Thông tin các khách sạn
            </h1>
            <p className="text-gray-500 italic">
              Xem các khách sạn đang hoạt động
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="py-4">
              {/* border-2 border-dashed border-gray-200 */}
              <div className="rounded-lg">
                {/* Filter or Create */}
                <div className="mt-5 md:gap-5 md:flex">
                  <div className="md:mb-0 mb-3 flex gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={() => setOpen(true)}
                    >
                      <PlusIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Thêm khách sạn
                    </button>
                  </div>
                  <div className="md:ml-auto gap-3">
                    <div>
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        value={searchData.active ? "1" : "0"}
                        onChange={(e) =>
                          setSearchData({
                            ...searchData,
                            active: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value="1">Đang hoạt động</option>
                        <option value="0">Tất cả</option>
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
                                Mã khách sạn
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Tên khách sạn
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Sao
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Tỉnh/TP
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Email
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
                                Trạng thái
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              ></th>
                            </tr>
                          </thead>
                          <tbody>
                            {hotels?.map((hotel, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {hotel.hotelCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div class="w-48 overflow-hidden text-ellipsis whitespace-nowrap">
                                    {hotel.hotelName}
                                  </div>
                                  {hotel.bookingRoomHotels?.length > 0 && (
                                  <p className="text-red-500 text-sm">
                                    (
                                    {
                                      hotel.bookingRoomHotels?.filter(
                                        (booking) => booking.confirmed === false
                                      ).length
                                    }{" "}
                                    lượt đặt chưa xác nhận)
                                  </p>
                                )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {hotel.hotelStar}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {hotel.location.locationName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {hotel.hotelEmail}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {hotel.hotelPhone}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {hotel.active
                                    ? "Đang hoạt động"
                                    : "Ngưng hoạt động"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <Link
                                    to={`/admin/hotel-update/${hotel.hotelCode}`}
                                    className="text-sky-500 hover:text-sky-700"
                                  >
                                    <PencilAltIcon className="h-6 w-6" />
                                  </Link>
                                  <Link
                                    to={`/admin/hotel-booking/${hotel.hotelCode}`}
                                    className="text-teal-500 hover:text-teal-700"
                                  >
                                    <EyeIcon className="h-6 w-6" />
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {hotels?.length === 0 && (
                          <div className="text-center py-4 text-gray-500 h-52">
                            Không có dữ liệu
                          </div>
                        )}
                      </div>
                      <Pagination
                        page={searchData.page}
                        limit={searchData.limit}
                        onNext={() => {
                          if (hotels?.length === searchData.limit) {
                            setSearchData({
                              ...searchData,
                              page: searchData.page + 1,
                            });
                          }
                        }}
                        onPrevious={() => {
                          if (searchData.page > 1) {
                            setSearchData({
                              ...searchData,
                              page: searchData.page - 1,
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default HotelManager;
