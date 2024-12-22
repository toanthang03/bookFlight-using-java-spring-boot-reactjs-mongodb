import React from "react";
import { RiVipLine } from "react-icons/ri";
import formatPrice from "../utils/format-price";
import { MdWidthNormal } from "react-icons/md";
import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/solid";

const FlightCard = (props) => {
  return (
    <div className="p-5 bg-white rounded-lg border border-solid shadow-sm cursor-pointer group" onClick={props.onClick}>
      <p className="font-semibold text-xl group-hover:text-sky-700 duration-200">{props.flight?.flightName}</p>
      <div className="flex gap-1 mt-2">
        <img
          src={props.flight?.airline?.logo}
          alt=""
          className="my-auto w-16 object-cover"
        />
        <p className="my-auto">{props.flight?.airline?.airlineName}</p>
      </div>
      <p className="flex gap-1 mt-2">
        <RiVipLine className="text-yellow-300 w-5 h-5 my-auto" />{" "}
        <span className="text-lg font-semibold">
          {formatPrice(props.flight?.vipPrice)}
        </span>
        <span className="text-sm my-auto">(Thương gia)</span>
      </p>
      <p className="flex gap-1 mt-2">
        <MdWidthNormal className="text-gray-300 w-5 h-5 my-auto" />{" "}
        <span className="text-base">
          {formatPrice(props.flight?.normalPrice)}
        </span>
        <span className="text-sm my-auto">(Hạng thường)</span>
      </p>
      <p className="flex gap-1 mt-2">
        <LocationMarkerIcon className="w-5 h-5 text-sky-700"/>
        Từ{" "}
        <span className="text-sky-700">
          {props.flight?.departure?.locationName}
        </span>{" "}
        đến{" "}
        <span className="text-red-500">
          {props.flight?.destination?.locationName}
        </span>
      </p>
      <p className="text-sm italic mt-1">(Nhấn để xem chi tiết thông tin lịch trình bay)</p>
    </div>
  );
};

export default FlightCard;
