import React, { useContext, useEffect, useState } from "react";
import addTimeFormat from "../utils/add-time-format";
import formatPrice from "../utils/format-price";
import { IoMdClose } from "react-icons/io";
import { SearchIcon } from "@heroicons/react/solid";
import FlightService from "../services/FlightService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalProvider";

const DetailAndBooking = (props) => {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // console.log(props.flight?.schedules);

  useEffect(() => {
    setBookingData({
      ...bookingData,
      scheduleId: props.flight?.schedules?.filter(
        (schedule) => schedule.departureDate >= new Date().toISOString()
      )[0]?.scheduleId,
    });
  }, [props.flight]);

  const [bookingData, setBookingData] = useState({
    scheduleId: props.flight?.schedules?.filter(
      (schedule) => schedule.departureDate >= new Date().toISOString()
    )[0]?.scheduleId,
    passengers: [
      {
        passengerName: "Lê Văn A1",
        // trừ 18 năm để lấy ngày sinh mặc định là 18 tuổi
        dateOfBirth: new Date(
          new Date().getFullYear() - 18,
          new Date().getMonth(),
          new Date().getDate()
        )
          .toISOString()
          .split("T")[0],
        vip: false,
      },
    ],
    flightServiceIds: [],
    contactInfo: {
      fullName: "",
      phone: "",
    },
  });

  const handleBooking = async () => {
    if (!context.isAuthenticated || !context.profile?.verifiedEmail) {
      navigate("/login");
    }
    try {
      
      const response = await FlightService.bookTicket(
        props.flight?.flightCode,
        bookingData
      );
      // console.log(response);
      if (response.status === 200) {
        alert("Đặt vé thành công");
        navigate(
          `/payment-ticket-flight/${props.flight?.flightCode}/${response.data}`
        );
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data);
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg border border-solid shadow-sm">
      <h1 className="text-2xl font-semibold text-sky-700">
        {props.flight?.flightName} - Mã chuyến bay({props.flight?.flightCode})
      </h1>
      <p className="mt-3 font-semibold">Thông tin hãng bay</p>
      <div className="flex gap-2 mt-3">
        <img
          src={props.flight?.airline?.logo}
          alt=""
          className="my-auto w-16 object-cover"
        />
        <p className="my-auto">{props.flight?.airline?.airlineName}</p>
      </div>
      <p className="mt-3 font-semibold">
        Từ{" "}
        <span className="text-sky-700">
          {props.flight?.departure?.locationName}
        </span>{" "}
        - đến{" "}
        <span className="text-red-500">
          {props.flight?.destination?.locationName}
        </span>
      </p>
      <p className="mt-3 font-semibold">Giá của từng hạng ghế</p>
      <div className="flex gap-2 mt-3">
        <div className="flex gap-2">
          <p className="text-lg font-semibold text-sky-700">
            {formatPrice(props.flight?.vipPrice)}
          </p>
          <p className="my-auto text-sm">(Thương gia)</p>
        </div>
        <div className="flex gap-2">
          <p className="text-lg font-semibold text-gray-600">
            {formatPrice(props.flight?.normalPrice)}
          </p>
          <p className="my-auto text-sm">(Hạng thường)</p>
        </div>
      </div>

      <h1 className="mt-3 font-semibold text-2xl">Đặt vé</h1>
      <p className="mt-3 font-semibold">Chi tiết các lịch trình</p>
      <div className="mt-3">
        <fieldset>
          <legend className="sr-only">Plan</legend>
          <div className="space-y-5">
            {props.flight?.schedules
              .filter(
                (schedule) => schedule.departureDate >= new Date().toISOString()
              )
              .map((schedule, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="radio"
                      checked={schedule.scheduleId === bookingData.scheduleId}
                      className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                      onChange={() => {
                        setBookingData({
                          ...bookingData,
                          scheduleId: schedule.scheduleId,
                        });
                      }}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor={`${schedule.scheduleId}-name`}
                      className="font-medium text-gray-700"
                    >
                      {schedule.departureDate}(Còn trống:{" "}
                      {schedule.availableVipSeats} thương gia,{" "}
                      {schedule.availableNormalSeats} thường)
                    </label>
                    <p
                      id={`${schedule.scheduleId}-description`}
                      className="text-gray-500"
                    >
                      {schedule.departureTime} -{" "}
                      {addTimeFormat(
                        schedule.departureTime,
                        schedule.durationHour,
                        schedule.durationMinute
                      )}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </fieldset>
      </div>
      <p className="mt-3 font-semibold">Thông tin liên hệ</p>
      <div className="mt-3 grid sm:grid-cols-5 gap-2">
        <div className="sm:col-span-3">
          <input
            type="text"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="Họ và tên liên hệ"
            value={bookingData.contactInfo.fullName}
            onChange={(e) =>
              setBookingData({
                ...bookingData,
                contactInfo: {
                  ...bookingData.contactInfo,
                  fullName: e.target.value,
                },
              })
            }
          />
          <span className="text-sm text-red-500">
            {errors["contactInfo.fullName"]}
          </span>
        </div>
        <div className="sm:col-span-2">
          <input
            type="text"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="Số điện thoại liên hệ"
            value={bookingData.contactInfo.phone}
            onChange={(e) =>
              setBookingData({
                ...bookingData,
                contactInfo: {
                  ...bookingData.contactInfo,
                  phone: e.target.value,
                },
              })
            }
          />
          <span className="text-sm text-red-500">
            {errors["contactInfo.phone"]}
          </span>
        </div>
      </div>
      {props.flight?.flightServices?.length > 0 && (
        <>
          <p className="mt-3 font-semibold">Các dịch vụ được hỗ trợ</p>
          {props.flight?.flightServices?.map((service, index) => (
            <fieldset key={index} className="mt-3">
              <legend className="sr-only">Notifications</legend>
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                    checked={bookingData.flightServiceIds
                      .map((id) => id)
                      .includes(service.flightServiceId)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setBookingData({
                          ...bookingData,
                          flightServiceIds: [
                            ...bookingData.flightServiceIds,
                            service.flightServiceId,
                          ],
                        });
                      } else {
                        setBookingData({
                          ...bookingData,
                          flightServiceIds: bookingData.flightServiceIds.filter(
                            (id) => id !== service.flightServiceId,
                          ),
                        });
                      }
                    }}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span id="comments-description" className="text-gray-700">
                    {service.flightServiceName} -{" "}
                    {formatPrice(service.flightServicePrice)}
                  </span>
                </div>
              </div>
            </fieldset>
          ))}
        </>
      )}
      <p className="mt-3 font-semibold">Danh sách hành khách</p>
      {bookingData.passengers.map((passenger, index) => (
        <div key={index} className="mt-3 grid md:grid-cols-3 gap-2">
          <div className="">
            <input
              type="text"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Họ và tên hành khách"
              value={passenger.passengerName}
              onChange={(e) => {
                const newPassengers = [...bookingData.passengers];
                newPassengers[index].passengerName = e.target.value;
                setBookingData({ ...bookingData, passengers: newPassengers });
              }}
            />
          </div>
          <div className="">
            <input
              type="date"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={passenger.dateOfBirth}
              onChange={(e) => {
                const newPassengers = [...bookingData.passengers];
                newPassengers[index].dateOfBirth = e.target.value;
                setBookingData({ ...bookingData, passengers: newPassengers });
              }}
            />
          </div>
          <div className="">
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={passenger.vip ? "1" : "0"}
              onChange={(e) => {
                const newPassengers = [...bookingData.passengers];
                newPassengers[index].vip = e.target.value === "1";
                setBookingData({ ...bookingData, passengers: newPassengers });
              }}
            >
              <option value="0">Hạng thường</option>
              <option value="1">Thương gia</option>
            </select>
          </div>
          {index === bookingData.passengers.length - 1 && (
            <div className="md:col-span-3 flex gap-2">
              <span
                className="underline italic cursor-pointer text-red-500"
                onClick={() => {
                  // Xóa hành khách cuối cùng
                  if (bookingData.passengers.length > 1) {
                    setBookingData({
                      ...bookingData,
                      passengers: bookingData.passengers.slice(
                        0,
                        bookingData.passengers.length - 1
                      ),
                    });
                  }
                }}
              >
                Giảm hành khách
              </span>
              <span
                className="underline italic cursor-pointer text-sky-700"
                onClick={() => {
                  setBookingData({
                    ...bookingData,
                    passengers: [
                      ...bookingData.passengers,
                      {
                        passengerName: `Lê Văn A${
                          bookingData.passengers.length + 1
                        }`,
                        dateOfBirth: new Date(
                          new Date().getFullYear() - 18,
                          new Date().getMonth(),
                          new Date().getDate()
                        )
                          .toISOString()
                          .split("T")[0],
                        vip: false,
                      },
                    ],
                  });
                }}
              >
                Thêm hành khách
              </span>
            </div>
          )}
        </div>
      ))}
      <div className="flex mt-3">
        <button
          className="m-auto h-full w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          onClick={handleBooking}
          disabled={
            props.flight?.schedules.filter(
              (schedule) => schedule.departureDate >= new Date().toISOString()
            ).length < 1
          }
        >
          Đặt vé
          {props.flight?.schedules.filter(
            (schedule) => schedule.departureDate >= new Date().toISOString()
          ).length < 1 && "(Hiện chưa có lịch bay)"}
        </button>
      </div>
    </div>
  );
};

export default DetailAndBooking;
