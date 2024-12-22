import React, { Fragment, useState } from "react";
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import { LocationData } from "../statics/datas/LocationData";

const prices = [
  { title: "Dưới 5 triệu", min: 0, max: 5000000 },
  { title: "Từ 5 đến 10 triệu", min: 5000000, max: 10000000 },
  { title: "Từ 10 đến 20 triệu", min: 10000000, max: 20000000 },
  { title: "Từ 20 triệu trở lên", min: 20000000, max: 99999999 },
];
const tourTypes = ["Tiêu chuẩn", "Tiết kiệm", "Nghỉ dưỡng", "Phượt", "Cao cấp"];
const vehicles = [
  "Xe ô tô",
  "Xe máy",
  "Xe đạp",
  "Tàu hỏa",
  "Tàu cáp treo",
  "Tàu thuyền",
  "Máy bay",
  "Xe khách",
];

const locations = LocationData;

export const MobileFilter = (props) => {
  return (
    <Transition show={props.mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex lg:hidden"
        onClose={props.setMobileFiltersOpen}
      >
        <TransitionChild
          as={Fragment}
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
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                onClick={() => props.setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <div className="mt-4 border-t border-gray-200">
              <Disclosure
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">Miền</span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        <select
                          id="location"
                          name="location"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                          value={props.objectQuery.region?.normalize("NFC")}
                          onChange={(e) =>
                            props.setObjectQuery({
                              ...props.objectQuery,
                              region: e.target.value,
                              location: "",
                            })
                          }
                        >
                          <option value="">Tất cả</option>
                          <option value="Miền Bắc">Miền Bắc</option>
                          <option value="Miền Trung">Miền Trung</option>
                          <option value="Miền Nam">Miền Nam</option>
                        </select>
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
              <Disclosure
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          Tỉnh muốn đến
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        <select
                          id="location"
                          name="location"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                          value={props.objectQuery.location?.normalize("NFC")}
                          onChange={(e) =>
                            props.setObjectQuery({
                              ...props.objectQuery,
                              location: e.target.value,
                            })
                          }
                        >
                          <option value="">Tất cả</option>
                          {props.objectQuery.region
                            ? locations
                                .filter(
                                  (location) =>
                                    location.regionName ===
                                    props.objectQuery.region
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
                                <option
                                  key={index}
                                  value={location.locationName}
                                >
                                  {location.locationName}
                                </option>
                              ))}
                        </select>
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
              <Disclosure
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                {({ open }) => (
                  <>
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">Giá</span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        <fieldset className="mt-4">
                          <div className="space-y-4">
                            {prices.map((price, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  id={index}
                                  name="price"
                                  type="radio"
                                  checked={
                                    price.min === props.objectQuery.minPrice &&
                                    price.max === props.objectQuery.maxPrice
                                  }
                                  onChange={() =>
                                    props.setObjectQuery({
                                      ...props.objectQuery,
                                      minPrice: price.min,
                                      maxPrice: price.max,
                                    })
                                  }
                                  className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                                />
                                <label
                                  htmlFor={index}
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  {price.title}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
              <Disclosure
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          Loại tour
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        <fieldset className="mt-4">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input
                                name="tourType"
                                type="radio"
                                checked={tourTypes === null}
                                onChange={() =>
                                  props.setObjectQuery({
                                    ...props.objectQuery,
                                    tourType: null,
                                  })
                                }
                                className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                              />
                              <label
                                htmlFor="all"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Tất cả
                              </label>
                            </div>
                            {tourTypes.map((tourType, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  id={index}
                                  name="tourType"
                                  type="radio"
                                  checked={
                                    tourType === props.objectQuery.tourType
                                  }
                                  onChange={() =>
                                    props.setObjectQuery({
                                      ...props.objectQuery,
                                      tourType: tourType,
                                    })
                                  }
                                  className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                                />
                                <label
                                  htmlFor={index}
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  {tourType}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
              <Disclosure
                defaultOpen
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          Phương tiện
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        <fieldset className="mt-4">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input
                                name="vehicle"
                                type="radio"
                                checked={vehicles === null}
                                onChange={() =>
                                  props.setObjectQuery({
                                    ...props.objectQuery,
                                    vehicle: null,
                                  })
                                }
                                className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                              />
                              <label
                                htmlFor="all"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Tất cả
                              </label>
                            </div>
                            {vehicles.map((vehicle, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  id={index}
                                  name="vehicle"
                                  type="radio"
                                  checked={
                                    vehicle === props.objectQuery.vehicle
                                  }
                                  onChange={() =>
                                    props.setObjectQuery({
                                      ...props.objectQuery,
                                      vehicle: vehicle,
                                    })
                                  }
                                  className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                                />
                                <label
                                  htmlFor={index}
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  {vehicle}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};
export const Filter = (props) => {
  return (
    <div className="hidden lg:block">
      <div className="lg:sticky lg:top-0">
        <Disclosure
          defaultOpen={true}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Miền</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                    value={props.objectQuery.region?.normalize("NFC")}
                    onChange={(e) =>
                      props.setObjectQuery({
                        ...props.objectQuery,
                        region: e.target.value,
                        location: "",
                      })
                    }
                  >
                    <option value="">Tất cả</option>
                    <option value="Miền Bắc">Miền Bắc</option>
                    <option value="Miền Trung">Miền Trung</option>
                    <option value="Miền Nam">Miền Nam</option>
                  </select>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
        <Disclosure
          defaultOpen={true}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    Tỉnh muốn đến
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                    value={props.objectQuery.location?.normalize("NFC")}
                    onChange={(e) =>
                      props.setObjectQuery({
                        ...props.objectQuery,
                        location: e.target.value,
                      })
                    }
                  >
                    <option value="">Tất cả</option>
                    {props.objectQuery?.region
                      ? locations
                          .filter(
                            (location) =>
                              location.regionName ===
                              props.objectQuery.region?.normalize("NFC")
                          )
                          .map((location, index) => (
                            <option key={index} value={location.locationName}>
                              {location.locationName}
                            </option>
                          ))
                      : locations.map((location, index) => (
                          <option key={index}>{location.locationName}</option>
                        ))}
                  </select>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Giá</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  <fieldset className="mt-4">
                    <div className="space-y-4">
                      {prices.map((price, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            id={index}
                            name="price"
                            type="radio"
                            checked={
                              price.min === props.objectQuery.minPrice &&
                              price.max === props.objectQuery.maxPrice
                            }
                            onChange={() =>
                              props.setObjectQuery({
                                ...props.objectQuery,
                                minPrice: price.min,
                                maxPrice: price.max,
                              })
                            }
                            className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                          />
                          <label
                            htmlFor={index}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {price.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Loại tour</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  <fieldset className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          name="tourType"
                          type="radio"
                          checked={tourTypes === null}
                          onChange={() =>
                            props.setObjectQuery({
                              ...props.objectQuery,
                              tourType: null,
                            })
                          }
                          className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                        />
                        <label
                          htmlFor="all"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Tất cả
                        </label>
                      </div>
                      {tourTypes.map((tourType, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            id={index}
                            name="tourType"
                            type="radio"
                            checked={
                              tourType === props.objectQuery.tourType
                            }
                            onChange={() =>
                              props.setObjectQuery({
                                ...props.objectQuery,
                                tourType: tourType,
                              })
                            }
                            className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                          />
                          <label
                            htmlFor={index}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {tourType}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Phương tiện</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  <fieldset className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          name="vehicle"
                          type="radio"
                          checked={props.vehicle === null}
                          onChange={() =>
                            props.setObjectQuery({
                              ...props.objectQuery,
                              vehicle: null,
                            })
                          }
                          className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                        />
                        <label
                          htmlFor="all"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Tất cả
                        </label>
                      </div>
                      {vehicles.map((vehicle, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            id={index}
                            name="vehicle"
                            type="radio"
                            checked={
                              vehicle === props.objectQuery.vehicle
                            }
                            onChange={() =>
                              props.setObjectQuery({
                                ...props.objectQuery,
                                vehicle: vehicle,
                              })
                            }
                            className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
                          />
                          <label
                            htmlFor={index}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {vehicle}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
