import React, { Fragment, useContext, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Switch,
  Transition,
} from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import useLogout from "../hooks/use-logout";
import { GlobalContext } from "../contexts/GlobalProvider";

const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};
const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Tour", href: "/tours" },
  { name: "Vé máy bay", href: "/flights" },
  { name: "Khách sạn", href: "/hotel" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Liên hệ", href: "/contact" },
];
const userNavigation = [
  { name: "Thông tin tài khoản", href: "/setting?nav=0" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header3 = () => {
  const logout = useLogout();
  const context = useContext(GlobalContext);
  return (
    <Disclosure as="div" className="relative bg-sky-700 pb-32 overflow-hidden">
      {({ open }) => (
        <>
          <nav
            className={classNames(
              open ? "bg-sky-600" : "bg-transparent",
              "relative z-10 border-b border-teal-500 border-opacity-25 lg:bg-transparent lg:border-none"
            )}
          >
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-sky-800">
                <div className="px-2 flex items-center lg:px-0">
                  <div className="flex-shrink-0">
                    <Link to="/">
                      <img
                        className="block h-8 w-auto"
                        src="/src/assets/img/general/logo-light.svg"
                        alt="Workflow"
                      />
                    </Link>
                  </div>
                  <div className="hidden lg:block lg:ml-6 lg:space-x-4">
                    <div className="flex">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-black bg-opacity-25"
                              : "hover:bg-sky-800",
                            "rounded-md py-2 px-3 text-sm font-medium text-white"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative text-sky-100 focus-within:text-gray-400">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon
                          className="flex-shrink-0 h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        disabled
                        id="search"
                        name="search"
                        className="block w-full bg-sky-700 bg-opacity-50 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 placeholder-sky-100 focus:outline-none focus:bg-white focus:ring-white focus:border-white focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm"
                        placeholder="Tìm kiếm(không khả dụng)"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="p-2 rounded-md inline-flex items-center justify-center text-sky-200 hover:text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon
                        className="block flex-shrink-0 h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <MenuIcon
                        className="block flex-shrink-0 h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </DisclosureButton>
                </div>
                <div className="hidden lg:block lg:ml-4">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:bg-sky-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative flex-shrink-0 ml-4">
                      <div>
                        <MenuButton className="rounded-full flex text-sm text-white focus:outline-none focus:bg-sky-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="rounded-full h-8 w-8"
                            src={user.imageUrl}
                            alt=""
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
                        <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block py-2 px-4 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </MenuItem>
                          ))}
                          {context.roles?.length && (
                            <MenuItem>
                              <Link
                                to="/admin"
                                className="block py-2 px-4 text-sm text-gray-700"
                              >
                                Vào trang quản trị
                              </Link>
                            </MenuItem>
                          )}
                          {context.isAuthenticated && (
                            <MenuItem>
                              <p
                                className="block py-2 px-4 text-sm cursor-pointer text-red-500 hover:bg-red-50"
                                onClick={logout}
                              >
                                Đăng xuất
                              </p>
                            </MenuItem>
                          )}
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <DisclosurePanel className="bg-sky-900 lg:hidden">
              <div className="pt-2 pb-3 px-2 space-y-1">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-black bg-opacity-25"
                        : "hover:bg-sky-800",
                      "block rounded-md py-2 px-3 text-base font-medium text-white"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-sky-800">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full h-10 w-10"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {context.profile?.name}
                    </div>
                    <div className="text-sm font-medium text-sky-200">
                      {context.profile?.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:bg-sky-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2">
                  {userNavigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      to={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:text-white hover:bg-sky-800"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                  {context.roles?.length && (
                    <DisclosureButton
                      as="a"
                      to="/admin"
                      className="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:text-white hover:bg-sky-800"
                    >
                      Vào trang quản trị
                    </DisclosureButton>
                  )}
                  {context.isAuthenticated && (
                    <DisclosureButton
                      as="p"
                      className="cursor-pointer block rounded-md py-2 px-3 text-base font-medium text-red-500 hover:bg-sky-800"
                      onClick={logout}
                    >
                      Đăng xuất
                    </DisclosureButton>
                  )}
                </div>
              </div>
            </DisclosurePanel>
          </nav>
          <div
            aria-hidden="true"
            className={classNames(
              open ? "bottom-0" : "inset-y-0",
              "absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
            )}
          >
            <div className="absolute inset-0 flex">
              <div
                className="h-full w-1/2"
                style={{ backgroundColor: "#0a527b" }}
              />
              <div
                className="h-full w-1/2"
                style={{ backgroundColor: "#065d8c" }}
              />
            </div>
            <div className="relative flex justify-center">
              <svg
                className="flex-shrink-0"
                width={1750}
                height={308}
                viewBox="0 0 1750 308"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                  fill="#0369a1"
                />
                <path
                  d="M1465.84 308L16.816 0H1750v308h-284.16z"
                  fill="#065d8c"
                />
                <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
                <path
                  d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                  fill="#0a4f76"
                />
              </svg>
            </div>
          </div>
          <header className="relative py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Trang cá nhân</h1>
            </div>
          </header>
        </>
      )}
    </Disclosure>
  );
};

export default Header3;
