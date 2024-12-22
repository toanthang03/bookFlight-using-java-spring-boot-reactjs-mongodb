import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FlightService from "../../services/FlightService";
import { PlusIcon } from "@heroicons/react/outline";
import addTimeFormat from "../../utils/add-time-format";
import { CgClose } from "react-icons/cg";
import { CloseButton } from "@headlessui/react";
import formatPrice from "../../utils/format-price";

const FlightUpdate = () => {
  const { flightCode } = useParams();
  const [newSchedule, setNewSchedule] = useState({
    departureDate: new Date().toISOString().split("T")[0],
    departureTime: "00:00",
    durationHour: 2,
    durationMinute: 30,
  });
  const [newService, setNewService] = useState({
    flightServiceName: "",
    flightServicePrice: 0,
  });
  const [flight, setFlight] = useState({});
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await FlightService.getFlight(flightCode);
        // console.log(response.data);
        setFlight(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlight();
  }, []);

  const handleChange = async () => {
    try {
      const response = await FlightService.updateFlight(flightCode, flight);
      // console.log(response);

      if (response.status === 200) {
        alert("Cập nhật chuyến bay thành công");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Mỗi lần time thay đổi thì kiểm tra ngày đang chọn có phải ngày hiện tại không, nếu là ngày hiện tại thì thời gian phải lớn hơn thời gian hiện tại
    if (newSchedule.departureTime === new Date().toISOString().split("T")[0]) {
      const currentTime = new Date().toLocaleTimeString("en-GB").split(":");
      const selectedTime = newSchedule.departureTime.split(":");
      if (
        parseInt(selectedTime[0]) < parseInt(currentTime[0]) ||
        (parseInt(selectedTime[0]) === parseInt(currentTime[0]) &&
          parseInt(selectedTime[1]) < parseInt(currentTime[1]))
      ) {
        setNewSchedule({
          ...newSchedule,
          departureTime: currentTime.join(":"),
        });
      }
    }
  }, [newSchedule.departureTime]);

  const handleAddSchedule = async () => {
    try {
      const response = await FlightService.addSchedule(flightCode, newSchedule);
      // console.log(response);
      if (response.status === 200) {
        alert("Thêm lịch trình thành công");
        const newSchedule = response.data;
        setFlight({
          ...flight,
          schedules: [...flight.schedules, newSchedule],
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddService = () => {
    if (newService.flightServiceName.length < 1) {
      alert("Tên dịch vụ không được để trống");
      return;
    }
    const createService = {
      flightServiceId: flightCode + "SV" + Math.floor(Math.random() * 1000),
      flightServiceName: newService.flightServiceName,
      flightServicePrice: newService.flightServicePrice,
    };
    setFlight({
      ...flight,
      flightServices: [...flight?.flightServices, createService],
    });
    setNewService({
      flightServiceName: "",
      flightServicePrice: 0,
    });
  };

  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Cập nhật chuyến bay
          </h1>
          <p className="text-gray-500 italic">
            Cập nhật thông tin chuyến bay(Mã chuyến: {flight?.flightCode})
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="mt-6 grid lg:grid-cols-5 gap-3 lg:gap-5">
            <div className="lg:col-span-3 rounded-lg">
              <div className="">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <h1 className="text-2xl font-semibold my-3">
                      Thông tin cơ bản
                    </h1>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tên chuyến bay(không chỉnh sửa)
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={flight?.flightName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Xuất phát(không chỉnh sửa)
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={flight?.departure?.airfieldName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Điểm đến(không chỉnh sửa)
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={flight?.destination?.airfieldName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-span-6  sm:col-span-3">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Hãng bay(không chỉnh sửa)
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={flight?.airline?.airlineName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Giá vé thường
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={flight?.normalPrice}
                            min={300000}
                            step={17000}
                            onKeyDown={(e) => {
                              if (
                                e.key === "-" ||
                                e.key === "e" ||
                                e.key === "E"
                              ) {
                                e.preventDefault();
                              }
                            }}
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /[^0-9.]/g,
                                ""
                              );
                            }}
                            onChange={(e) =>
                              setFlight({
                                ...flight,
                                normalPrice: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Giá vé thương gia
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={flight?.vipPrice}
                            min={300000}
                            step={17000}
                            onKeyDown={(e) => {
                              if (
                                e.key === "-" ||
                                e.key === "e" ||
                                e.key === "E"
                              ) {
                                e.preventDefault();
                              }
                            }}
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /[^0-9.]/g,
                                ""
                              );
                            }}
                            onChange={(e) =>
                              setFlight({ ...flight, vipPrice: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Thuế
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={flight?.tax}
                            min={0}
                            step={5000}
                            onChange={(e) =>
                              setFlight({ ...flight, tax: e.target.value })
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
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Có thể hủy
                        </label>
                        <div className="mt-1">
                          <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={flight?.cancelable ? "1" : "0"}
                            onChange={(e) =>
                              setFlight({
                                ...flight,
                                cancelable: e.target.value === "1",
                              })
                            }
                          >
                            <option value="1">Có thể hủy</option>
                            <option value="0">Không thể hủy</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Trạng thái hoạt động
                        </label>
                        <div className="mt-1">
                          <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={flight?.active ? "1" : "0"}
                            onChange={(e) =>
                              setFlight({
                                ...flight,
                                active: e.target.value === "1",
                              })
                            }
                          >
                            <option value="1">Đang hoạt động</option>
                            <option value="0">Dừng hoạt động</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="grid xl:grid-cols-3 gap-3">
                      <div className="xl:col-span-3">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ngày khởi hành
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            min={new Date().toISOString().split("T")[0]}
                            value={newSchedule.departureDate}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                departureDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="xl:col-span-1">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Giờ khởi hành
                        </label>
                        <div className="mt-1">
                          <input
                            type="time"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={newSchedule.departureTime}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                departureTime: e.target.value,
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
                      onClick={handleChange}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <h1 className="text-2xl font-semibold">
                      Dịch vụ chuyến bay
                    </h1>
                    <div className="grid xl:grid-cols-3 gap-3">
                      <div className="xl:col-span-3">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tên dịch vụ
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={newService.flightServiceName}
                            onChange={(e) =>
                              setNewService({
                                ...newService,
                                flightServiceName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="xl:col-span-1">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Giờ khởi hành
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={newService.flightServicePrice}
                            step={15000}
                            onChange={(e) =>
                              setNewService({
                                ...newService,
                                flightServicePrice: e.target.value,
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
                        </div>
                      </div>
                    </div>
                    <div>
                      <ul className="list-disc list-inside">
                        {flight?.flightServices?.map((service, index) => (
                          <li key={index} className="flex">
                            {service.flightServiceName} -{" "}
                            {formatPrice(service.flightServicePrice)}
                            <span
                              className="my-auto ml-auto cursor-pointer"
                              onClick={() =>
                                setFlight({
                                  ...flight,
                                  flightServices:
                                    flight?.flightServices?.filter(
                                      (item) =>
                                        item.flightServiceId !==
                                        service.flightServiceId
                                    ),
                                })
                              }
                            >
                              <CgClose className="w-5 h-5" />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      onClick={handleAddService}
                    >
                      Thêm dịch vụ
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={handleChange}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 rounded-lg">
              <div className="">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <h1 className="text-2xl font-semibold">
                      Quản lý lịch trình bay
                    </h1>
                    <div className="grid xl:grid-cols-3 gap-3">
                      <div className="xl:col-span-3">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ngày khởi hành
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            min={new Date().toISOString().split("T")[0]}
                            value={newSchedule.departureDate}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                departureDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="xl:col-span-1">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Giờ khởi hành
                        </label>
                        <div className="mt-1">
                          <input
                            type="time"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={newSchedule.departureTime}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                departureTime: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="xl:col-span-1">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tiếng bay(dự kiến)
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            min={2}
                            value={newSchedule.durationHour}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                durationHour: e.target.value,
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
                        </div>
                      </div>
                      <div className="xl:col-span-1">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phút bay(dự kiến)
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            min={30}
                            value={newSchedule.durationMinute}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                durationMinute: e.target.value,
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
                        </div>
                      </div>
                    </div>
                    <div>
                      <ul className="list-disc list-inside">
                        {flight?.schedules
                          ?.filter(
                            (schedule) =>
                              schedule.departureDate >=
                              new Date().toISOString().split("T")[0]
                          )
                          .sort((a, b) =>
                            a.departureDate.localeCompare(b.departureDate)
                          )
                          .map((schedule, index) => (
                            <li key={index} className="flex">
                              {schedule.departureDate} - (
                              {schedule.departureTime} -{" "}
                              {addTimeFormat(
                                schedule.departureTime,
                                schedule.durationHour,
                                schedule.durationMinute
                              )}
                              )
                              <span
                                className="my-auto ml-auto cursor-pointer"
                                onClick={() =>
                                  setFlight({
                                    ...flight,
                                    schedules: flight?.schedules?.filter(
                                      (item) =>
                                        item.scheduleId !== schedule.scheduleId
                                    ),
                                  })
                                }
                              >
                                <CgClose className="w-5 h-5" />
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      onClick={handleAddSchedule}
                    >
                      Thêm lịch trình
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={handleChange}
                    >
                      Lưu thay đổi
                    </button>
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

export default FlightUpdate;
