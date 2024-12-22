import React from "react";
import formatPrice from "../utils/format-price";
import { SearchIcon, UserIcon } from "@heroicons/react/solid";
import { LuLuggage } from "react-icons/lu";

const VehicleCard = (props) => {
  return (
    <div className="group bg-white border border-solid grid grid-cols-1 md:grid-cols-7 p-4 rounded-xl gap-3 shadow-sm">
      <div className="md:col-span-2 overflow-hidden rounded-lg">
        <img
          src={props.vehicle?.vehicleImage}
          alt={props.vehicle.vehicleName}
          className="group-hover:scale-110 transform transition-transform duration-500"
        />
      </div>
      <div className="md:col-span-3">
        <p className="font-semibold text-3xl">{props.vehicle?.vehicleName}</p>
        <div className="flex">
          <div className="rounded-lg border border-solid w-auto px-1">
            {props.vehicle?.vehicleType}
          </div>
        </div>
        <div className="flex gap-3">
          <p className="flex">
            <UserIcon className="h-5 w-5 my-auto" />: {props.vehicle?.maxPeople}{" "}
            khách
          </p>
          <p className="flex">
            <LuLuggage className="h-5 w-5 my-auto" />:{" "}
            {props.vehicle?.maxLuggage} vali
          </p>
        </div>
      </div>
      <div className="md:col-span-2">
        <p>
          <span className="text-red-500 text-3xl font-bold">
            {formatPrice(props.vehicle?.vehiclePrice)}
          </span>
          /chuyến
        </p>
        <button
          className="h-10 w-full mt-2 mb-0 px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          onClick={props.select}
        >
          Đặt ngay
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
