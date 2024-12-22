import React, { Fragment, useContext, useState } from "react";
import {
  Dialog,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  ChartBarIcon,
  HomeIcon,
  UsersIcon,
  XIcon,
  DatabaseIcon,
  FolderOpenIcon,
  LocationMarkerIcon,
  OfficeBuildingIcon,
  TicketIcon,
  TagIcon,
} from "@heroicons/react/outline";
import { FiHardDrive } from "react-icons/fi";
import { BellIcon, MenuAlt2Icon, SearchIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalProvider";
import useLogout from "../../hooks/use-logout";
import DataService from "../../services/DataService";
import { BiArrowBack } from "react-icons/bi";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: HomeIcon,
    roles: [
      "ROLE_ADMIN",
      "ROLE_TOUR_MANAGER",
      "ROLE_FLIGHT_MANAGER",
      "ROLE_HOTEL_MANAGER",
      "ROLE_AIRPORT_TRANSFER_MANAGER",
    ],
  },
  {
    id: "tours",
    name: "Tour du lịch",
    href: "/admin/tour-management",
    icon: LocationMarkerIcon,
    children: [{ name: "Báo cáo", href: "/admin/tour-report" }],
    roles: ["ROLE_ADMIN", "ROLE_TOUR_MANAGER"],
  },
  {
    id: "flights",
    name: "Vé máy bay",
    href: "/admin/flight-management",
    icon: TicketIcon,
    children: [{ name: "Báo cáo", href: "/admin/flight-report" }],
    roles: ["ROLE_ADMIN", "ROLE_FLIGHT_MANAGER"],
  },
  {
    id: "hotels",
    name: "Khách sạn",
    href: "/admin/hotel-management",
    icon: OfficeBuildingIcon,
    // children: [{ name: "Báo cáo", href: "/admin/hotel-report" }],
    roles: ["ROLE_ADMIN", "ROLE_HOTEL_MANAGER"],
  },
  {
    id: "airportTransfers",
    name: "Đưa đón sân bay",
    href: "/admin/airport-transfer-management",
    icon: FiHardDrive,
    roles: ["ROLE_ADMIN", "ROLE_AIRPORT_TRANSFER_MANAGER"],
  },
  {
    id: "appusers",
    name: "Người dùng",
    href: "/admin/user-management",
    icon: UsersIcon,
    roles: ["ROLE_ADMIN"],
  },
  {
    id: "discounts",
    name: "Dịch vụ giảm giá",
    href: "/admin/discount-management",
    icon: TagIcon,
    children: [
      { name: "Tạo dịch vụ mới", href: "/admin/discount-create" },
      // { name: "Xóa", href: "#" },
      // { name: "Sửa", href: "#" },
    ],
    roles: ["ROLE_ADMIN", "ROLE_TOUR_MANAGER"],
  },
  // { name: "Quản lý file(chưa hoàn thiện)", href: "#", icon: FolderOpenIcon },
];
const userNavigation = [
  { name: "Thông tin tài khoản", href: "/setting?nav=0" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Siderbar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(-1);
  const context = useContext(GlobalContext);
  const logout = useLogout();
  const navigate = useNavigate();

  const handleBackup = async (collection) => {
    try {
      const response =
        collection?.length < 1
          ? await DataService.backup()
          : await DataService.backupCollection(collection);
      alert(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestore = async (collection) => {
    try {
      const response =
        collection < 1
          ? await DataService.restore()
          : await DataService.restoreCollection(collection);
      alert(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100">
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex  lg:hidden"
          onClose={setSidebarOpen}
        >
          <TransitionChild
            as="div"
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
          </TransitionChild>
          <TransitionChild
            as="div"
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="h-screen relative flex-1 flex flex-col max-w-xs w-screen bg-white">
              <TransitionChild
                as="div"
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="/src/assets/img/general/logo-dark.svg"
                    alt="Workflow"
                  />
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item, index) => (
                    <React.Fragment key={item.name}>
                      <Link
                        onClick={() =>
                          setActiveTab(index === activeTab ? -1 : index)
                        }
                        key={item.name}
                        to={item.href}
                        className={`${
                          index === activeTab
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          // Có quyền truy cập
                      !context.profile?.roles?.some((role) =>
                        item.roles.includes(role)
                      ) && "hidden"
                        }`}
                      >
                        <item.icon
                          className={`${
                            index === activeTab
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500"
                          } mr-3 flex-shrink-0 h-6 w-6`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                      {index === activeTab && (
                        <ul className="list-disc list-inside">
                          {item.children?.map((child) => (
                            <li
                              key={child.name}
                              className="pl-10 px-2 py-2 text-sm font-medium rounded-md cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              onClick={() => navigate(child.href)}
                            >
                              {child.name}
                            </li>
                          ))}
                          {item.id && (
                            <>
                              {" "}
                              <li
                                className="pl-10 px-2 py-2 text-sm font-medium rounded-md cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                onClick={() => handleBackup(item.id)}
                              >
                                Sao lưu dữ liệu
                              </li>
                              <li
                                className="pl-10 px-2 py-2 text-sm font-medium rounded-md cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                onClick={() => handleRestore(item.id)}
                              >
                                Phục hồi dữ liệu
                              </li>
                            </>
                          )}
                        </ul>
                      )}
                    </React.Fragment>
                  ))}
                  {context.profile?.roles?.includes("ROLE_ADMIN") && (
                    <>
                      <p
                        className="cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        onClick={() => handleBackup("")}
                      >
                        <DatabaseIcon
                          className="text-teal-500 mr-3 flex-shrink-0 h-6 w-6 group-hover:text-teal-600"
                          aria-hidden="true"
                        />
                        Sao lưu dữ liệu
                      </p>
                      <p
                        className="cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        onClick={() => handleRestore("")}
                      >
                        <DatabaseIcon
                          className="text-rose-500 mr-3 flex-shrink-0 h-6 w-6 group-hover:text-rose-600"
                          aria-hidden="true"
                        />
                        Phục hồi dữ liệu
                      </p>
                    </>
                  )}
                  <Link
                    to="/"
                    className="cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <BiArrowBack
                      className="text-gray-500 mr-3 flex-shrink-0 h-6 w-6 group-hover:text-gray-600"
                      aria-hidden="true"
                    />
                    Về trang chủ
                  </Link>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <Link to="/setting?nav=1" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        {context.profile?.name}
                      </p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        Trang cá nhân
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </TransitionChild>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="/src/assets/img/general/logo-dark.svg"
                alt="Workflow"
              />
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item, index) => (
                <React.Fragment key={item.name}>
                  <Link
                    onClick={() =>
                      setActiveTab(index === activeTab ? -1 : index)
                    }
                    key={item.name}
                    to={item.href}
                    className={`${
                      index === activeTab
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      // Có quyền truy cập
                      !context.profile?.roles?.some((role) =>
                        item.roles.includes(role)
                      ) && "hidden"
                    }`}
                  >
                    <item.icon
                      className={`${
                        index === activeTab
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500"
                      } mr-3 flex-shrink-0 h-6 w-6`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                  {index === activeTab && (
                    <ul className="list-disc list-inside">
                      {item.children?.map((child) => (
                        <li
                          key={child.name}
                          className="pl-10 px-2 py-2 text-sm font-medium rounded-md cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          onClick={() => navigate(child.href)}
                        >
                          {child.name}
                        </li>
                      ))}
                      {item.id && (
                        <>
                          <li
                            className="pl-10 px-2 py-2 text-sm font-medium rounded-md cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            onClick={() => handleBackup(item.id)}
                          >
                            Sao lưu dữ liệu
                          </li>
                          <li
                            className="pl-10 px-2 py-2 text-sm font-medium rounded-md cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            onClick={() => handleRestore(item.id)}
                          >
                            Phục hồi dữ liệu
                          </li>
                        </>
                      )}
                    </ul>
                  )}
                </React.Fragment>
              ))}
              {context.profile?.roles?.includes("ROLE_ADMIN") && (
                <>
                  <p
                    className="cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => handleBackup("")}
                  >
                    <DatabaseIcon
                      className="text-teal-500 mr-3 flex-shrink-0 h-6 w-6 group-hover:text-teal-600"
                      aria-hidden="true"
                    />
                    Sao lưu dữ liệu
                  </p>
                  <p
                    className="cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => handleRestore("")}
                  >
                    <DatabaseIcon
                      className="text-rose-500 mr-3 flex-shrink-0 h-6 w-6 group-hover:text-rose-600"
                      aria-hidden="true"
                    />
                    Phục hồi dữ liệu
                  </p>
                </>
              )}
              <Link
                to="/"
                className="cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <BiArrowBack
                  className="text-gray-500 mr-3 flex-shrink-0 h-6 w-6 group-hover:text-gray-600"
                  aria-hidden="true"
                />
                Về trang chủ
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link
              to="/setting?nav=1"
              className="flex-shrink-0 w-full group block"
            >
              <div className="flex items-center">
                <div>
                  <span className="inline-block h-9 w-9 rounded-full overflow-hidden bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {context.profile?.name}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    Trang cá nhân
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0  flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex lg:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    disabled
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Tìm kiếm(không khả dụng)"
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center lg:ml-6">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <MenuButton className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    <span className="sr-only">Open user menu</span>
                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
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
                  <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        {({ active }) => (
                          <Link
                            to={item.href}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                    <MenuItem>
                      <p
                        onClick={logout}
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                      >
                        Đăng xuất
                      </p>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Siderbar;
