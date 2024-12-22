import React, { useEffect, useState } from "react";
import DataService from "../../services/DataService";
import DiscountService from "../../services/DiscountService";
import formatDateYYYYMMDD from "../../utils/format-date-yyyymmdd";
import { DatabaseIcon, PlusIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const DiscountManager = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    document.title = "Quản lý giảm giá";
    const fetchDiscounts = async () => {
      try {
        const response = await DiscountService.getDiscounts();
        setDiscounts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiscounts();
  }, []);

  const handleChange = async (index) => {
    try {
      const response = await DiscountService.updateDiscount(discounts[index]);
      // console.log(response.data);
      alert(response.message);
    } catch (error) {
      console.error(error);
      // setDiscountError(error?.response?.data);
    }
  };

  return (
    <main className="flex-1">
      <div className="py-6 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Quản lý giảm giá
          </h1>
          <p className="text-gray-500 italic">
            Quản lý thông tin của các dịch vụ giảm giá của GoTrip
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4">
            {/* border-2 border-dashed border-gray-200 */}
            <div className="rounded-lg">
              <div className="mt-5 gap-5 md:flex">
                <div className="md:mb-0 mb-3 flex gap-3">
                  <Link
                    to="/admin/discount-create"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Thêm giảm giá
                  </Link>
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
                              STT
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Tên giảm giá
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Giảm giá(%)
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Bắt đầu
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Thời lượng(Ngày)
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Trạng thái
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {discounts?.map((discount, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <div className="max-w-sm">
                                  <span className="truncate">{index}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {discount.discountName}(
                                <Link
                                  to={discount.poster}
                                  target="_blank"
                                  className="text-red-500"
                                >
                                  Xem poster
                                </Link>
                                )
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input
                                  type="number"
                                  className="appearance-none block w-1/2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                  value={discount.percentDiscount}
                                  onChange={(e) => {
                                    // Nếu giá trị mới > 0 và < 100 thì mới cho phép thay đổi
                                    if (
                                      e.target.value > 0 &&
                                      e.target.value < 100
                                    ) {
                                      const newDiscounts = [...discounts];
                                      newDiscounts[index].percentDiscount =
                                        e.target.value;
                                      setDiscounts(newDiscounts);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "-" || e.key === "e" || e.key === "E") {
                                      e.preventDefault();
                                    }
                                  }}
                                  onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                                  }}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input
                                  type="date"
                                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                  value={
                                    new Date(discount.startDate)
                                      .toISOString()
                                      .split("T")[0]
                                  }
                                  onChange={(e) => {
                                    const newDiscounts = [...discounts];
                                    newDiscounts[index].startDate =
                                      e.target.value;
                                    setDiscounts(newDiscounts);
                                  }}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input
                                  type="number"
                                  className="max-w-1/2 appearance-none block py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                  value={discount.duration}
                                  onChange={(e) => {
                                    // Nếu giá trị mới > 0 và < 100 thì mới cho phép thay đổi
                                    if (
                                      e.target.value > 0 &&
                                      e.target.value < 100
                                    ) {
                                      const newDiscounts = [...discounts];
                                      newDiscounts[index].duration =
                                        e.target.value;
                                      setDiscounts(newDiscounts);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "-" || e.key === "e" || e.key === "E") {
                                      e.preventDefault();
                                    }
                                  }}
                                  onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                                  }}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {
                                  // Trạng thái: đang diễn ra, sắp diễn ra, đã qua

                                  new Date(discount.startDate) >
                                  new Date(formatDateYYYYMMDD(new Date()))
                                    ? "Sắp diễn ra"
                                    : new Date(discount.startDate) <
                                      new Date(formatDateYYYYMMDD(new Date()))
                                    ? "Đã qua"
                                    : "Đang diễn ra"
                                }
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <p
                                  className="cursor-pointer text-sky-600 hover:text-ssky00"
                                  onClick={() => handleChange(index)}
                                >
                                  Lưu
                                </p>
                                <p className="cursor-pointer text-red-600 hover:text-ssky00">
                                  Xóa
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {discounts?.length === 0 && (
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
        </div>
      </div>
    </main>
  );
};

export default DiscountManager;
