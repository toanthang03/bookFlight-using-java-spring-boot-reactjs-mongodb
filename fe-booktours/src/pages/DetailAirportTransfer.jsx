import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AirportTransferService from "../services/AirportTransferService";
import BreadCrumbs from "../components/BreadCrumbs";
import VehicleCard from "../components/VehicleCard";
import TourCardSkeleton from "../components/TourCardSkeleton";
import { CheckIcon } from "@heroicons/react/solid";
import BookRide from "../components/BookRide";

const tourSkeletons = [
  TourCardSkeleton,
  TourCardSkeleton,
  TourCardSkeleton,
  TourCardSkeleton,
  TourCardSkeleton,
];
const DetailAirportTransfer = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [vehicleSelected, setVehicleSelected] = useState({});
  const { airportTransferId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [airportTransfer, setAirportTransfer] = useState({});
  const location = useLocation();
  const { state } = location.state || {};

  useEffect(() => {
    const fetchAirportTransfer = async () => {
      try {
        const response = await AirportTransferService.getAirportTransferById(
          airportTransferId,
          1,
          1
        );
        // console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        setAirportTransfer(response.data);
        setVehicleSelected(response.data?.vehicles[0]);
      } catch (error) {
        console.error("fetchAirportTransfer -> error", error);
      }
    };
    fetchAirportTransfer();
  }, []);
  return (
    <>
      <BookRide
        cancelButtonRef={cancelButtonRef}
        open={open}
        setOpen={setOpen}
        state={state}
        vehicleSelected={vehicleSelected}
        airportTransferId={airportTransferId}
      />
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadCrumbs
            pages={[
              {
                name: "Trang chủ",
                href: "/",
                current: false,
              },
              {
                name: "Dịch vụ đưa đón sân bay",
                href: "#",
                current: true,
              },
            ]}
            other={
              state?.airfieldToAddress
                ? `Từ ${state?.airfieldName} đến ${state?.address}`
                : `Từ ${state?.address} đến ${state?.airfieldName}`
            }
          />
        </div>
        <div className="flex bg-cover saturate-50 bg-center h-56 my-5 bg-[url('/src/assets/img/destinations/2/4.png')]">
          <div className="m-auto grid">
            <h3 className="mx-auto font-roboto text-3xl text-white">
              Dịch vụ đưa đón sân bay
            </h3>
            <p className="mx-auto w-2/3 line-clamp-4 text-white md:text-lg text-center">
              Dịch vụ đưa đón sân bay của GoTrip mang đến giải pháp di chuyển
              tiện lợi, nhanh chóng và an toàn, giúp bạn bắt đầu hoặc kết thúc
              hành trình một cách hoàn hảo. Với đội ngũ tài xế chuyên nghiệp, xe
              đời mới, và cam kết đúng giờ, chúng tôi đảm bảo bạn luôn có trải
              nghiệm thoải mái và yên tâm. Dịch vụ đa dạng từ xe cá nhân đến xe
              nhóm, phù hợp với mọi nhu cầu của khách hàng. Đặt trước dễ dàng
              qua hệ thống trực tuyến, bạn chỉ cần thư giãn và tận hưởng hành
              trình. GoTrip đồng hành cùng bạn trên mọi chặng đường!
            </p>
          </div>
        </div>
        <div className="my-5 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-sky-600 grid sm:flex py-4 rounded-lg gap-4 relative">
          <div className="absolute bg-sky-600 hidden md:block rounded-full p-3 -top-4 -left-10">
            <img
              src="https://ik.imagekit.io/tvlk/image/imageResource/2018/04/03/1522766064202-b8b3793ad92b75f10bc14588fc698697.png?tr=h-70,q-75,w-70"
              alt=""
            />
          </div>
          <p className="text-white flex gap-1">
            <CheckIcon className="h-5 w-5 my-auto" /> Có sẵn 24 giờ mỗi ngày, 7
            ngày mỗi tuần
          </p>
          <p className="text-white flex gap-1">
            <CheckIcon className="h-5 w-5 my-auto" /> Điểm đón thuận tiện
          </p>
          <p className="text-white flex gap-1">
            <CheckIcon className="h-5 w-5 my-auto" /> Giá đã bao gồm phí cầu
            đường
          </p>
        </div>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="lg:col-span-3 bg-gray-50 border">
              {!isLoading ? (
                <div className="rounded-lg">
                  <div className="grid gap-3">
                    {airportTransfer.vehicles?.length > 0 ? (
                      airportTransfer.vehicles?.map((vehicle, index) => (
                        <VehicleCard
                          key={index}
                          vehicle={vehicle}
                          select={() => {
                            setVehicleSelected(vehicle);
                            setOpen(true);
                          }}
                        />
                      ))
                    ) : (
                      <h1>
                        Hiện tại chúng tôi không hỗ trợ đưa đón tại khu vực này
                      </h1>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg">
                  <div className="grid gap-3">
                    {tourSkeletons.map((item, index) => (
                      <div key={index}>{item()}</div>
                    ))}
                  </div>
                </div>
              )}
              {/* /End replace */}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default DetailAirportTransfer;
