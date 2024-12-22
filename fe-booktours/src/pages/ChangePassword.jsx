import React, { useEffect, useState } from "react";
import {
  Switch,
  SwitchDescription,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/react";
import AccountService from "../services/AccountService";
import useLogout from "../hooks/use-logout";

const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ChangePassword = () => {
  const [availableToHire, setAvailableToHire] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [allowCommenting, setAllowCommenting] = useState(true);
  const [allowMentions, setAllowMentions] = useState(true);
  const logout = useLogout();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.title = "Đổi mật khẩu";
    window.scrollTo(0, 0);
  }, []);

  const handleChangePassword = async () => {
    try {
      const response = await AccountService.ChangePassword(formData);
      if (response.status === 200) {
        //Đăng xuất
        logout();
      } else {
        alert(response?.message);
      }
    } catch (error) {
      console.error(error);
      setFormError(error.response?.data);
    }
  };

  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Đổi mật khẩu
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Đổi mật khẩu của bạn để bảo vệ tài khoản.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-6 sm:col-span-6">
            <label
              htmlFor="old-password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu cũ
            </label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={formData.oldPassword}
              onChange={(e) =>
                setFormData({ ...formData, oldPassword: e.target.value })
              }
            />
            <span className="text-red-500 text-sm">
              {formError?.oldPassword}
            </span>
          </div>

          <div className="col-span-6 sm:col-span-6">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
            />
            <span className="text-red-500 text-sm">
              {formError?.newPassword}
            </span>
          </div>

          <div className="col-span-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <span className="text-red-500 text-sm">
              {formError?.confirmPassword}
            </span>
          </div>
        </div>
        <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
          <button
            type="button"
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            onClick={handleChangePassword}
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
