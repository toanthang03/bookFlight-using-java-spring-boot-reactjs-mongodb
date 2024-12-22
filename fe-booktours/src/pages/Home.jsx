import React, { useContext, useEffect, useState } from "react";
import TourSearchBox from "../components/TourSearchBox";
import FlightSearchBox from "../components/FlightSearchBox";
import HotelSearchBox from "../components/HotelSearchBox";
import { Link, useNavigate } from "react-router-dom";
import OtherTours from "../components/OtherTours";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import DiscountService from "../services/DiscountService";
import { GlobalContext } from "../contexts/GlobalProvider";
import AirportTransferSearchBox from "../components/AirportTransferSearchBox";
import OtherFlight from "../components/OtherFlight";

const tabs = [
  {
    header: "Lựa chọn những tour du lịch phù hợp với nhu cầu của bạn",
    title: "Tour du lịch",
    component: TourSearchBox,
  },
  {
    header: "Lựa chọn những chuyến bay phù hợp với nhu cầu của bạn",
    title: "Vé máy bay",
    component: FlightSearchBox,
  },
  {
    header: "Lựa chọn những khánh sạn làm cho bạn cảm thấy thoải mái",
    title: "Khách sạn",
    component: HotelSearchBox,
  },
  {
    header: "Giúp bạn di chuyển một cách thuận tiện và nhanh chóng",
    title: "Đưa đón sân bay",
    component: AirportTransferSearchBox,
  },
];

const whyChooseUs = [
  {
    title: "Đảm bảo giá tốt nhất",
    description: "Chúng tôi cung cấp giá tốt nhất cho tất cả các tour du lịch",
    icon: "/src/assets/img/featureIcons/3/1.svg",
  },
  {
    title: "Đặt phòng dễ dàng & nhanh chóng",
    description: " Chúng tôi cung cấp dịch vụ đặt phòng nhanh chóng và dễ dàng",
    icon: "/src/assets/img/featureIcons/3/2.svg",
  },
  {
    title: "Chăm sóc khách hàng 24/7",
    description: "Chúng tôi luôn sẵn lòng hỗ trợ khách hàng 24/7",
    icon: "/src/assets/img/featureIcons/3/3.svg",
  },
];

const hotelData = [
  {
    id: "ba-ria-vung-tau",
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_334740/9ebd50e91e3ca8c657b2b74521d41cc9.jpg",
    name: "Khách sạn ở Vũng Tàu",
  },
  {
    id: "ha-noi",
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_335324/69f8a5cff57f1e53f14dab6b0ddc2ab7.jpg",
    name: "Khách sạn ở Hà Nội",
  },
  {
    id: "sai-gon",
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_312508/473c2077df2722e1d8afdf3eb30eadea.jpg",
    name: "Khách sạn Sài Gòn",
  },
  {
    id: "khanh-hoa",
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_312522/fa23c83d7b5fa728de3b93773bde4e38.jpg",
    name: "Khách sạn Khách Hòa",
  },
  {
    id: "da-nang",
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_334946/24ce1389906d469cda33cc033a8295c7.jpg",
    name: "Khách sạn Đà Nẵng",
  },
  {
    id: "hai-phong",
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_312504/700bcf731a3e6ca1fdff21d30dfe1da0.jpg",
    name: "Khách sạn Hải Phòng",
  },
  {
    id: "phu-yen",
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_312560/ab1e3223813f92ae9a4b0868849b3831.jpg",
    name: "Khách sạn Phú Yên",
  },
  {
    id: "quang-ninh",
    img: "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_312517/d7aa570209684218dd0cd6add3f76f03.jpg",
    name: "Khách sạn Quảng Ninh",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const CurrentComponent = tabs[currentTab].component;
  const context = useContext(GlobalContext);
  useEffect(() => {
    document.title = "GoTrip - Trang chủ";
    window.scrollTo(0, 0);
    setCurrentTab(0);
  }, []);

  return (
    <>
      <div
        className={`flex bg-cover saturate-50 bg-center h-122 mt-5 border border-solid bg-[url('/src/assets/img/destinations/2/4.png')]`}
      >
        <div className="shadow-md -mb-8 mt-auto mx-auto md:w-[800px] lg:w-[1000px] bg-white p-5 rounded-lg">
          <h3 className="text-center text-gray-700 mt-5 text-3xl uppercase font-bold">
            {tabs[currentTab].header}
          </h3>
          <div className="mt-5">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex gap-6">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`shrink-0 text-sm font-medium p-3 border ${
                      currentTab === index
                        ? "rounded-t-lg border-gray-300 border-b-white text-sky-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 focus:outline-none"
                    }`}
                    onClick={() => setCurrentTab(index)}
                  >
                    {tab.title}
                  </button>
                ))}
              </nav>
            </div>
            <CurrentComponent />
          </div>
        </div>
      </div>
      <div className="bg-white mt-14">
        <section aria-labelledby="image-list">
          <div className="sm:rounded-lg py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
              <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
                <Link
                  to=""
                  className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
                >
                  <img
                    src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                </Link>
              </div>
              <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
                <Link
                  to=""
                  className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4"
                >
                  <img
                    src="https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                </Link>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                  <Link
                    to=""
                    className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  </Link>
                  <Link
                    to=""
                    className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1626897505254-e0f811aa9bf7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  </Link>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
                <Link
                  to=""
                  className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
                >
                  <img
                    src="https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-white mt-5">
        {context.discounts?.length > 0 &&
          context.discounts
            ?.filter((discount) => {
              const startDate = new Date(discount.startDate);
              const endDate = new Date(startDate); // Tạo bản sao để tránh thay đổi startDate
              endDate.setDate(startDate.getDate() + discount.duration);

              const currentDate = new Date();
              return startDate <= currentDate && currentDate <= endDate;
            })
            .map((discount, index) => (
              <div
                key={index}
                className="sm:rounded-lg py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <img
                      src={discount.poster}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-center text-sky-700 font-extrabold text-3xl my-10">
                      {discount.discountName}
                    </h1>
                    <p className="text-center text-lg">
                      {discount.description}
                    </p>
                    <div className="flex justify-center mt-5">
                      <Link
                        to="/tours"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Xem ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div className="bg-white mt-5">
        <div className="sm:rounded-lg py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
          <h1 className="text-center text-sky-700 font-extrabold text-3xl my-10">
            Tại sao chọn chúng tôi
          </h1>
          <div className="grid md:grid-cols-3 gap-5">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="grid gap-4 border border-solid shadow p-5 rounded-xl"
              >
                <img src={item.icon} alt="" className="mx-auto w-24 h-24" />
                <div className="grid">
                  <h3 className="mx-auto text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mx-auto text-center text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-sky-50 mt-5 py-10">
        <div className="container mx-auto">
          <div className="flex py-5">
            <h1 className="text-center text-sky-700 font-extrabold text-3xl my-auto">
              Các tour bình dân
            </h1>
            <Link
              to="/tours"
              className="ml-auto my-auto inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Xem tất cả
            </Link>
          </div>
          <OtherTours sortType="asc" />
        </div>
      </div>
      <div className="relative bg-sky-800">
        <div className="h-56 bg-blue-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
          <img
            className="w-full h-full object-cover"
            src="/src/assets/img/destinations/2/4.png"
            alt=""
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="md:ml-auto md:w-1/2 md:pl-10">
            <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
              Dịch vụ hỗ trợ khách hàng chuyên nghiệp
            </h2>
            <p className="mt-2 text-white text-xl font-extrabold tracking-tight sm:text-4xl">
              Chúng tôi sẵn sàng hỗ trợ chuyến đi của bạn
            </p>
            <p className="mt-3 text-lg text-gray-300">
              Đội ngũ hỗ trợ khách hàng của chúng tôi sẽ luôn sẵn sàng giải đáp
              mọi thắc mắc và hỗ trợ bạn từ khâu đặt tour cho đến khi kết thúc
              chuyến đi. Với nhiều năm kinh nghiệm, chúng tôi cam kết mang lại
              trải nghiệm du lịch hoàn hảo và đáng nhớ.
            </p>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
                >
                  Tìm hiểu thêm
                  <ExternalLinkIcon
                    className="-mr-1 ml-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-sky-50 mt-5 py-10">
        <div className="container mx-auto">
          <div className="flex py-5">
            <h1 className="text-center text-sky-700 font-extrabold text-3xl my-auto">
              Các tour cao cấp
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
      <div className="bg-white mt-5 py-10">
      <div className="container mx-auto p-5 mt-10">
          <h1 className="text-3xl font-bold">
            Điểm đến hàng đầu cho các chuyến đi Việt Nam
          </h1>
          <p className="mt-3">
            Những điểm đến tại Việt Nam đáng để ghé thăm ít nhất một lần trong
            đời
          </p>
          <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotelData.map((hotel, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden h-[346px] relative cursor-pointer"
                onClick={() => navigate(`/hotels?locationId=${hotel.id}`)}
              >
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-2 left-2">
                  <h3 className="text-white text-2xl font-semibold">
                    {hotel.name}
                  </h3>
                  <p className="text-white">
                    <span className="text-xl font-semibold">
                      {hotel.accommodation}
                    </span>{" "}
                    chỗ ở
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-sky-50 mt-5 py-10">
        <div className="container mx-auto">
          <div className="flex py-5">
            <h1 className="text-center text-sky-700 font-extrabold text-3xl my-auto">
              Các chuyến bay phổ biến
            </h1>
            <Link
              to="/flights?departure=HAN&destination=SGN"
              className="ml-auto my-auto inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Xem tất cả
            </Link>
          </div>
          <OtherFlight />
        </div>
      </div>
    </>
  );
};

export default Home;
