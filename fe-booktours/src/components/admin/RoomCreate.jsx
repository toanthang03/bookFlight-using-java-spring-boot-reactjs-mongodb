import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CheckIcon, CubeIcon, PlusIcon } from "@heroicons/react/outline";
import React, { Fragment, useEffect, useState } from "react";
import { initTWE, Carousel } from "tw-elements";
import HotelService from "../../services/HotelService";

const RoomCreate = (props) => {
  const [newImage, setNewImage] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [roomType, setRoomType] = useState({
    roomTypeName: "",
    roomCapacity: 2,
    roomArea: 20,
    roomPrice: 200000,
    roomImage: [],
    roomFacilities: [],
    roomDetails: [],
    numberOfRooms: 10,
  });

  const [roomTypeError, setRoomTypeError] = useState({});

  useEffect(() => {
    initTWE({ Carousel });
  }, []);

  useEffect(() => {
    // console.log(roomType);
  }, [roomType]);

  const handleAddRoomType = async () => {
    try {
      const response = await HotelService.addRoomType(
        props.hotelCode,
        roomType
      );
      // console.log(response.data);
      if (response.status === 200) {
        props.handleAdd(response.data);
        setRoomType({
          roomTypeName: "",
          roomCapacity: 2,
          roomArea: 20,
          roomPrice: 200000,
          roomImage: [],
          roomFacilities: [],
          roomDetails: [],
          numberOfRooms: 10,
        });
      } else {
        alert("Thêm loại phòng thất bại " + response.message);
      }
    } catch (error) {
      console.error("handleAddRoomType -> error", error);
      setRoomTypeError(error.response.data);
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
            <div className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="bg-white h-122 overflow-y-auto px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100">
                  <PlusIcon
                    className="h-6 w-6 text-sky-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Thêm loại phòng
                  </DialogTitle>
                  <div className="mt-4 grid lg:grid-cols-2 gap-3">
                    <div className="">
                      <div className="grid sm:grid-cols-6 gap-3">
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="roomTypeName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tên loại phòng
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={roomType.roomTypeName}
                              onChange={(e) => {
                                setRoomType({
                                  ...roomType,
                                  roomTypeName: e.target.value,
                                });
                              }}
                            />
                            <span className="text-sm text-red-500">
                              {roomTypeError?.roomTypeName}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                          <label
                            htmlFor="roomCapacity"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Sức chứa
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={roomType.roomCapacity}
                              min={2}
                              onChange={(e) => {
                                setRoomType({
                                  ...roomType,
                                  roomCapacity: e.target.value,
                                });
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
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="roomArea"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Diện tích
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={roomType.roomArea}
                              min={20}
                              onChange={(e) => {
                                setRoomType({
                                  ...roomType,
                                  roomArea: e.target.value,
                                });
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
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="roomPrice"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Giá phòng/đêm
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={roomType.roomPrice}
                              min={100000}
                              onChange={(e) => {
                                setRoomType({
                                  ...roomType,
                                  roomPrice: e.target.value,
                                });
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
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                          <label
                            htmlFor="numberOfRooms"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số phòng
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={roomType.numberOfRooms}
                              min={10}
                              onChange={(e) => {
                                setRoomType({
                                  ...roomType,
                                  numberOfRooms: e.target.value,
                                });
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="shadow sm:rounded-lg mx-auto max-w-screen-xl">
                        <div
                          id="carouselExampleControls"
                          className="relative"
                          data-twe-carousel-init
                          data-twe-ride="carousel"
                        >
                          <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                            <div
                              className="rounded-lg md:h-96 overflow-y-auto overflow-x-hidden relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                              data-twe-carousel-item
                              data-twe-carousel-active
                            >
                              <img
                                src="https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/368835323.jpg?k=950fe0670632cf0b5a843cac7847a4d9d12f3d010e58a36d21b6615a7b7c1084&o=&s=1024x"
                                className="block w-full object-cover"
                                alt="Wild Landscape"
                              />
                            </div>
                            {roomType.roomImage?.map((image, index) => (
                              <div
                                key={index}
                                className="rounded-lg md:h-96 overflow-hidden relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                data-twe-carousel-item
                              >
                                <img
                                  src={image}
                                  className="block w-full object-cover"
                                  alt="Exotic Fruits"
                                />
                              </div>
                            ))}
                          </div>

                          <button
                            className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                            type="button"
                            data-twe-target="#carouselExampleControls"
                            data-twe-slide="prev"
                          >
                            <span className="inline-block h-8 w-8">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                              </svg>
                            </span>
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                              Previous
                            </span>
                          </button>
                          <button
                            className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                            type="button"
                            data-twe-target="#carouselExampleControls"
                            data-twe-slide="next"
                          >
                            <span className="inline-block h-8 w-8">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </span>
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                              Next
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập url hình ảnh về loại phòng"
                            value={newImage}
                            onChange={(e) => {
                              setNewImage(e.target.value);
                            }}
                          />
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="w-full px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={() => {
                              if (roomType.roomImage.length < 3) {
                                setRoomType({
                                  ...roomType,
                                  roomImage: [...roomType.roomImage, newImage],
                                });
                                setNewImage("");
                              }
                            }}
                          >
                            Thêm hình ảnh
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập vào tiện nghi của loại phòng"
                            value={newFacility}
                            onChange={(e) => {
                              setNewFacility(e.target.value);
                            }}
                          />
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="w-full px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={() => {
                              if (newFacility.length > 0) {
                                setRoomType({
                                  ...roomType,
                                  roomFacilities: [
                                    ...roomType.roomFacilities,
                                    newFacility,
                                  ],
                                });
                                setNewFacility("");
                              }
                            }}
                          >
                            Thêm tiện nghi
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <ul>
                          {roomType.roomFacilities?.map((facility, index) => (
                            <li key={index} className="flex gap-1">
                              <CheckIcon className="h-5 w-5 my-auto text-teal-400" />
                              <span>{facility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập các chi tiết về loại phòng"
                            value={newDetail}
                            onChange={(e) => {
                              setNewDetail(e.target.value);
                            }}
                          />
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="w-full px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={() => {
                              if (newDetail.length > 0) {
                                setRoomType({
                                  ...roomType,
                                  roomDetails: [
                                    ...roomType.roomDetails,
                                    newDetail,
                                  ],
                                });
                                setNewDetail("");
                              }
                            }}
                          >
                            Thêm chi tiết
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <ul>
                          {roomType.roomDetails?.map((detail, index) => (
                            <li className="flex gap-1">
                              <CubeIcon className="h-5 w-5 my-auto text-teal-400" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddRoomType}
                >
                  Tạo mới
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

export default RoomCreate;
