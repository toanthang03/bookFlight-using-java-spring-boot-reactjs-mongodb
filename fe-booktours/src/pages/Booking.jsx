import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Dialog,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  MenuIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/solid";
import Step from "../components/Step";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TourService from "../services/TourService";
import formatPrice from "../utils/format-price";
import TourCard2 from "../components/TourCard2";
import TourCard3 from "../components/TourCard3";
import BreadCrumbs from "../components/BreadCrumbs";
import { GlobalContext } from "../contexts/GlobalProvider";

const paymentMethods = [
  { id: "online", title: "Thanh toán trực tuyến" },
  { id: "in-office", title: "Thanh toán tại văn phòng" },
  { id: "end-of-trip", title: "Thanh toán khi hoàn thành chuyến đi" },
];
const Booking = () => {
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { tourId } = useParams();
  // console.log(location);
  const context = useContext(GlobalContext);
  const [tour, setTour] = useState({});
  const [bookTour, setBookTour] = useState({
    departureDate: location.state?.bookTour.departureDate,
    booker: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      note: "",
    },
    adultNumber: parseInt(location.state?.bookTour.adultNumber),
    childrenNumber: parseInt(location.state?.bookTour.childrenNumber),
    youngChildrenNumber: parseInt(location.state?.bookTour.youngChildrenNumber),
    babyNumber: parseInt(location.state?.bookTour.babyNumber),
    tourServices: [],
  });
  const [bookerError, setBookerError] = useState({});
  // console.log(location.state);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchTour = async () => {
      try {
        const response = await TourService.getTourById(tourId);
        // console.log(response);
        if (response.status === 200) {
          setTour(response.data);
          document.title = `Đặt tour: ${response.data?.tourName}`;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTour();
  }, []);

  const handleBookTour = async () => {
    try {
      const response = await TourService.bookTour(tourId, {
        ...bookTour,
        paymentMethod: paymentMethods[currentPaymentMethod].title,
      });
      console.log(response.data);
      if (response.status !== 200) {
        alert(response?.message);
        setBookerError({});
      } else {
        if (currentPaymentMethod === 0) {
          navigate(`/payment/${tourId}/${response.data}`);
        } else {
          navigate(`/booktour-detail/${tourId}/${response.data}`);
        }
      }
    } catch (error) {
      console.error(error);
      setBookerError(error.response.data);
    }
  };
  return (
    <>
      <div className="container mx-auto">
        <BreadCrumbs
          pages={[
            {
              name: "Trang chủ",
              href: "/",
            },
            {
              name: "Đặt tour",
              href: "#",
            },
          ]}
          other={tour.tourName}
        />
      </div>
      <main className="my-7 bg-white max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <Step currentStep={1} />
          <h1 className="sr-only">Checkout</h1>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Thông tin người đặt tour
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        placeholder="Vui lòng để lại email"
                        value={bookTour.booker.email}
                        onChange={(e) =>
                          setBookTour({
                            ...bookTour,
                            booker: {
                              ...bookTour.booker,
                              email: e.target.value,
                            },
                          })
                        }
                      />
                      <span className="text-red-500 text-sm">
                        {bookerError["booker.email"]}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Họ và tên
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        placeholder="Vui lòng nhập họ và tên"
                        value={bookTour.booker.fullName}
                        onChange={(e) =>
                          setBookTour({
                            ...bookTour,
                            booker: {
                              ...bookTour.booker,
                              fullName: e.target.value,
                            },
                          })
                        }
                      />
                      <span className="text-red-500 text-sm">
                        {bookerError["booker.fullName"]}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Số điện thoại
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        placeholder="Vui lòng nhập số điện thoại"
                        value={bookTour.booker.phone}
                        onChange={(e) =>
                          setBookTour({
                            ...bookTour,
                            booker: {
                              ...bookTour.booker,
                              phone: e.target.value,
                            },
                          })
                        }
                      />
                      <span className="text-red-500 text-sm">
                        {bookerError["booker.phone"]}
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Địa chỉ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        placeholder="Vui lòng nhập địa chỉ"
                        value={bookTour.booker.address}
                        onChange={(e) =>
                          setBookTour({
                            ...bookTour,
                            booker: {
                              ...bookTour.booker,
                              address: e.target.value,
                            },
                          })
                        }
                      />
                      <span className="text-red-500 text-sm">
                        {bookerError["booker.address"]}
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ghi chú
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        className="px-2 pt-2 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                        placeholder="Hãy cho chúng tôi biết yêu cầu của bạn"
                        value={bookTour.booker.note}
                        onChange={(e) =>
                          setBookTour({
                            ...bookTour,
                            booker: {
                              ...bookTour.booker,
                              note: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Vui lòng chọn các dịch vụ đi kèm
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {tour?.tourServices?.map((tourService, index) => (
                    <div className="relative flex items-start" key={index}>
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                          checked={bookTour.tourServices.includes(tourService)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBookTour({
                                ...bookTour,
                                tourServices: [
                                  ...bookTour.tourServices,
                                  tourService,
                                ],
                              });
                            } else {
                              setBookTour({
                                ...bookTour,
                                tourServices: bookTour.tourServices.filter(
                                  (item) => item !== tourService
                                ),
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-700"
                        >
                          {tourService.serviceName} -{" "}
                          {tourService.price > 0
                            ? formatPrice(tourService.price)
                            : "Miễn phí"}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <label className="text-base font-medium text-gray-900">
                  Phương thức thanh toán
                </label>
                <p className="text-sm leading-5 text-gray-500">
                  Bạn có thể chọn phương thức thanh toán phù hợp với bạn
                </p>
                <fieldset className="mt-4">
                  <div className="space-y-4">
                    {paymentMethods.map((paymentMethod, index) => (
                      <div key={paymentMethod.id} className="flex items-center">
                        <input
                          name="payment-method"
                          type="radio"
                          className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                          checked={currentPaymentMethod === index}
                          onChange={() => setCurrentPaymentMethod(index)}
                        />
                        <label
                          htmlFor={paymentMethod.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Chi tiết đặt tour
              </h2>
              <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <div className="w-80 mx-auto md:my-5 my-0">
                  <TourCard3 tour={tour} />
                </div>
                {/* border-t border-gray-200 */}
                <dl className="py-6 px-4 space-y-3 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Giá tour/người</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formatPrice(tour?.price)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Người lớn</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {bookTour.adultNumber}x{formatPrice(tour?.price)}
                    </dd>
                  </div>
                  {bookTour.childrenNumber > 0 && (
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Trẻ em</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {bookTour.childrenNumber}x{formatPrice(tour?.price / 2)}
                        <span className="text-red-500">(-50%)</span>
                      </dd>
                    </div>
                  )}
                  {bookTour.youngChildrenNumber > 0 && (
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Trẻ nhỏ</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {bookTour.youngChildrenNumber}x
                        {formatPrice(tour?.price / 5)}
                        <span className="text-red-500">(-20%)</span>
                      </dd>
                    </div>
                  )}
                  {bookTour.babyNumber > 0 && (
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Em bé</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {bookTour.babyNumber}x{formatPrice(tour?.price / 10)}
                        <span className="text-red-500">(-90%)</span>
                      </dd>
                    </div>
                  )}
                  {bookTour.tourServices.length > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-sm">Các dịch vụ đã đăng kí</dt>
                      <dd>
                        <ul>
                          {bookTour.tourServices.map((tourService, index) => (
                            <li key={index} className="font-medium">
                              {tourService.serviceName} -{" "}
                              <span className="text-red-500">
                                {tourService.price > 0
                                  ? formatPrice(tourService.price)
                                  : "Miễn phí"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                  {context.discounts?.length > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-sm">
                        Các dịch vụ giảm giá được áp dụng
                      </dt>
                      <dd>
                        <ul>
                          {context.discounts
                            ?.filter((discount) => {
                              const startDate = new Date(discount.startDate);
                              const endDate = new Date(startDate); // Tạo bản sao để tránh thay đổi startDate
                              endDate.setDate(
                                startDate.getDate() + discount.duration
                              );

                              const currentDate = new Date();
                              return (
                                startDate <= currentDate &&
                                currentDate <= endDate
                              );
                            })
                            .map((discount, index) => (
                              <li key={index} className="font-medium">
                                {discount.discountName} -{" "}
                                <span className="text-red-500">
                                  {formatPrice(discount.percentDiscount)}%
                                </span>
                              </li>
                            ))}
                          {tour?.discount &&
                            tour?.discount?.discountType === "day" &&
                            tour?.discount?.departureDates?.includes(
                              bookTour.departureDate
                            ) && (
                              <li className="font-medium">
                                {tour?.discount?.discountName} -{" "}
                                <span className="text-red-500">
                                  {formatPrice(tour?.discount?.percentDiscount)}
                                  %
                                </span>
                              </li>
                            )}
                          {tour?.discount &&
                            tour?.discount?.discountType === "people" &&
                            bookTour.adultNumber +
                              bookTour.childrenNumber +
                              bookTour.youngChildrenNumber +
                              bookTour.babyNumber >=
                              tour?.discount?.minPeople && (
                              <li className="font-medium">
                                {tour?.discount?.discountName} -{" "}
                                <span className="text-red-500">
                                  {formatPrice(tour?.discount?.percentDiscount)}
                                  %
                                </span>
                              </li>
                            )}
                        </ul>
                      </dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Tổng tiền</dt>
                    <dd className="text-2xl font-bold text-red-500">
                      {formatPrice(
                        bookTour.adultNumber * tour?.price +
                          bookTour.childrenNumber * (tour?.price / 2) +
                          bookTour.youngChildrenNumber * (tour?.price / 5) +
                          bookTour.babyNumber * (tour?.price / 10) +
                          // Cộng thêm tổng giá trị của các dịch vụ đi kèm
                          bookTour.tourServices.reduce(
                            (acc, sv) => acc + sv.price,
                            0
                          )
                      )}
                      <span className="text-sm text-black">
                      (Sẽ nhận được tổng giá mới sau khi đặt tour)
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <button
                    type="submit"
                    className="w-full bg-sky-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500"
                    onClick={handleBookTour}
                  >
                    Đặt tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Booking;
