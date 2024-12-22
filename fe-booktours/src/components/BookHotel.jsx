import React, { Fragment, useContext, useState } from "react";
import HotelService from "../services/HotelService";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalProvider";

const BookHotel = (props) => {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  // console.log(props.selects);
  
  const [bookHotel, setBookHotel] = useState({
    contactInfo: {
      fullName: "", // tb
      phone: "", // tb
    },
    checkInDate: new Date().toISOString().split("T")[0], // tb
    days: 1, // nb
    numberOfRooms: 1, // tb
  });
  const [errorBooking, setErrorBooking] = useState({});

  const handleBooking = async () => {
    if(!context.isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      const response = await HotelService.bookHotel(
        props.selects.hotelCode,
        {
          ...bookHotel,
          roomTypeId: props.selects.roomTypeId,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        alert("Đặt phòng thành công");
        navigate(`/payment-book-hotel/${props.selects.hotelCode}/${response.data}`);
      } else {
        alert("Đặt phòng thất bại, " + response.message);
      }
    } catch (error) {
      console.error(error);
      setErrorBooking(error.response.data);
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100">
                  <CheckIcon
                    className="h-6 w-6 text-sky-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4">
                  <DialogTitle
                    as="h3"
                    className="mt-2 text-center text-lg font-medium text-gray-900"
                  >
                    Đặt phòng
                  </DialogTitle>
                  <div className="mt-4 grid grid-cols-6 gap-3">
                    <div className="col-span-6 md:col-span-2">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ngày nhận phòng
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={bookHotel.checkInDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) =>
                            setBookHotel({
                              ...bookHotel,
                              checkInDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Số ngày lưu trú
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={bookHotel.days}
                          min={1}
                          onChange={(e) =>
                            setBookHotel({
                              ...bookHotel,
                              days: e.target.value,
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
                    <div className="col-span-6 md:col-span-2">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Số phòng muốn đặt
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          value={bookHotel.numberOfRooms}
                          min={1}
                          onChange={(e) =>
                            setBookHotel({
                              ...bookHotel,
                              numberOfRooms: e.target.value,
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
                    <div className="col-span-6 md:col-span-2">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Họ và tên liên hệ
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Họ và tên liên hệ"
                          value={bookHotel.contactInfo.fullName}
                          onChange={(e) =>
                            setBookHotel({
                              ...bookHotel,
                              contactInfo: {
                                ...bookHotel.contactInfo,
                                fullName: e.target.value,
                              },
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {errorBooking["contactInfo.fullName"]}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray-700"
                      >
                        Điện thoại liên hệ
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          placeholder="Nhập điện thoại liên hệ"
                          value={bookHotel.contactInfo.phone}
                          onChange={(e) =>
                            setBookHotel({
                              ...bookHotel,
                              contactInfo: {
                                ...bookHotel.contactInfo,
                                phone: e.target.value,
                              },
                            })
                          }
                        />
                        <span className="text-red-500 text-sm">
                          {errorBooking["contactInfo.phone"]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleBooking}
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

export default BookHotel;
