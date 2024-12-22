import React, { useEffect, useRef, useState } from "react";
import HotelSearchBox from "../components/chien/HotelSearchBox";
import HotelCard from "../components/chien/HotelCard";
import HotelLocationList from "../components/chien/HotelLocationList";
import HotelDetail from "../components/chien/HotelDetail";
import HotelService from "../services/HotelService";
import { ExclamationIcon } from "@heroicons/react/outline";
import Pagination from "../components/admin/Pagination";
import BookHotel from "../components/BookHotel";
import { useSearchParams } from "react-router-dom";

const Hotels = () => {
  const [selects, setSelects] = useState({
    hotelCode: "",
    roomTypeId: "",
  });
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const divRef = useRef(null);
  // Hàm để cuộn đến div khi nhấn vào nút
  const scrollToDiv = () => {
    // Sử dụng phương thức scrollIntoView để cuộn đến div
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "Danh sách các khách sạn";
  }, []);

  const [hotelSelected, setHotelSelected] = useState(-1);

  const [searchData, setSearchData] = useState({
    hotelName: searchParams.get("hotelName")?.length > 0 ? searchParams.get("hotelName") : "",
    locationId: searchParams.get("locationId")?.length > 0 ? searchParams.get("locationId") : "",
    minPrice: 0,
    maxPrice: -1,
    active: 1,
    sortBy: "hotelName",
    sortType: "asc",
    page: 1,
    limit: 5,
  });

  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await HotelService.getHotels(searchData);
        // console.log(response.data);
        if (response.status === 200) {
          setHotels(response.data);
          if (response.data.length === 0) {
            setHotelSelected(-1);
          } else {
            setHotelSelected(0);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotels();
  }, [searchData]);

  const getData = (hotelCode, roomTypeId) => {
    setSelects({
      hotelCode: hotelCode,
      roomTypeId: roomTypeId,
    });
    setOpen(true);
  };

  return (
    <>
      <BookHotel
        cancelButtonRef={cancelButtonRef}
        open={open}
        setOpen={setOpen}
        selects={selects}
      />
      <div className="bg-white py-5">
        <div className="container mx-auto max-w-6xl my-10">
          <div className="p-5 mt-10">
            <h1 className="font-bold uppercase text-center text-3xl">
              Khách sạn ở Việt Nam
            </h1>
          </div>
          <HotelSearchBox
            searchData={searchData}
            setSearchData={setSearchData}
          />
          <div className="mt-4 grid md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              {hotels?.length > 0 ? (
                <div className="grid gap-3 p-5 md:p-0">
                  {hotels?.map((hotel, index) => (
                    <HotelCard
                      key={index}
                      hotel={hotel}
                      onClick={() => {
                        setHotelSelected(index);
                        scrollToDiv();
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex mx-auto h-56 sticky top-0">
                  <div className="m-auto">
                    <ExclamationIcon className="h-12 w-12 text-gray-400 mx-auto" />
                    <p className="mt-2 text-sm text-gray-500">
                      Hiện chưa có khách sạn nào phù hợp với nhu cầu tìm kiếm
                      của bạn
                    </p>
                  </div>
                </div>
              )}
              {hotels?.length === searchData.limit && (
                <Pagination
                  page={searchData.page}
                  limit={searchData.limit}
                  onNext={() => {
                    if (hotels?.length === searchData.limit) {
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
              )}
            </div>
            <div ref={divRef} className="md:col-span-2">
              {hotelSelected !== -1 ? (
                <HotelDetail hotel={hotels[hotelSelected]} getData={getData} />
              ) : (
                <div className="flex mx-auto h-56 sticky top-0">
                  <div className="m-auto">
                    <ExclamationIcon className="h-12 w-12 text-gray-400 mx-auto" />
                    <p className="mt-2 text-sm text-gray-500">
                      Vui lòng chọn một chuyến bay để xem chi tiết về lịch trình
                      và đặt vé
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <HotelLocationList /> */}
        </div>
      </div>
    </>
  );
};

export default Hotels;
