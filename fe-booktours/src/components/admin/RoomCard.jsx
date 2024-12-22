import React, { useState } from "react";
import formatPrice from "../../utils/format-price";

const RoomCard = (props) => {
  const [imageSelected, setImageSelected] = useState(0);
  return (
    <div className="p-5 bg-white border border-solid shadow-md rounded-lg">
      <h1 className="uppercase font-semibold text-xl">
        {props.roomType?.roomTypeName}{" "}
        <span
          className="text-sky-500 hover:text-sky-700 lowercase duration-150 text-base font-normal italic cursor-pointer"
          onClick={props.onChange}
        >
          Chỉnh sửa
        </span>
      </h1>
      <div className="mt-2 grid grid-cols-9 gap-3">
        <div className="col-span-3">
          <div className="overflow-hidden w-full h-36">
            <img src={props.roomType?.roomImage[imageSelected]} alt="" className="object-cover" />
          </div>
          <div className="mt-1 grid grid-cols-3 gap-1">
            {props.roomType?.roomImage?.map((image, index) => (
              <div key={index} className="overflow-hidden">
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="h-full object-cover cursor-pointer hover:scale-110 transform transition-transform duration-500"
                  onClick={() => setImageSelected(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-6 grid grid-cols-3">
          <div>
            <ul className="list-disc list-inside">
              <li className="mt-2">Sức chứa: {props.roomType?.roomCapacity}</li>
              <li className="mt-2">Diện tích: {props.roomType?.roomArea}</li>
              <li className="mt-2">
                Giá: {formatPrice(props.roomType?.roomPrice)}
              </li>
              <li className="mt-2">
                Số lượng: {props.roomType?.numberOfRooms}
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-disc list-inside">
              {props.roomType?.roomFacilities?.map(
                (facilities, index) =>
                  index < 7 && (
                    <li key={index} className="mt-2">
                      {facilities}
                    </li>
                  )
              )}
              {props.roomType?.roomFacilities?.length > 7 && (
                <li className="mt-2">...</li>
              )}
            </ul>
          </div>
          <div>
            <ul className="list-disc list-inside">
              {props.roomType?.roomDetails?.map(
                (detail, index) =>
                  index < 7 && (
                    <li key={index} className="mt-2 line-clamp">
                      {detail}
                    </li>
                  )
              )}
              {props.roomType?.roomDetails?.length > 7 && (
                <li className="mt-2">...</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
