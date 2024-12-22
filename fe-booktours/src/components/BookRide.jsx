import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CheckIcon, ExclamationIcon } from "@heroicons/react/solid";
import React, { Fragment, useContext, useEffect, useState } from "react";
import AirportTransferService from "../services/AirportTransferService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalProvider";

const BookRide = (props) => {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const [bookRide, setBookRide] = useState({
    ...props.state,
    vehicleId: props.vehicleSelected?.vehicleId,
    quantityVehicle: 1,
    bookerName: "",
    bookerPhone: "",
    note: "",
  });
  const [bookRideError, setBookRideError] = useState({});
  // console.log(bookRide);

  useEffect(() => {
    // Mỗi lần time thay đổi thì kiểm tra ngày đang chọn có phải ngày hiện tại không, nếu là ngày hiện tại thì thời gian phải lớn hơn thời gian hiện tại
    if (bookRide.date === new Date().toISOString().split("T")[0]) {
      const currentTime = new Date().toLocaleTimeString("en-GB").split(":");
      const selectedTime = bookRide.time.split(":");
      if (
        parseInt(selectedTime[0]) < parseInt(currentTime[0]) ||
        (parseInt(selectedTime[0]) === parseInt(currentTime[0]) &&
          parseInt(selectedTime[1]) < parseInt(currentTime[1]))
      ) {
        setBookRide({ ...bookRide, time: currentTime.join(":") });
      }
    }
  }, [bookRide.time]);

  const handleBookRide = async () => {
    if(!context.isAuthenticated || !context.profile?.verifiedEmail) {
      navigate("/login");
    }
    try {
      const bookingRide = {
        address: bookRide.address,
        airfieldToAddress: bookRide.airfieldToAddress,
        pickUpDate: bookRide.date,
        pickUpTime: bookRide.time, //..
        vehicleId: props.vehicleSelected?.vehicleId, //..
        quantityVehicle: bookRide.quantityVehicle, //..
        bookerName: bookRide.bookerName, //..
        bookerPhone: bookRide.bookerPhone, //..
        note: bookRide.note, //..
      };
      const response = await AirportTransferService.bookRide(
        props.airportTransferId,
        bookingRide
      );
      // console.log(response);
      if (response.status === 200) {
        alert("Đặt xe thành công");
        props.setOpen(false);
        navigate(`/payment-bookride/${props.airportTransferId}/${response.data?.bookRideId}`);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("handleBookRide -> error", error);
      setBookRideError(error.response?.data);
    }
  };

  return (
    <Transition show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={props.cancelButtonRef}
        onClose={props.setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100">
                  <CheckIcon
                    className="h-6 w-6 text-sky-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {bookRide.airfieldToAddress
                      ? `Từ ${bookRide.airfieldName} đến ${bookRide.address}`
                      : `Từ ${bookRide.address} đến ${bookRide.airfieldName}`}
                  </DialogTitle>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Điểm đón(disabled)
                      </label>
                      <div className="mt-1">
                        {bookRide.airfieldToAddress ? (
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={bookRide.airfieldName}
                            disabled
                          />
                        ) : (
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={bookRide.address}
                            disabled
                          />
                        )}
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Điểm đến(disabled)
                      </label>
                      <div className="mt-1">
                        {!bookRide.airfieldToAddress ? (
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={bookRide.airfieldName}
                            disabled
                          />
                        ) : (
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={bookRide.address}
                            disabled
                          />
                        )}
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ngày đón(disabled)
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={bookRide.date}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Giờ đón
                      </label>
                      <div className="mt-1">
                        <input
                          type="time"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={bookRide.time}
                          onChange={(e) =>
                            setBookRide({ ...bookRide, time: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên người đặt
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={bookRide.bookerName}
                          onChange={(e) =>
                            setBookRide({
                              ...bookRide,
                              bookerName: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {bookRideError?.bookerName}
                        </span>
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Số lượng xe
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={bookRide.quantityVehicle}
                          min={1}
                          onChange={(e) =>
                            setBookRide({
                              ...bookRide,
                              quantityVehicle: e.target.value,
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
                    <div className="">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Số điện thoại
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={bookRide.bookerPhone}
                          onChange={(e) =>
                            setBookRide({
                              ...bookRide,
                              bookerPhone: e.target.value,
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {bookRideError?.bookerPhone}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mô tả
                      </label>
                      <div className="mt-1">
                        <textarea
                          rows={5}
                          className="px-2 pt-2 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                          value={bookRide.note}
                          onChange={(e) =>
                            setBookRide({
                              ...bookRide,
                              note: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleBookRide}
                >
                  Đặt ngay
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.setOpen(false)}
                  ref={props.cancelButtonRef}
                >
                  Hủy
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookRide;
