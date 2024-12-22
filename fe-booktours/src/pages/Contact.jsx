import react, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { Link } from "react-router-dom";
import AccountService from "../services/AccountService";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    document.title = "GoTrip - Liên hệ";
    window.scrollTo(0, 0);
  }, []);

  const handleContact = async () => {
    try {
      const response = await AccountService.Contact(formData);
      alert(response.message);
      if(response.status === 200) {
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
        setFormErrors({});
      }
    } catch (error) {
      console.error(error);
      setFormErrors(error?.response?.data);
    }
  };

  return (
    <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-xl mx-auto">
        <svg
          className="absolute left-full transform translate-x-1/2"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={404}
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>
        <svg
          className="absolute right-full bottom-0 transform -translate-x-1/2"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={404}
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Liên hệ với chúng tôi
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Điền vào biểu mẫu dưới đây, chúng tôi sẽ liên hệ với bạn trong thời
            gian sớm nhất.
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Họ và tên
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="py-3 px-4 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                <span className="text-sm text-red-500">
                  {formErrors?.fullName}
                </span>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  className="py-3 px-4 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <span className="text-sm text-red-500">
                  {formErrors?.email}
                </span>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Thông điệp
              </label>
              <div className="mt-1">
                <textarea
                  rows={4}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 border border-gray-300 rounded-md"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
                <span className="text-sm text-red-500">
                  {formErrors?.message}
                </span>
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={handleContact}
              >
                Liên hệ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
