import {
  Dialog,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import TourService from "../../services/TourService";
import { Link, useParams } from "react-router-dom";
import isValidImage from "../../utils/isValidImage";
import formatDateYYYYMMDD from "../../utils/format-date-yyyymmdd";
import formatPrice from "../../utils/format-price";
import DiscountDate from "../../components/DiscountDate";
import DiscountPeople from "../../components/DiscountPeople";

const tourTypes = ["Tiêu chuẩn", "Tiết kiệm", "Nghỉ dưỡng", "Phượt", "Cao cấp"];
const vehicles = [
  "Xe ô tô",
  "Xe máy",
  "Xe đạp",
  "Tàu hỏa",
  "Tàu cáp treo",
  "Tàu thuyền",
  "Máy bay",
  "Xe khách",
];
const discountTypes = [
  {
    discountName: "Giảm giá theo ngày khởi hành",
    percentDiscount: 5,
    discountType: "day",
    description: "Đặt tour vào các ngày khởi hành dưới đây sẽ được giảm giá",
    departureDates: [], // Dánh sách các ngày khởi hành được giảm giá
  },
  {
    discountName: "Giảm giá theo lượng hành khách",
    percentDiscount: 5,
    discountType: "people",
    description: "Đặt tour với số lượng hành khách nhất định sẽ được giảm giá",
    minPeople: 10,
  },
];
const TourUpdate = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState({});
  const [newImage, setNewImage] = useState("");
  const [discountTypeSelected, setDiscountTypeSelected] = useState(0);
  const [newDepartureDate, setNewDepartureDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: "",
    price: 0,
  });
  const [newServiceError, setNewServiceError] = useState({
    serviceName: "",
  });
  useEffect(() => {
    document.title = "Quản lý tour du lịch";
    window.scrollTo(0, 0);

    const fetchTour = async () => {
      try {
        const response = await TourService.getTourById(tourId);
        // console.log(response);
        if (response.status === 200) {
          setTour(response.data);
          document.title = `Cập nhật tour ${response.data?.tourName}`;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTour();
  }, []);

  const handleChange = async () => {
    try {
      const response = await TourService.saveTour(tourId, {
        ...tour,
        tourType: tour.tourType.normalize("NFC"),
        vehicle: tour.vehicle.normalize("NFC"),
      });
      console.log(response);
      if (response?.status === 200) {
        alert("Cập nhật thành công");
      } else {
        alert("Có lỗi xảy ra(" + response?.message + ")");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddImage = () => {
    // Kiểm tra newImage có giá trị không
    if (newImage) {
      // isValidImage(newImage).then((isValid) => {
      //   if (isValid) {
      //     setTour({
      //       ...tour,
      //       tourImages: [...tour.tourImages, newImage],
      //     });
      //     setNewImage("");
      //   } else {
      //     alert("Link hình ảnh không hợp lệ");
      //   }
      // });
      // setTour({
      //   ...tour,
      //   tourImages: [...tour.tourImages, newImage],
      // });
      // setNewImage("");
    }
    setTour({
      ...tour,
      tourImages: [...tour.tourImages, newImage],
    });
    setNewImage("");
  };

  const handleAddService = () => {
    if (!newService.serviceName) {
      setNewServiceError({
        ...newServiceError,
        serviceName: "Tên dịch vụ không được để trống",
      });
      return;
    }
    setTour({
      ...tour,
      tourServices: [...tour.tourServices, newService],
    });
    setNewService({
      serviceName: "",
      price: 0,
    });
    setNewServiceError({
      serviceName: "",
    });
  };

  const handleAddDepartureDate = () => {
    // Nếu là ngày của quá khứ thì không thêm
    if (new Date(newDepartureDate) < new Date()) {
      alert("Ngày không hợp lệ");
      return;
    }
    // Nếu ngày đã tồn tại thì không thêm
    if (
      tour.departureDates?.find(
        (date) => date.split("T")[0] === newDepartureDate
      )
    ) {
      alert("Ngày đã tồn tại");
      return;
    }
    setTour({
      ...tour,
      departureDates: [...tour.departureDates, newDepartureDate],
    });
  };

  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed  inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PlusIcon
                      className="h-6 w-6 text-sky-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Dịch vụ giảm giá
                    </DialogTitle>
                    <div className="mt-2">
                      <fieldset className="mt-4">
                        <legend className="sr-only">Notification method</legend>
                        {discountTypes.map((discountType, index) => (
                          <div
                            key={index}
                            className="mt-4 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10"
                          >
                            <div className="flex items-center">
                              <input
                                name="discount_type"
                                type="radio"
                                className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                                checked={discountTypeSelected === index}
                                onChange={() => setDiscountTypeSelected(index)}
                              />
                              <label
                                htmlFor={discountType.discountType}
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                {discountType.discountName}
                              </label>
                            </div>
                          </div>
                        ))}
                      </fieldset>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpen(false);
                      setTour({
                        ...tour,
                        discount: discountTypes[discountTypeSelected],
                      });
                    }}
                  >
                    Chọn
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Cập nhật tour
            </h1>
            <p className="text-gray-500 italic">
              Cập nhật thông tin tour du lịch
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
                        <div className="col-span-6">
                          <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Hình ảnh
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={tour?.image}
                              onChange={(e) =>
                                setTour({ ...tour, image: e.target.value })
                              }
                            />
                            <Link
                              to={tour?.image}
                              target="blank"
                              className="text-sky-600 underline"
                            >
                              Xem trước
                            </Link>
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="tourName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tên tour
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={tour?.tourName}
                              onChange={(e) =>
                                setTour({ ...tour, tourName: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Điểm đến
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={tour?.location?.locationName}
                              onChange={(e) =>
                                setTour({
                                  ...tour,
                                  location: {
                                    locationName: e.target.value,
                                  },
                                })
                              }
                              disabled
                            />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Dòng tour
                          </label>
                          <div className="mt-1">
                            <select
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={tour?.tourType}
                              onChange={(e) =>
                                setTour({ ...tour, tourType: e.target.value })
                              }
                            >
                              {tourTypes.map((tourType, index) => (
                                <option key={index} value={tourType}>
                                  {tourType}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phương tiện
                          </label>
                          <div className="mt-1">
                            <select
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={tour?.vehicle}
                              onChange={(e) =>
                                setTour({ ...tour, vehicle: e.target.value })
                              }
                            >
                              {vehicles.map((vehicle) => (
                                <option key={vehicle} value={vehicle}>
                                  {vehicle}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="maxPeople"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số người tối đa
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={tour?.maxPeople}
                              onChange={(e) =>
                                setTour({ ...tour, maxPeople: e.target.value })
                              }
                              onKeyDown={(e) => {
                                if (
                                  e.key === "-" ||
                                  e.key === "e" ||
                                  e.key === "E"
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Giá khởi điểm
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={tour?.price}
                              onChange={(e) =>
                                setTour({ ...tour, price: e.target.value })
                              }
                              onKeyDown={(e) => {
                                if (
                                  e.key === "-" ||
                                  e.key === "e" ||
                                  e.key === "E"
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="roomPrice"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phụ thu phòng đơn
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={tour?.roomPrice}
                              onChange={(e) =>
                                setTour({ ...tour, roomPrice: e.target.value })
                              }
                              onKeyDown={(e) => {
                                if (
                                  e.key === "-" ||
                                  e.key === "e" ||
                                  e.key === "E"
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mô tả
                          </label>
                          <div className="mt-1">
                            <textarea
                              rows={4}
                              className="px-2 pt-2 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                              value={tour?.description}
                              onChange={(e) =>
                                setTour({
                                  ...tour,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="ready"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Sẵn sàng
                          </label>
                          <div className="mt-1">
                            <select
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                              value={tour?.ready ? "Sẵn sàng" : "Chưa sẵn sàng"}
                              onChange={(e) =>
                                setTour({
                                  ...tour,
                                  ready:
                                    e.target.value === "Sẵn sàng"
                                      ? true
                                      : false,
                                })
                              }
                            >
                              <option value="Sẵn sàng">Sẵn sàng</option>
                              <option value="Chưa sẵn sàng">
                                Chưa sẵn sàng
                              </option>
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
                <div className="mt-5">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                      <h1 className="text-2xl font-semibold">
                        Các hình ảnh liên quan
                      </h1>
                      <div className="border border-solid h-52 rounded-lg overflow-y-auto p-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                          {tour?.tourImages?.map((image, index) => (
                            <div key={index} className="relative">
                              <div
                                className="w-5 h-5 absolute top-1 right-1 cursor-pointer group"
                                onClick={() =>
                                  setTour({
                                    ...tour,
                                    tourImages: tour.tourImages.filter(
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
                      <div className="grid gap-3">
                        <div className="">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập link hình ảnh"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                          />
                        </div>
                        <div className="xl:flex">
                          <button
                            type="button"
                            className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={handleAddImage}
                          >
                            Thêm hình ảnh
                            <PlusIcon
                              className="ml-2 -mr-1 h-5 w-5"
                              aria-hidden="true"
                            />
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
                      <h1 className="text-2xl font-semibold">Lộ trình</h1>
                      {tour?.itineraries
                        ?.sort((a, b) => a.day - b.day)
                        .map((itinerary, index) => (
                          <Disclosure key={index}>
                            {({ open }) => (
                              <>
                                <DisclosureButton
                                  className={`flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-500 bg-gray-50 rounded-t-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75 ${
                                    !open && "rounded-b-lg"
                                  }`}
                                >
                                  <span>
                                    Lộ trình {index + 1}
                                    {index === tour.itineraries.length - 1 && (
                                      <span
                                        className="text-red-500"
                                        onClick={() =>
                                          setTour({
                                            ...tour,
                                            itineraries:
                                              tour.itineraries.filter(
                                                (item, i) => i !== index
                                              ),
                                          })
                                        }
                                      >
                                        (Xóa)
                                      </span>
                                    )}
                                  </span>
                                  {open ? (
                                    <MinusCircleIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5 text-gray-500`}
                                    />
                                  ) : (
                                    <PlusCircleIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5 text-gray-500`}
                                    />
                                  )}
                                </DisclosureButton>
                                <DisclosurePanel className="text-gray-700 border border-solid grid gap-3 p-3 rounded-b-lg">
                                  <div>
                                    <input
                                      id="text"
                                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                      value={itinerary?.title}
                                      onChange={(e) =>
                                        setTour({
                                          ...tour,
                                          itineraries: tour.itineraries.map(
                                            (item, i) =>
                                              i === index
                                                ? {
                                                    ...item,
                                                    title: e.target.value,
                                                  }
                                                : item
                                          ),
                                        })
                                      }
                                    />
                                  </div>
                                  <div>
                                    <textarea
                                      rows={4}
                                      className="px-2 pt-2 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                                      value={itinerary?.description}
                                      onChange={(e) =>
                                        setTour({
                                          ...tour,
                                          itineraries: tour.itineraries.map(
                                            (item, i) =>
                                              i === index
                                                ? {
                                                    ...item,
                                                    description: e.target.value,
                                                  }
                                                : item
                                          ),
                                        })
                                      }
                                    />
                                  </div>
                                </DisclosurePanel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      <h1
                        className="underline text-sky-500 hover:text-sky-600 text-center cursor-pointer"
                        onClick={() =>
                          setTour({
                            ...tour,
                            itineraries: [
                              ...tour.itineraries,
                              {
                                day: tour.itineraries.length + 1,
                                title: `Tiêu đề cho lộ trình ${
                                  tour.itineraries.length + 1
                                }`,
                                description: `Mô tả cho lộ trình ${
                                  tour.itineraries.length + 1
                                }`,
                              },
                            ],
                          })
                        }
                      >
                        Thêm lộ trình
                      </h1>
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
                        Các ngày khởi hành
                      </h1>
                      <div className="grid gap-3">
                        <div className="">
                          <input
                            type="date"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={newDepartureDate}
                            onChange={(e) =>
                              setNewDepartureDate(e.target.value)
                            }
                          />
                        </div>
                        <div className="xl:flex">
                          <button
                            type="button"
                            className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={handleAddDepartureDate}
                          >
                            Thêm ngày mới
                            <PlusIcon
                              className="ml-2 -mr-1 h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                      <div>
                        <ul className="list-disc list-inside">
                          {tour?.departureDates?.sort().map((date, index) => (
                            <li key={index}>
                              {formatDateYYYYMMDD(date)}{" "}
                              <span
                                className="text-red-500 cursor-pointer"
                                onClick={() =>
                                  setTour({
                                    ...tour,
                                    departureDates: tour.departureDates.filter(
                                      (item, i) => i !== index
                                    ),
                                  })
                                }
                              >
                                (Xóa)
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
                <div className="mt-5">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                      <h1 className="text-2xl font-semibold">
                        Các dịch vụ đi kèm
                      </h1>
                      <div className="grid xl:grid-cols-6 gap-3">
                        <div className="xl:col-span-4">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder="Nhập tên dịch vụ"
                            value={newService.serviceName}
                            onChange={(e) =>
                              setNewService({
                                ...newService,
                                serviceName: e.target.value,
                              })
                            }
                          />
                          <span className="text-red-500 text-sm">
                            {newServiceError.serviceName}
                          </span>
                        </div>
                        <div className="xl:col-span-2">
                          <input
                            type="number"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            step={5000}
                            value={newService.price}
                            onChange={(e) =>
                              setNewService({
                                ...newService,
                                price: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (
                                e.key === "-" ||
                                e.key === "e" ||
                                e.key === "E"
                              ) {
                                e.preventDefault();
                              }
                            }}
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /[^0-9.]/g,
                                ""
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="xl:flex">
                        <button
                          type="button"
                          className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          onClick={handleAddService}
                        >
                          Thêm dịch vụ
                          <PlusIcon
                            className="ml-2 -mr-1 h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div>
                        <ul className="list-disc list-inside">
                          {tour?.tourServices?.map((service, index) => (
                            <li key={index}>
                              {service.serviceName} -{" "}
                              {service.price > 0
                                ? formatPrice(service.price)
                                : "Miễn phí"}{" "}
                              <span
                                className="text-red-500 cursor-pointer"
                                onClick={() =>
                                  setTour({
                                    ...tour,
                                    tourServices: tour?.tourServices.filter(
                                      (item, i) => i !== index
                                    ),
                                  })
                                }
                              >
                                (Xóa)
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
                <div className="mt-5">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                      <h1 className="text-2xl font-semibold">
                        Dịch vụ giảm giá
                      </h1>
                      {tour?.discount &&
                        (tour?.discount?.discountType === "day" ? (
                          <DiscountDate tour={tour} setTour={setTour} />
                        ) : (
                          <DiscountPeople tour={tour} setTour={setTour} />
                        ))}
                      <div className="xl:flex gap-3">
                        <button
                          type="button"
                          className="xl:ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          onClick={() => setOpen(true)}
                        >
                          {!tour?.discount ? "Thêm" : "Thay đổi"} dịch vụ
                          <PlusIcon
                            className="ml-2 -mr-1 h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        {tour?.discount && (
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={() => setTour({ ...tour, discount: null })}
                          >
                            Gỡ dịch vụ
                            <TrashIcon
                              className="ml-2 -mr-1 h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        )}
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
            </div>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default TourUpdate;
