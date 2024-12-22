import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DiscountService from "../services/DiscountService";

const DiscountCreate = () => {
  const [discount, setDiscount] = useState({
    poster: "",
    discountName: "",
    discountType: "day",
    startDate: new Date().toISOString().split("T")[0],
    duration: 1,
    percentDiscount: 1,
    description: "",
  });
  const [discountError, setDiscountError] = useState({
    poster: "",
    discountName: "",
    duration: "",
    percentDiscount: "",
  });
  const navigate=  useNavigate();

  useEffect(() => {
    document.title = "Thêm mới khuyến mãi";
  }, []);

  const handleCreateDiscount = async () => {
    try {
      const response = await DiscountService.createDiscount({
        ...discount,
        minPeople: 4,
      });
      // console.log(response.data);
      if(response.status === 200) {
        navigate("/admin/discount-management");
      }
      alert(response.message);
    } catch (error) {
      console.error(error);
      setDiscountError(error?.response?.data);
    }
  };

  return (
    <main className="flex-1">
      <div className="py-6 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Thêm mới khuyến mãi
          </h1>
          <p className="text-gray-500 italic">
            Thêm mới khuyến mãi để hiển thị trên trang chủ
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="mt-6">
            <div className="">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <h1 className="text-2xl font-semibold my-3">
                    Thông tin cơ bản
                  </h1>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 md:col-span-4">
                      <label
                        htmlFor="poster"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Poster(để hiển thị trên trang chủ)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="https://example.com/poster.jpg"
                          value={discount.poster}
                          onChange={(e) =>
                            setDiscount({ ...discount, poster: e.target.value })
                          }
                        />
                        <span className="text-sm text-red-500">{discountError.poster}</span>
                        <Link
                          to="#"
                          target="blank"
                          className="text-sky-600 underline"
                        >
                          Xem trước
                        </Link>
                      </div>
                    </div>
                    <div className="col-span-6 md:col-span-3">
                      <label
                        htmlFor="discountName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên dịch vụ
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Tên dịch vụ"
                          value={discount.discountName}
                          onChange={(e) =>
                            setDiscount({
                              ...discount,
                              discountName: e.target.value,
                            })
                          }
                        />
                        <span className="text-sm text-red-500">{discountError.discountName}</span>
                      </div>
                    </div>

                    <div className="col-span-6 md:col-span-2">
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Loại giảm giá
                      </label>
                      <div className="mt-1">
                        <select
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={discount.discountType}
                          onChange={(e) =>
                            setDiscount({
                              ...discount,
                              discountType: e.target.value,
                            })
                          }
                        >
                          <option value="day">Theo ngày</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-6 md:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ngày bắt đầu
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={discount.startDate}
                          onChange={(e) =>
                            setDiscount({
                              ...discount,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Thời lượng
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={discount.duration}
                          onChange={(e) =>
                            setDiscount({
                              ...discount,
                              duration: e.target.value,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "e" || e.key === "E") {
                              e.preventDefault();
                            }
                          }}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                          }}
                        />
                        <span className="text-sm text-red-500">{discountError.duration}</span>
                      </div>
                    </div>

                    <div className="col-span-6 md:col-span-1">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Giảm giá(%)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={discount.percentDiscount}
                          onChange={(e) => {
                            if (e.target.value > 0 && e.target.value <= 100) {
                              setDiscount({
                                ...discount,
                                percentDiscount: e.target.value,
                              });
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
                        <span className="text-sm text-red-500">{discountError.percentDiscount}</span>
                      </div>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mô tả
                      </label>
                      <div className="mt-1">
                        <textarea
                          rows={5}
                          className="px-2 pt-2 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                          placeholder="Mô tả"
                          value={discount.description}
                          onChange={(e) =>
                            setDiscount({
                              ...discount,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    onClick={handleCreateDiscount}
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiscountCreate;
