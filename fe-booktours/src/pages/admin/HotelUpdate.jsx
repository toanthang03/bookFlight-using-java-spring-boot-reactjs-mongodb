import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import HotelService from "../../services/HotelService";
import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import RoomCard from "../../components/admin/RoomCard";
import RoomCreate from "../../components/admin/RoomCreate";
import RoomEdit from "../../components/admin/RoomEdit";

const HotelUpdate = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [open2, setOpen2] = useState(false);
  const cancelButtonRef2 = useRef(null);
  const { hotelCode } = useParams();
  const [newImage, setNewImage] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [hotel, setHotel] = useState({});
  const [roomTypeSelected, setRoomTypeSelected] = useState(-1);

  useEffect(() => {
    document.title = "Cập nhật thông tin khách sạn";
    const fetchHotel = async () => {
      try {
        const response = await HotelService.getHotel(hotelCode);
        // console.log(response.data);
        setHotel(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotel();
  }, []);

  const handleChange = async () => {
    try {
      const response = await HotelService.updateHotel(hotelCode, hotel);
      if (response.status === 200) {
        alert("Cập nhật thành công");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddImage = () => {
    if (newImage.length > 1) {
      setHotel({ ...hotel, hotelImage: [...hotel.hotelImage, newImage] });
      setNewImage("");
    }
  };

  const handleAddFacility = () => {
    // Thêm tiện ích mới
    if (newFacility.length > 1) {
      setHotel({
        ...hotel,
        hotelFacilities: [...hotel.hotelFacilities, newFacility],
      });
      setNewFacility("");
    }
  };

  const handleEdit = (roomType) => {
    console.log(roomType);
    if (roomTypeSelected > -1) {
      setHotel({
        ...hotel,
        roomTypes: hotel.roomTypes.map((item, index) =>
          index === roomTypeSelected ? roomType : item
        ),
      });
      setOpen2(false);
    }
  }

  const handleAdd = (roomType) => {
    setHotel({
      ...hotel,
      roomTypes: [...hotel.roomTypes, roomType],
    });
    setOpen(false);
  }

  return (
    <>
      <RoomCreate
        cancelButtonRef={cancelButtonRef}
        open={open}
        setOpen={setOpen}
        handleAdd={handleAdd}
        hotelCode={hotelCode}
      />
      {roomTypeSelected > -1 && (
        <RoomEdit
          open={open2}
          setOpen={setOpen2}
          cancelButtonRef={cancelButtonRef2}
          roomType={hotel?.roomTypes[roomTypeSelected]}
          handleEdit={handleEdit}
        />
      )}
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Cập nhật khách sạn {hotel?.hotelName}
            </h1>
            <p className="text-gray-500 italic">
              Cập nhật thông tin của khách sạn {hotel?.hotelName}
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
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="hotelName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tên khách sạn(không chỉnh sửa)
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.hotelName}
                              onChange={(e) =>
                                setHotel({
                                  ...hotel,
                                  hotelName: e.target.value,
                                })
                              }
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="hotelName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Thuộc tỉnh/thành phố(không chỉnh sửa)
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.location?.locationName}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                          <label
                            htmlFor="hotelStar"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số sao
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.hotelStar}
                              min={1}
                              max={5}
                              onChange={(e) =>
                                setHotel({
                                  ...hotel,
                                  hotelStar: e.target.value,
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
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="hotelAddress"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Địa chỉ
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.hotelAddress}
                              onChange={(e) =>
                                setHotel({
                                  ...hotel,
                                  hotelAddress: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="hotelEmail"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.hotelEmail}
                              onChange={(e) =>
                                setHotel({
                                  ...hotel,
                                  hotelEmail: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                          <label
                            htmlFor="hotelPhone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số điện thoại
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.hotelPhone}
                              onChange={(e) =>
                                setHotel({
                                  ...hotel,
                                  hotelPhone: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="hotelDescription"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mô tả
                          </label>
                          <div className="mt-1">
                            <textarea
                              rows={4}
                              className="px-2 pt-2 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                              value={hotel?.hotelDescription}
                              onChange={(e) =>
                                setHotel({
                                  ...hotel,
                                  hotelDescription: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="ready"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Trạng thái hoạt động
                          </label>
                          <div className="mt-1">
                            <select
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={hotel?.active ? "1" : "0"}
                              onChange={(e) =>
                                setHotel({
                                  ...hotel,
                                  active: parseInt(e.target.value) === 1,
                                })
                              }
                            >
                              <option value="1">Đang hoạt động</option>
                              <option value="0">Dừng hoạt động</option>
                            </select>
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
              </div>
              <div className="lg:col-span-2 rounded-lg">
                <div className="">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                      <h1 className="text-2xl font-semibold">
                        Các hình ảnh liên quan
                      </h1>
                      <div className="border border-solid h-52 rounded-lg overflow-y-auto p-3">
                        <div className="grid grid-cols-3 gap-3">
                          {hotel?.hotelImage?.map((image, index) => (
                            <div key={index} className="relative">
                              <div
                                className="w-5 h-5 absolute top-1 right-1 cursor-pointer group"
                                onClick={() =>
                                  setHotel({
                                    ...hotel,
                                    hotelImage: hotel.hotelImage.filter(
                                      (item, i) => i !== index
                                    ),
                                  })
                                }
                              >
                                <TrashIcon className="text-sky-500 duration-300 group-hover:text-sky-200" />
                              </div>
                              <img
                                src={image}
                                alt=""
                                className="object-cover h-20 w-full rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập link hình ảnh"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                          />
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="w-full px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={handleAddImage}
                          >
                            Thêm hình
                          </button>
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
                        Các tiện ích đi kèm
                      </h1>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập tiện ích mới"
                            value={newFacility}
                            onChange={(e) => setNewFacility(e.target.value)}
                          />
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="w-full px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={handleAddFacility}
                          >
                            Thêm tiện ích
                          </button>
                        </div>
                      </div>
                      <div>
                        <ul className="list-disc list-inside">
                          {hotel?.hotelFacilities?.map((facility, index) => (
                            <li key={index}>
                              {facility}
                              <span
                                className="text-red-500 cursor-pointer"
                                onClick={() =>
                                  setHotel({
                                    ...hotel,
                                    hotelFacilities:
                                      hotel.hotelFacilities.filter(
                                        (item, i) => i !== index
                                      ),
                                  })
                                }
                              >
                                (Remove)
                              </span>
                            </li>
                          ))}
                        </ul>
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
              </div>
              <div className="lg:col-span-5 rounded-lg">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <h1 className="text-2xl font-semibold">
                      Danh mục các loại phòng{" "}
                      <span
                        className="text-sky-500 hover:text-sky-700 underline duration-150 text-base font-normal italic cursor-pointer"
                        onClick={() => setOpen(true)}
                      >
                        Thêm loại phòng mới
                      </span>
                    </h1>
                    <div className="grid gap-3">
                      {hotel?.roomTypes?.map((roomType, index) => (
                        <RoomCard
                          key={index}
                          roomType={roomType}
                          onChange={() => {
                            setRoomTypeSelected(index);
                            setOpen2(true);
                          }}
                        />
                      ))}
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
            </div>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default HotelUpdate;
