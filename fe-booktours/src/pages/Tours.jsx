import React, { Fragment, useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/solid";
import { useSearchParams } from "react-router-dom";
import TourService from "../services/TourService";
import Pagination from "../components/admin/Pagination";
import TourCard2 from "../components/TourCard2";
import TourCardSkeleton from "../components/TourCardSkeleton";
import { Filter, MobileFilter } from "../components/FilterTour";
import BreadCrumbs from "../components/BreadCrumbs";

const sorts = [
  { title: "Tên(Từ thấp đến cao)", sortBy: "tourName", sortType: "asc" },
  { title: "Tên(Từ cao đến thấp)", sortBy: "tourName", sortType: "desc" },
  { title: "Giá(Từ thấp đến cao)", sortBy: "price", sortType: "asc" },
  { title: "Giá(Từ cao đến thấp)", sortBy: "price", sortType: "desc" },
];
const tourSkeletons = [
  TourCardSkeleton,
  TourCardSkeleton,
  TourCardSkeleton,
  TourCardSkeleton,
  TourCardSkeleton,
];
const Tours = () => {
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [objectQuery, setObjectQuery] = useState({
    region: searchParams.get("region") ? searchParams.get("region") : "",
    location: searchParams.get("location") ? searchParams.get("location") : "",
    minPrice: searchParams.get("minPrice")
      ? parseInt(searchParams.get("minPrice"))
      : 0,
    maxPrice: searchParams.get("maxPrice")
      ? parseInt(searchParams.get("maxPrice"))
      : 999999999,
    vehicle: null,
    tourType: null,
    sortBy: "price",
    sortType: "asc",
    page: 1,
    limit: 5,
  });
  // console.log(objectQuery);

  const [activeSort, setActiveSort] = useState(0);

  useEffect(() => {
    document.title = `Du lịch ${objectQuery.region ? objectQuery.region : ""}`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchTours = async () => {
      try {
        const response = await TourService.getTours(objectQuery);
        // console.log(response.data);
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

  useEffect(() => {
    setObjectQuery({
      ...objectQuery,
      minPrice: null,
      maxPrice: null,
      vehicle: null,
      tourType: null,
      sortBy: "price",
      sortType: "asc",
      page: 1,
      limit: 5,
    });
  }, [objectQuery.region, objectQuery.location]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          other={objectQuery.region}
        />
      </div>
      <div className="flex bg-cover saturate-50 bg-center h-56 my-5 bg-[url('/src/assets/img/destinations/2/4.png')]">
        <div className="m-auto grid">
          <h3 className="mx-auto font-roboto text-3xl text-white">
            Du lịch {objectQuery.region}
          </h3>
          <p className="mx-auto w-2/3 line-clamp-4 text-white md:text-lg text-center">
            Miền Bắc Việt Nam, nằm ở phía bắc của đất nước, là vùng đất đa dạng
            văn hóa, phong cảnh hùng vĩ và lịch sử lâu đời. Nổi bật với thủ đô
            Hà Nội cổ kính, nơi lưu giữ nhiều di sản văn hóa như phố cổ Hà Nội,
            hồ Hoàn Kiếm và Văn Miếu - Quốc Tử Giám. Phía bắc Hà Nội là vùng núi
            cao Tây Bắc với thiên nhiên tuyệt đẹp, từ các thửa ruộng bậc thang
            kỳ vĩ ở Mù Cang Chải, Sa Pa, cho đến các đỉnh núi cao quanh năm mây
            phủ như Fansipan - nóc nhà Đông Dương.
          </p>
        </div>
      </div>
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          objectQuery={objectQuery}
          setObjectQuery={setObjectQuery}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative  flex items-baseline justify-between pt-12 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Bộ lọc
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sắp xếp
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sorts.map((sort, index) => (
                        <MenuItem key={index}>
                          <p
                            onClick={() => {
                              setObjectQuery({
                                ...objectQuery,
                                sortBy: sort.sortBy,
                                sortType: sort.sortType,
                              });
                              setActiveSort(index);
                            }}
                            className={`${
                              activeSort === index
                                ? "font-medium text-gray-900"
                                : "text-gray-700"
                            } block px-4 py-2 text-sm cursor-pointer`}
                          >
                            {sort.title}
                          </p>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Bộ lọc</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Tour
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              <Filter
                objectQuery={objectQuery}
                setObjectQuery={setObjectQuery}
              />

              {/* Product grid */}
              <div className="lg:col-span-3 bg-white">
                {/* Replace with your content */}
                {/* border-4 border-dashed border-gray-200 */}
                {!isLoading ? (
                  <div className="rounded-lg">
                    <div className="grid gap-3">
                      {tours?.length > 0 ? (
                        tours?.map((tour, index) => (
                          <TourCard2 key={index} tour={tour} />
                        ))
                      ) : (
                        <h1>
                          Hiện tại chưa có tour nào phù hợp với yêu cầu của bạn
                        </h1>
                      )}
                    </div>
                    <Pagination
                      page={objectQuery.page}
                      limit={objectQuery.limit}
                      onNext={() => {
                        if (tours?.length === 5) {
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
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Tours;
