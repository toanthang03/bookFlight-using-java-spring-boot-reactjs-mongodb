import {
  CheckIcon,
  PlusIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { BiSquare } from "react-icons/bi";
import { HiHomeModern } from "react-icons/hi2";
import { initTWE, Carousel } from "tw-elements";
import formatPrice from "../../utils/format-price";

const RoomCard = (props) => {
  useEffect(() => {
    initTWE({ Carousel });
  }, []);

  return (
    <div className="rounded-lg bg-white shadow border border-solid p-5">
      <h1 className="font-bold text-xl uppercase">
        {props.roomType?.roomTypeName}
      </h1>
      <div className="mt-5 shadow sm:rounded-lg mx-auto max-w-screen-xl">
        <div
          id="carouselExampleControls"
          className="relative"
          data-twe-carousel-init
          data-twe-ride="carousel"
        >
          <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
            <div
              className="rounded-lg md:h-96 overflow-hidden relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-item
              data-twe-carousel-active
            >
              <img
                src={
                  props.roomType?.roomImage.length > 0
                    ? props.roomType?.roomImage[0]
                    : "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/368835329.jpg?k=68bc8b0fef39ddfb228078c336d98c79f7efd108ccfd3259f156ecaab5e73281&o=&s=1024x"
                }
                className="block w-full object-cover"
                alt="Wild Landscape"
              />
            </div>
            {props.roomType?.roomImage?.map((image, index) => (
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
      <div className="mt-5">
        <p className="flex gap-1">
          <UserGroupIcon className="w-5 h-5" /> Sức chứa:{" "}
          {props.roomType?.roomCapacity} người
        </p>
        <p className="flex gap-1">
          <BiSquare className="w-5 h-5" /> Diện tích: {props.roomType?.roomArea}{" "}
          m2
        </p>
      </div>
      <div className="mt-5">
        <h2 className="text-lg font-semibold">Các tiện ích được hỗ trợ</h2>
        <ul className="mt-2">
          {props.roomType?.roomFacilities.map((facility, index) => (
            <li key={index} className="flex gap-1">
              <CheckIcon className="w-5 h-5 text-teal-500" /> {facility}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <h2 className="text-lg font-semibold">Chi tiết loại phòng</h2>
        <ul className="mt-2">
          {props.roomType?.roomDetails?.map((detail, index) => (
            <li key={index} className="flex gap-1">
              <PlusIcon className="w-5 h-5 text-teal-500" /> {detail}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 flex">
        <div>
          <p>Số phòng có sẵn: {props.roomType?.numberOfRooms}</p>
          <p className="">
            Giá/đêm:{" "}
            <span className="text-orange-400 font-bold text-2xl">
              {formatPrice(props.roomType?.roomPrice)}
            </span>{" "}
          </p>
        </div>
        <button
          className="ml-auto h-full mt-auto mb-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          onClick={props.onClick}
        >
          <HiHomeModern className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Đặt phòng ngay
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
