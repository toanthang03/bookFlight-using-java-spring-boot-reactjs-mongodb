import React, { act, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AirportTransferService from "../../services/AirportTransferService";
import { VehicleData } from "../../statics/datas/VehicleData";

const people = [
  { id: 1, name: "Annette Black" },
  { id: 2, name: "Cody Fisher" },
  { id: 3, name: "Courtney Henry" },
  { id: 4, name: "Kathryn Murphy" },
  { id: 5, name: "Theresa Webb" },
];
const vehicles = VehicleData;
const AirportTransferEdit = () => {
  const { airportTransferId } = useParams();
  const [airportTransfer, setAirportTransfer] = useState({});
  useEffect(() => {
    document.title = "Cập nhật dịch vụ đưa đón sân bay";
    const fetchAirportTransfer = async () => {
      try {
        const response = await AirportTransferService.getAirportTransferById(
          airportTransferId,
          0,
          0
        );
        // console.log(response.data);
        setAirportTransfer(response.data);
      } catch (error) {
        console.error("fetchAirportTransfer -> error", error);
      }
    };
    fetchAirportTransfer();
  }, []);

  useEffect(() => {
    if (airportTransfer.vehicles?.length < 1) {
      setAirportTransfer({
        ...airportTransfer,
        active: false,
      });
    }
  }, [airportTransfer?.vehicles]);

  const handleChange = async () => {
    try {
      const response = await AirportTransferService.updateAirportTransfer(
        airportTransfer
      );
      // console.log(response);
      if (response?.status === 200) {
        alert("Cập nhật thành công");
      } else {
        alert("Có lỗi xảy ra(" + response?.message + ")");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex-1">
      <div className="py-6 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Cập nhật dịch vụ đưa đón tại sân bay{" "}
            {airportTransfer.airfield?.airfieldName}
          </h1>
          <p className="text-gray-500 italic">
            Cập nhật thông tin dịch vụ đưa đón tại sân bay
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="mt-6 grid lg:grid-cols-5 gap-3 lg:gap-5">
            <div className="col-span-5 rounded-lg">
              <div className="">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <h1 className="text-2xl font-semibold my-3">
                      Thông tin cơ bản
                    </h1>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor="AirfieldId"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mã sân bay(disabled)
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={airportTransfer.airfield?.airfieldId}
                            onChange={(e) =>
                              setAirportTransfer({
                                ...airportTransfer,
                                airfield: { airfieldId: e.target.value },
                              })
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="AirportName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tên sân bay(disabled)
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={airportTransfer.airfield?.airfieldName}
                            onChange={(e) =>
                              setAirportTransfer({
                                ...airportTransfer,
                                airfield: { airfieldName: e.target.value },
                              })
                            }
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="Location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tỉnh/Thành phố(disabled)
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={airportTransfer.airfield?.locationName}
                            onChange={(e) =>
                              setAirportTransfer({
                                ...airportTransfer,
                                airfield: { locationName: e.target.value },
                              })
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="ready"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Trạng thái hoạt động
                        </label>
                        <div className="mt-1">
                          <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={
                              airportTransfer?.active
                                ? "Đang hoạt động"
                                : "Dừng hoạt động"
                            }
                            onChange={(e) =>
                              setAirportTransfer({
                                ...airportTransfer,
                                active:
                                  e.target.value === "Đang hoạt động"
                                    ? true
                                    : false,
                              })
                            }
                          >
                            <option value="Đang hoạt động">
                              Đang hoạt động
                            </option>
                            <option value="Dừng hoạt động">
                              Dừng hoạt động
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={handleChange}
                      disabled={airportTransfer.vehicles?.length === 0}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6 grid gap-3">
                    <h1 className="text-2xl font-semibold">
                      Các phương tiện hỗ trợ
                    </h1>
                    <div className="mt-5 flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Mã phương tiện
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Tên phương tiện
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Hình ảnh
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Số người tối đa
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Số hành lý tối đa
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Giá
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {airportTransfer.vehicles?.map(
                                  (vehicle, index) => (
                                    <tr
                                      key={index}
                                      className={
                                        index % 2 === 0
                                          ? "bg-white"
                                          : "bg-gray-50"
                                      }
                                    >
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {vehicle.vehicleId}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {vehicle.vehicleName}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <img
                                          src={vehicle.vehicleImage}
                                          alt=""
                                          className="w-20"
                                        />
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {vehicle.maxPeople}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {vehicle.maxLuggage}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <input
                                          type="number"
                                          className="my-auto appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                          placeholder="Tìm kiếm sân bay"
                                          step={10000}
                                          value={vehicle.vehiclePrice}
                                          onChange={(e) => {
                                            setAirportTransfer({
                                              ...airportTransfer,
                                              vehicles:
                                                airportTransfer.vehicles.map(
                                                  (v) =>
                                                    v.vehicleId ===
                                                    vehicle.vehicleId
                                                      ? {
                                                          ...v,
                                                          vehiclePrice:
                                                            e.target.value,
                                                        }
                                                      : v
                                                ),
                                            });
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === "-" || e.key === "e" || e.key === "E") {
                                              e.preventDefault();
                                            }
                                          }}
                                          onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                            {airportTransfer.vehicles?.length === 0 && (
                              <div className="text-center py-4 text-gray-500 h-52">
                                Hiện chưa có phương tiện hỗ trợ
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <fieldset>
                      <legend className="text-lg font-medium text-gray-900">
                        Phương tiện sẵn có
                      </legend>
                      <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                        {vehicles.map((vehicle, index) => (
                          <div
                            key={index}
                            className="relative flex items-start py-4"
                          >
                            <div className="min-w-0 flex-1 text-sm">
                              <label
                                htmlFor={`vehicle-${vehicle.vehicleId}`}
                                className="font-medium text-gray-700 select-none"
                              >
                                {vehicle.vehicleName}
                              </label>
                            </div>
                            <div className="ml-3 flex items-center h-5">
                              <input
                                type="checkbox"
                                className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                                checked={airportTransfer.vehicles?.some(
                                  (v) => v.vehicleId === vehicle.vehicleId
                                )}
                                onChange={(e) => {
                                  //Thêm hoặc xóa phương tiện
                                  if (e.target.checked) {
                                    setAirportTransfer({
                                      ...airportTransfer,
                                      vehicles: [
                                        ...airportTransfer.vehicles,
                                        vehicle,
                                      ],
                                    });
                                  } else {
                                    setAirportTransfer({
                                      ...airportTransfer,
                                      vehicles: airportTransfer.vehicles.filter(
                                        (v) => v.vehicleId !== vehicle.vehicleId
                                      ),
                                    });
                                  }
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={handleChange}
                      disabled={airportTransfer.vehicles?.length === 0}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  );
};

export default AirportTransferEdit;
