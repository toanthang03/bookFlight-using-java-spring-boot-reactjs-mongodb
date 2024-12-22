import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FlightService from "../services/FlightService";
import FlightCard from "../components/FlightCard";
import DetailAndBooking from "../components/DetailAndBooking";
import { ExclamationIcon } from "@heroicons/react/solid";
import FlightSearchBox2 from "../components/FlightSearchBox2";
import Pagination from "../components/admin/Pagination";

const FLights = () => {
  const divRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [selectedFlight, setSelectedFlight] = useState(-1);
  const [searchData, setSearchData] = useState({
    departure: searchParams.get("departure")
      ? searchParams.get("departure")
      : "",
    destination: searchParams.get("destination")
      ? searchParams.get("destination")
      : "",
    airline: "",
    departureDate: searchParams.get("departureDate")
      ? searchParams.get("departureDate")
      : "2024-01-01",
    minPrice: 0,
    maxPrice: 999999999,
    cancelable: "",
    active: "active",
    sortBy: "price",
    sortType: "asc",
    page: 1,
    limit: 5,
  });

  const [flights, setFlights] = useState([]);

  // Hàm để cuộn đến div khi nhấn vào nút
  const scrollToDiv = () => {
    // Sử dụng phương thức scrollIntoView để cuộn đến div
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "Danh sách chuyến bay";
  }, []);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await FlightService.getFlights(searchData);
        // console.log(response.data);
        setFlights(response.data);
        setSelectedFlight(-1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlights();
  }, [searchData]);

  return (
    <div className="my-10 container max-w-6xl mx-auto">
      <FlightSearchBox2 searchData={searchData} setSearchData={setSearchData} />
      <div className="mt-4 grid md:grid-cols-5 gap-5">
        <div className="md:col-span-2 grid gap-3">
          {flights?.length > 0 ? (
            flights?.map((flight, index) => (
              <FlightCard
                key={index}
                flight={flight}
                onClick={() => {
                  setSelectedFlight(index);
                  scrollToDiv();
                }}
              />
            ))
          ) : (
            <div className="flex mx-auto h-56 sticky top-0">
              <div className="m-auto">
                <ExclamationIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="mt-2 text-sm text-gray-500">
                  Hiện chưa có chuyến bay nào phù hợp với yêu cầu của bạn hoặc
                  đã vượt quá số lượng chuyến bay tối đa
                </p>
              </div>
            </div>
          )}
          <Pagination
            page={searchData.page}
            limit={searchData.limit}
            onNext={() => {
              if (flights?.length === searchData.limit) {
                setSearchData({
                  ...searchData,
                  page: searchData.page + 1,
                });
              }
            }}
            onPrevious={() => {
              if (searchData.page > 1) {
                setSearchData({
                  ...searchData,
                  page: searchData.page - 1,
                });
              }
            }}
          />
        </div>
        <div className={`md:col-span-3`}>
          {selectedFlight !== -1 ? (
            <div ref={divRef} className="md:sticky md:top-10">
              <DetailAndBooking flight={flights[selectedFlight]} />
            </div>
          ) : (
            <div className="flex mx-auto h-56 sticky top-0">
              <div className="m-auto">
                <ExclamationIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="mt-2 text-sm text-gray-500">
                  Vui lòng chọn một chuyến bay để xem chi tiết về lịch trình và
                  đặt vé
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FLights;
