import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AirfieldData } from "../../statics/datas/AirfieldData";
import { AirlineData } from "../../statics/datas/AirlineData";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/outline";
import TourService from "../../services/TourService";
import FlightService from "../../services/FlightService";

const airFields = AirfieldData; // 2 input(select)
const airLines = AirlineData; // 1 input(select)
const FlightCreate = (props) => {
  const navigate = useNavigate();
  const [defaultFlight, setDefaultFlight] = useState({
    departure: 0,
    destination: 1,
    airline: 0,
  });

  // const handleCreateMany = async () => {
  //   airFields.forEach((departure, index) => {
  //     airFields.forEach((destination, index) => {
  //       airLines.forEach(async (airline, index) => {
  //         try {
  //           const response = await FlightService.createDefaultFlight({
  //             departure: departure,
  //             destination: destination,
  //             airline: airline,
  //           });
  //           console.log(response);
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       });
  //     });
  //   });
  // };

  const handleCreate = async () => {
    // console.log({
    //   departure: airFields[defaultFlight.departure],
    //   destination: airFields[defaultFlight.destination],
    //   airline: airLines[defaultFlight.airline],
    // });

    try {
      const response = await FlightService.createDefaultFlight({
        departure: airFields[defaultFlight.departure],
        destination: airFields[defaultFlight.destination],
        airline: airLines[defaultFlight.airline],
      });
      // console.log(response);
      if (response.status === 200) {
        alert("Tạo chuyến bay thành công");
        navigate(`/admin/flight-update/${response.data}`);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Transition show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed  inset-0 overflow-y-auto"
        initialFocus={props.cancelButtonRef}
        onClose={() => props.setOpen(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          </TransitionChild>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                  <PlusIcon
                    className="h-6 w-6 text-sky-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Tạo chuyến bay mặc định
                  </DialogTitle>
                  <div className="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="md:col-span-2">
                        <label
                          htmlFor="tourName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Điểm khởi hành
                        </label>
                        <div className="mt-1">
                          <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={defaultFlight.departure}
                            onChange={(e) => {
                              setDefaultFlight({
                                ...defaultFlight,
                                departure: e.target.value,
                              });
                            }}
                          >
                            {airFields.map((airField, index) => (
                              <option key={index} value={index}>
                                {airField.airfieldName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="destination"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Điểm đến
                        </label>
                        <div className="mt-1">
                          <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={defaultFlight.destination}
                            onChange={(e) => {
                              setDefaultFlight({
                                ...defaultFlight,
                                destination: e.target.value,
                              });
                            }}
                          >
                            {airFields.map((airField, index) => (
                              <option key={index} value={index}>
                                {airField.airfieldName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="destination"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Hãng hàng không
                        </label>
                        <div className="mt-1">
                          <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={defaultFlight.airline}
                            onChange={(e) => {
                              setDefaultFlight({
                                ...defaultFlight,
                                airline: e.target.value,
                              });
                            }}
                          >
                            {airLines.map((airLine, index) => (
                              <option key={index} value={index}>
                                {airLine.airlineName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:w-auto sm:text-sm"
                  onClick={handleCreate}
                >
                  Tạo chuyến bay
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.setOpen(false)}
                  ref={props.cancelButtonRef}
                >
                  Hủy
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FlightCreate;
