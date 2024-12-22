import React, { useEffect, useRef, useState } from "react";
import TourCard from "../../components/admin/TourCard";
import Filter from "../../components/admin/Filter";
import Pagination from "../../components/admin/Pagination";
import TourService from "../../services/TourService";
import { DatabaseIcon, ExclamationIcon, PlusIcon } from "@heroicons/react/outline";
import { LocationData } from "../../statics/datas/LocationData";
import TourCardSkeleton2 from "../../components/TourCardSkeleton2";
import TourCreate from "../../components/admin/TourCreate";
import DataService from "../../services/DataService";

const tourSkeletons = [
  TourCardSkeleton2,
  TourCardSkeleton2,
  TourCardSkeleton2,
  TourCardSkeleton2,
  TourCardSkeleton2,
  TourCardSkeleton2,
];
const locations = LocationData;
const sorts = [
  { title: "Tên(Từ thấp đến cao)", sortBy: "tourName", sortType: "asc" },
  { title: "Tên(Từ cao đến thấp)", sortBy: "tourName", sortType: "desc" },
  { title: "Giá(Từ thấp đến cao)", sortBy: "price", sortType: "asc" },
  { title: "Giá(Từ cao đến thấp)", sortBy: "price", sortType: "desc" },
];
const TourManagement = () => {
  const [selectSort, setSelectSort] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [tours, setTours] = useState([]);
  const [defaultTour, setDefaultTour] = useState({
    tourName: "",
    location: 0,
  });
  const [objectQuery, setObjectQuery] = useState({
    region: "",
    location: "",
    minPrice: null,
    maxPrice: null,
    vehicle: null,
    tourType: null,
    sortBy: "tourName",
    sortType: "asc",
    page: 1,
    limit: 6,
  });
  useEffect(() => {
    document.title = "Quản lý tour du lịch";
    window.scrollTo(0, 0);
    setIsLoading(true);
    const fetchTours = async () => {
      try {
        const response = await TourService.getTours(objectQuery);
        // console.log(response);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        setTours(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTours();
  }, [objectQuery]);

  return (
    <>
      <TourCreate
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        defaultTour={defaultTour}
        setDefaultTour={setDefaultTour}
        locations={locations}
      />
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Quản lý tour du lịch
            </h1>
            <p className="text-gray-500 italic">Quản lý các tour hiện hành</p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="py-4">
              {/* border-2 border-dashed border-gray-200 */}
              <div className="rounded-lg">
                <div className="mt-5 gap-5 md:flex">
                  <div className="md:mb-0 mb-3 flex gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={() => setOpen(true)}
                    >
                      <PlusIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Thêm tour mới
                    </button>
                  </div>
                  <div className="ml-auto md:flex gap-3">
                    <div className="my-auto">
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                        value={objectQuery.region}
                        onChange={(e) =>
                          setObjectQuery({
                            ...objectQuery,
                            region: e.target.value.normalize("NFC"),
                          })
                        }
                      >
                        <option value="">Chọn vùng miền(Tất cả)</option>
                        <option value="Miền Bắc">Miền Bắc</option>
                        <option value="Miền Trung">Miền Trung</option>
                        <option value="Miền Nam">Miền Nam</option>
                      </select>
                    </div>
                    <div className="my-auto">
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                        value={objectQuery.location}
                        onChange={(e) =>
                          setObjectQuery({
                            ...objectQuery,
                            location: e.target.value,
                          })
                        }
                      >
                        {objectQuery.region?.length > 0
                          ? locations
                              .filter(
                                (location) =>
                                  location.regionName ===
                                  objectQuery.region
                              )
                              .map((location, index) => (
                                <option
                                  key={index}
                                  value={location.locationName}
                                >
                                  {location.locationName}
                                </option>
                              ))
                          : locations.map((location, index) => (
                              <option key={index} value={location.locationName}>
                                {location.locationName}
                              </option>
                            ))}
                      </select>
                    </div>
                    <div className="my-auto ">
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                        value={selectSort}
                        onChange={(e) => {
                          setSelectSort(e.target.value);
                          setObjectQuery({
                            ...objectQuery,
                            sortBy: sorts[e.target.value].sortBy,
                            sortType: sorts[e.target.value].sortType,
                          });
                        }}
                      >
                        {sorts.map((sort, index) => (
                          <option key={index} value={index}>
                            {sort.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {isLoading ? (
                    tourSkeletons?.map((item, index) => (
                      <div key={index}>
                        <div key={index}>{item()}</div>
                      </div>
                    ))
                  ) : tours?.length > 0 ? (
                    tours?.map((tour, index) => (
                      <TourCard key={index} tour={tour} />
                    ))
                  ) : (
                    <div className="text-center col-span-3">
                      <ExclamationIcon className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="mt-2 text-sm text-gray-500">
                        Không có tour phù hợp
                      </p>
                    </div>
                  )}
                </div>
                  <Pagination
                    page={objectQuery.page}
                    limit={objectQuery.limit}
                    onNext={() => {
                      if (tours?.length === 6) {
                        setObjectQuery({
                          ...objectQuery,
                          page: objectQuery.page + 1,
                        });
                      }
                    }}
                    onPrevious={() => {
                      if (objectQuery.page > 1) {
                        setObjectQuery({
                          ...objectQuery,
                          page: objectQuery.page - 1,
                        });
                      }
                    }}
                  />
              </div>
            </div>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </>
  );
};

export default TourManagement;
