import React, { useContext, useEffect, useRef, useState } from "react";
import { initTWE, Carousel } from "tw-elements";
import { QuestionMarkCircleIcon, StarIcon } from "@heroicons/react/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import TourService from "../services/TourService";
import formatDateYYYYMMDD from "../utils/format-date-yyyymmdd";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { NoteData } from "../statics/datas/NoteData";
import formatPrice from "../utils/format-price";
import OtherTours from "../components/OtherTours";
import BreadCrumbs from "../components/BreadCrumbs";
import { GlobalContext } from "../contexts/GlobalProvider";
// import Carousel from "../components/Carousel";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};

const notes = NoteData;
const TourDetail = (props) => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState({});
  const [review, setReview] = useState({
    content: "",
    rating: 1,
  });
  const context = useContext(GlobalContext);
  const [reviewError, setReviewError] = useState({
    content: "",
  });
  const [bookTour, setBookTour] = useState({
    departureDate: new Date().toISOString().split("T")[0],
    adultNumber: 1,
    childrenNumber: 0,
    youngChildrenNumber: 0,
    babyNumber: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    initTWE({ Carousel });
    const fetchTour = async () => {
      try {
        const response = await TourService.getTourById(tourId);
        // console.log(response);
        if (response.status === 200) {
          setTour(response.data);
          document.title = response.data?.tourName;
          setBookTour({
            ...bookTour,
            departureDate: response.data?.departureDates[0],
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTour();
  }, []);

  const handleComment = async () => {
    // Kiểm tra đăng nhập
    if (!props.isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const response = await TourService.reviewTour(tourId, review);
      // console.log(response);
      // Thêm review vào tour
      if (response.status === 200) {
        setTour({
          ...tour,
          reviews: [...tour.reviews, response.data],
        });
      } else {
        alert(response.message);
      }

      setReview({
        content: "",
        rating: 1,
      });
    } catch (error) {
      console.error(error);
      setReviewError(error?.response?.data);
    }
  };

  const handleBookTour = () => {
    // console.log(bookTour);

    // Kiểm tra đăng nhập
    if (!props.isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!props.verifiedEmail) {
      navigate("/verify-email");
      return;
    }

    // Kiểm tra departureDate có trong departureDates của tour không
    if (!tour.departureDates.includes(bookTour.departureDate)) {
      alert("Hiện tại tour không có ngày khởi hành này");
      return;
    }
    // Kiểm tra departureDate đã qua hay chưa
    const departureDate = new Date(bookTour.departureDate);
    const currentDate = new Date();
    if (departureDate < currentDate) {
      alert("Ngày khởi hành không hợp lệ");
      return;
    }
    // Tính tổng số người
    // Chuyển thành số nguyên
    const totalPeople =
      parseInt(bookTour.adultNumber) +
      parseInt(bookTour.childrenNumber) +
      parseInt(bookTour.youngChildrenNumber) +
      parseInt(bookTour.babyNumber);
    // console.log(totalPeople);

    // Lọc các booktour của ngày đang chọn ra và tính số lượng người
    const bookedTour = tour?.bookTours?.filter(
      (bt) => bt.departureDate === bookTour.departureDate
    );
    if (bookedTour.length > 0) {
      const totalBookedPeople = bookedTour.reduce(
        (total, bt) =>
          total +
          bt.adultNumber +
          bt.childrenNumber +
          bt.youngChildrenNumber +
          bt.babyNumber,
        0
      );
      // console.log(totalBookedPeople);

      if (totalBookedPeople + totalPeople > tour.maxPeople) {
        alert(
          "Tour chỉ còn " +
            (tour.maxPeople - totalBookedPeople) +
            " chỗ, vui lòng chọn ngày khác hoặc điều chỉnh số lượng người tham gia"
        );
        return;
      } else {
        navigate(`/booking/${tourId}`, { state: { bookTour } });
      }
    } else {
      navigate(`/booking/${tourId}`, { state: { bookTour } });
    }
  };
  return (
    <>
      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div>
            <BreadCrumbs
              pages={[
                {
                  name: "Trang chủ",
                  href: "/",
                  current: false,
                },
                {
                  name: "Du lịch",
                  href: "/tours",
                  current: true,
                },
              ]}
              other={tour?.tourName}
            />
          </div>
        </div>
        {/* Page header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div>
              <h1 className="md:max-w-xl md:truncate text-3xl font-bold text-gray-900">
                {tour?.tourName}
              </h1>
            </div>
          </div>
          {props.roles?.includes("ROLE_ADMIN") && (
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              <Link
                to={`/admin/tour-update/${tourId}`}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-sky-500"
              >
                Cập nhật chuyến đi
              </Link>
              <Link
                to={`/admin/tour-booking/${tourId}`}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-sky-500"
              >
                Xem thông tin khách hàng
              </Link>
            </div>
          )}
        </div>

        <div className="relative mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Image List */}
            <section aria-labelledby="image-list">
              <div className="bg-white shadow sm:rounded-lg py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
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
                        src={tour?.image}
                        className="block w-full object-cover"
                        alt="Wild Landscape"
                      />
                    </div>
                    {tour?.tourImages?.map((image, index) => (
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
            </section>
            {/* <Carousel images={tour?.tourImages} /> */}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Thông tin chuyến đi
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Chi tiết về chuyến đi{" "}
                    <span className="italic">{tour?.tourName}</span>
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Nơi đến
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {tour?.location?.locationName}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Giá tour
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Từ{" "}
                        <span className="font-semibold">
                          {formatPrice(tour?.price)}
                        </span>
                        /người
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Phương tiện cho chuyến đi
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {tour?.vehicle}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Phụ thu phòng đơn
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Từ{" "}
                        <span className="font-semibold">
                          {formatPrice(tour?.roomPrice)}
                        </span>
                        /người
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Mô tả chuyến đi
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Chi tiết chuyến đi của bạn
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Giới thiệu
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {tour?.description?.split("\n").map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <p className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
                    Xem thêm
                  </p>
                </div>
              </div>
            </section>
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Lộ trình chuyến đi
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Chi tiết lộ trình của bạn
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-y-4">
                    {tour?.itineraries
                      ?.sort((a, b) => a.day - b.day)
                      .map((itinerary, index) => (
                        <Disclosure key={index}>
                          {({ open }) => (
                            <>
                              <DisclosureButton
                                className={`flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-500 bg-gray-50 rounded-t-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75 ${
                                  !open && "rounded-b-lg"
                                }`}
                              >
                                <span>{itinerary?.title}</span>
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
                                {itinerary?.description
                                  .split("\n")
                                  .map((line, index) => (
                                    <p
                                      key={index}
                                      className={`${
                                        index === 0 && "font-semibold"
                                      } italic`}
                                    >
                                      {line}
                                    </p>
                                  ))}
                              </DisclosurePanel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                  </dl>
                </div>
                <div>
                  <p className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
                    Xem thêm
                  </p>
                </div>
              </div>
            </section>
            {/* Dịch vụ đi kèm */}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Dịch vụ đi kèm
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Các dịch vụ đi kèm của chuyến đi
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <ul className="list-disc list-inside">
                    {tour?.tourServices?.map((service, index) => (
                      <li key={index} className="font-normal mt-2">
                        {service.serviceName} -{" "}
                        <span className="text-red-400 font-semibold">
                          {" "}
                          {service.price > 0
                            ? formatPrice(service.price)
                            : "Miễn phí"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
                    Xem thêm
                  </p>
                </div>
              </div>
            </section>
            {/* Lưu ý về chuyến đi */}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Lưu ý chung
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Các điều kiện và lưu ý khi tham gia tour
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-y-4">
                    {notes.map((note, index) => (
                      <Disclosure key={index}>
                        {({ open }) => (
                          <>
                            <DisclosureButton
                              className={`flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-500 bg-sky-50 rounded-t-lg hover:bg-sky-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75 ${
                                !open && "rounded-b-lg"
                              }`}
                            >
                              <span>{note.title}</span>
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
                              {note?.description
                                .split("\n")
                                .map((line, index) => (
                                  <p
                                    key={index}
                                    className="italic text-justify"
                                  >
                                    {line}
                                  </p>
                                ))}
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </dl>
                </div>
                <div>
                  <p className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
                    Xem thêm
                  </p>
                </div>
              </div>
            </section>
            {/* Comments*/}
            <section aria-labelledby="notes-title">
              <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="notes-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      Đánh giá của khách hàng
                    </h2>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    {tour?.reviews?.length > 0 ? (
                      <ul role="list" className="space-y-8">
                        {tour?.reviews?.map((review, index) => (
                          <li key={index}>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-sm">
                                  <Link
                                    to="#"
                                    className="font-medium text-gray-900"
                                  >
                                    {review?.name}
                                  </Link>
                                </div>
                                <div className="mt-1 text-sm">
                                  <div className="flex items-center">
                                    {Array.from({ length: 5 }).map(
                                      (_, index) => (
                                        <StarIcon
                                          key={index}
                                          className={`${
                                            index <= review.rating
                                              ? "text-yellow-400"
                                              : "text-gray-400"
                                          } h-5 w-5`}
                                          onMouseEnter={() =>
                                            setHoveredStar(index)
                                          }
                                          onMouseLeave={() =>
                                            setHoveredStar(null)
                                          }
                                        />
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>{review?.content}</p>
                                </div>
                                <div className="mt-2 text-sm space-x-2">
                                  <span className="text-gray-500 font-medium">
                                    {formatDateYYYYMMDD(review?.reviewDate)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="space-y-8">
                        <h1 className="text-center text-gray-500 font-semibold text-2xl">
                          Hãy là người đầu tiên đánh giá
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <StarIcon
                              key={index}
                              className={`${
                                index < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-400"
                              } h-5 w-5 cursor-pointer`}
                              onMouseEnter={() => setHoveredStar(index)}
                              onMouseLeave={() => setHoveredStar(null)}
                              onClick={() =>
                                setReview({ ...review, rating: index + 1 })
                              }
                            />
                          ))}
                        </div>
                        <div>
                          <label htmlFor="comment" className="sr-only">
                            About
                          </label>
                          <div className="mt-1">
                            <textarea
                              rows={4}
                              name="comment"
                              id="comment"
                              className="px-2 pt-2 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                              placeholder="Nhập bình luận của bạn"
                              value={review.content}
                              onChange={(e) =>
                                setReview({
                                  ...review,
                                  content: e.target.value,
                                })
                              }
                            />
                            <span className="text-red-500">
                              {reviewError?.content}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <Link
                            to="#"
                            className="truncate w-32 group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"
                          >
                            <QuestionMarkCircleIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span>
                              Đánh giá về trả nghiệm của bạn về tour{" "}
                              <span className="text-red-400">
                                {tour?.tourName}
                              </span>
                            </span>
                          </Link>
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            onClick={handleComment}
                          >
                            Đánh giá
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 lg:col-span-1"
          >
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 lg:sticky lg:top-16">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900"
              >
                Đặt tour
              </h2>

              {/* Activity Feed */}
              <div className="mt-6 flow-root">
                <div className="mt-1">
                  <select
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    value={bookTour.departureDate}
                    onChange={(e) =>
                      setBookTour({
                        ...bookTour,
                        departureDate: e.target.value,
                      })
                    }
                  >
                    <option>Chọn ngày xuất phát</option>
                    {tour?.departureDates
                      ?.filter(
                        (date) =>
                          date >=
                          new Date().toISOString().split("T")[0]
                      )
                      .sort()
                      .map((date, index) => (
                        <option
                          key={index}
                          value={date}
                        >
                          {formatDateYYYYMMDD(date)}{" "}
                          {tour?.discount &&
                            tour?.discount?.discountType === "day" &&
                            tour?.discount?.departureDates?.includes(date) && (
                              <span className="text-red-400">
                                {" "}
                                (Giảm giá {tour?.discount.percentDiscount}%)
                              </span>
                            )}{" "}
                          (còn{" "}
                          {
                            // Số chỗ còn trống
                            tour?.maxPeople -
                              tour?.bookTours
                                ?.filter((bt) => bt.departureDate === date)
                                .reduce(
                                  (total, booking) =>
                                    total +
                                    booking.adultNumber +
                                    booking.childrenNumber +
                                    booking.youngChildrenNumber +
                                    booking.babyNumber,
                                  0
                                )
                          }{" "}
                          suất)
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mt-1">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Người lớn
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={bookTour.adultNumber}
                      onChange={(e) =>
                        setBookTour({
                          ...bookTour,
                          adultNumber: e.target.value > 1 ? e.target.value : 1,
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
                <div className="mt-1">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trẻ em(Giảm 50%)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={bookTour.childrenNumber}
                      onChange={(e) =>
                        setBookTour({
                          ...bookTour,
                          childrenNumber:
                            e.target.value > 0 ? e.target.value : 0,
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
                <div className="mt-1">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trẻ nhỏ(Giảm 80%)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={bookTour.youngChildrenNumber}
                      onChange={(e) =>
                        setBookTour({
                          ...bookTour,
                          youngChildrenNumber:
                            e.target.value > 0 ? e.target.value : 0,
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
                <div className="mt-1">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Em bé(Giảm 90%)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={bookTour.babyNumber}
                      onChange={(e) =>
                        setBookTour({
                          ...bookTour,
                          babyNumber: e.target.value > 0 ? e.target.value : 0,
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
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700">
                  Tổng tiền:{" "}
                  <span className="text-red-400 text-3xl font-bold">
                    {/* // Tính giá theo độ tuổi của hành khách
              totalPrice += bookTour.getAdultNumber() * tour.getPrice()
                      + bookTour.getChildrenNumber() * tour.getPrice() * 0.5
                      + bookTour.getYoungChildrenNumber() * tour.getPrice() * 0.2
                      + bookTour.getBabyNumber() * tour.getPrice() * 0.1; */}
                    {formatPrice(
                      bookTour.adultNumber * tour?.price +
                        bookTour.childrenNumber * tour?.price * 0.5 +
                        bookTour.youngChildrenNumber * tour?.price * 0.2 +
                        bookTour.babyNumber * tour?.price * 0.1
                    )}
                  </span>
                </p>
              </div>
              <div className="mt-6 flex flex-col justify-stretch">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  onClick={handleBookTour}
                  disabled={tour?.ready === false}
                >
                  Đặt tour{tour?.ready === false && " (Chưa sẵn sàng)"}
                </button>
                {context.isAuthenticated &&
                  context.profile?.bookingHistories?.length < 1 && (
                    <p>
                      <span className="text-red-500">*</span> Đặt ngay để được
                      giảm 10% cho lần đặt tour đầu tiên
                    </p>
                  )}
                {tour?.discount &&
                  tour?.discount?.discountType === "people" && (
                    <p>
                      <span className="text-red-500">*</span> Giảm{" "}
                      {tour?.discount?.percentDiscount}% hóa đơn đặt tour khi
                      đặt từ {tour?.discount?.minPeople} hành khách trở lên
                    </p>
                  )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <div className="bg-white mt-5 py-10">
        <div className="container mx-auto">
          <div className="flex py-5">
            <h1 className="text-center text-sky-700 font-extrabold text-3xl my-auto">
              Các tour khác
            </h1>
            <Link
              to="/tours"
              className="ml-auto my-auto inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Xem tất cả
            </Link>
          </div>
          <OtherTours sortType="desc" />
        </div>
      </div>
    </>
  );
};

export default TourDetail;
