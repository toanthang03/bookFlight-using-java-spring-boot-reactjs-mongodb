import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import formatPrice from "../../utils/format-price";

const HotelCard = (props) => {
  return (
    <div
      className="border border-solid p-2 bg-white shadow rounded-lg group cursor-pointer"
      onClick={props.onClick}
    >
      <div className="rounded-lg overflow-hidden">
        <img
          src={props.hotel?.hotelImage[0]}
          alt=""
          className="object-cover h-28 w-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h1 className="mt-2 flex gap-1 font-semibold text-xl line-clamp-2">
        {props.hotel?.hotelName}
      </h1>
      <span className="flex gap-1 my-auto">
        ({props.hotel?.hotelStar}
        <StarIcon className="my-auto w-5 h-5 text-yellow-300" />)
      </span>
      <p className="mt-2 underline text-gray-400 text-sm line-clamp-2">
        {props.hotel?.hotelAddress}
      </p>
      <p className="mt-2 flex gap-2">
        {/* {props.hotel?.services.map((service, index) => (
          <span key={index} className="text-teal-500 text-sm">
            {service}
          </span>
        ))} */}
      </p>
      <div className="flex mt-2">
        <p className="my-auto">Giá mỗi đêm từ:</p>
        <p className="ml-auto my-auto text-orange-400 font-bold text-2xl">
          {formatPrice(props.hotel?.roomTypes[0]?.roomPrice)}
        </p>
      </div>
      <p className="text-sm italic mt-1">
        (Nhấn để xem chi tiết thông tin khách sạn)
      </p>
    </div>
  );
};

export default HotelCard;
