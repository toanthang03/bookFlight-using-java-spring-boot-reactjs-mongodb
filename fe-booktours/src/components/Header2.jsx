import React, { useContext } from "react";
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import useLogout from "../hooks/use-logout";
import { GlobalContext } from "../contexts/GlobalProvider";
import { Link } from "react-router-dom";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};
const navigation = [
  { name: "Trang chủ", href: "/" },
  {
    name: "Du lịch",
    href: "/tours",
    subItems: [
      { name: "Miền Bắc", href: "/tours?region=Miền Bắc" },
      { name: "Miền Trung", href: "/tours?region=Miền Trung" },
      { name: "Miền Nam", href: "/tours?region=Miền Nam" },
    ],
  },
  { name: "Vé máy bay", href: "/flights?departure=SGN&destination=HAN" },
  { name: "Khách sạn", href: "/hotel" },
  {
    name: "Xem thêm",
    href: "/contact",
    subItems: [
      { name: "Giới thiệu", href: "/about" },
      { name: "Liên hệ", href: "/contact" },
      { name: "Những câu hỏi thường gặp", href: "/faq" },
    ],
  },
];

const userNavigation = [
  { name: "Thông tin tài khoản", href: "/setting?nav=0" },
];
const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-sky-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];
const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header2 = () => {
  const logout = useLogout();
  const context = useContext(GlobalContext);

  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <Popover className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src="/src/assets/img/general/logo-dark.svg"
                  alt="Workflow"
                />
              </Link>
            </div>
            <nav
              aria-label="Global"
              className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4"
            >
              {navigation.map((item) =>
                // <Link
                //   key={item.name}
                //   to={item.href}
                //   className="px-3 py-2 text-gray-900 text-sm font-medium"
                // >
                //   {item.name}
                // </Link>
                item.subItems ? (
                  <Menu as="div" key={item.name} className="relative">
                    <div>
                      <MenuButton className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        <span className="sr-only">Open user menu</span>
                        <p className="px-3 py-2 text-gray-900 text-sm font-medium">
                          {item.name}
                        </p>
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
                      <MenuItems className="z-10 origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {item.subItems.map((itemm) => (
                          <MenuItem key={itemm.name} as="div">
                            <Link
                              to={itemm.href}
                              className={classNames(
                                // active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-sky-800 duration-300"
                              )}
                            >
                              {itemm.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </MenuItems>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-3 py-2 text-gray-900 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </div>
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  disabled
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
                  placeholder="Tìm kiếm(không khả dụng)"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            <PopoverButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>
          <Transition as={Fragment}>
            <div className="lg:hidden z-10">
              <TransitionChild
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <PopoverOverlay
                  className=" fixed inset-0 bg-black bg-opacity-25"
                  aria-hidden="true"
                />
              </TransitionChild>

              <TransitionChild
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <PopoverPanel
                  focus
                  className=" absolute top-0 right-0 max-w-none w-full p-2 transition transform origin-top"
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                    <div className="pt-3 pb-2">
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src="/src/assets/img/general/logo-dark.svg"
                            alt="Workflow"
                          />
                        </div>
                        <div className="-mr-2">
                          <PopoverButton className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </PopoverButton>
                        </div>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        {navigation.map((item) =>
                          item.subItems && !item.href.includes("/tours") ? (
                            item.subItems.map((itemm) => (
                              <Link
                                key={itemm.name}
                                to={itemm.href}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {itemm.name}
                              </Link>
                            ))
                          ) : (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                            >
                              {item.name}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                    <div className="pt-4 pb-2">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium text-gray-800">
                            {user.name}
                          </div>
                          <div className="text-sm font-medium text-gray-500">
                            {user.email}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        {!context.isAuthenticated ? (
                          <Link
                            to="/login"
                            className="flex w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          >
                            <span className="m-auto">Đăng nhập</span>
                          </Link>
                        ) : (
                          <>
                            {userNavigation.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </Link>
                            ))}
                            {context.roles?.length > 1 && (
                              <Link
                                to="/admin"
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                Vào trang quản trị
                              </Link>
                            )}
                            <p
                              onClick={logout}
                              className="block rounded-md px-3 py-2 text-base text-red-500 font-medium hover:bg-gray-100 hover:text-red-600"
                            >
                              Đăng xuất
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </TransitionChild>
            </div>
          </Transition>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            <button
              type="button"
              className="flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {!context.isAuthenticated ? (
              <Link
                to="/login"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Đăng nhập
              </Link>
            ) : (
              <Menu as="div" className="z-10 ml-4 relative flex-shrink-0">
                <div>
                  <MenuButton className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
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
                      <MenuItem key={item.name} as="div">
                        <Link
                          to={item.href}
                          className={classNames(
                            // active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                    {context.roles?.length > 1 && (
                      <MenuItem as="div">
                        <Link
                          to="/admin"
                          className={classNames(
                            // active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Vào trang quản trị
                        </Link>
                      </MenuItem>
                    )}
                    <MenuItem as="div">
                      <p
                        onClick={logout}
                        className="cursor-pointer block rounded-md px-4 py-2 text-sm text-red-500 font-medium hover:bg-gray-100 hover:text-red-600"
                      >
                        Đăng xuất
                      </p>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            )}
          </div>
        </Popover>
      </div>
    </header>
  );
};

export default Header2;
