import React, { useContext, useEffect, useState } from "react";
import {
  Switch,
  SwitchDescription,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/react";
import { GlobalContext } from "../contexts/GlobalProvider";
import AccountService from "../services/AccountService";

const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};

const ChangeInfomation = () => {
  const context = useContext(GlobalContext);
  const [profileError, setProfileError] = useState({});

  useEffect(() => {
    document.title = "Cập nhập thông tin";
  }, []);

  const handleChangeInfomation = async () => {
    try {
      const response = await AccountService.ChangeProfile({
        name: context.profile?.name,
        phone: context.profile?.phone,
        address: context.profile?.address
      });
      if (response.status === 200) {
        alert("Cập nhập thông tin thành công");
        setProfileError({});
      } else {
        alert(response?.message);
      }
    } catch (error) {
      console.error(error);
      setProfileError(error.response?.data);
    }
  };

  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Cập nhập thông tin
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Cập nhật thông tin cá nhân của bạn để sử dụng dịch vụ tốt nhất
          </p>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Họ và tên
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={context.profile?.name}
              onChange={(e) => context.setProfile({ ...context.profile, name: e.target.value })}
            />
            <span className="text-red-500 text-sm">{profileError?.name}</span>
          </div>

          <div className="col-span-12 sm:col-span-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email(disabled)
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={context.profile?.email}
              disabled
            />
            <span className="text-red-500 text-sm">{profileError?.email}</span>
          </div>

          <div className="col-span-12 sm:col-span-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Số điện thoại
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={context.profile?.phone}
              onChange={(e) =>
                context.setProfile({ ...context.profile, phone: e.target.value })
              }
            />
            <span className="text-red-500 text-sm">{profileError?.phone}</span>
          </div>

          <div className="col-span-12">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Địa chỉ
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={context.profile?.address}
              onChange={(e) =>
                context.setProfile({ ...context.profile, address: e.target.value })
              }
            />
            <span className="text-red-500 text-sm">{profileError?.address}</span>
          </div>
        </div>
        <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
          <button
            type="button"
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            onClick={handleChangeInfomation}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfomation;
