import React from "react";
import { Link } from "react-router-dom";

const NewLetter = () => {
  return (
    <div className="relative bg-white">
      <div className="relative">
        <div className="py-5 px-6 bg-gradient-to-l from-sky-800 to-cyan-700 rounded-3xl sm:px-12 lg:px-20 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              Đăng ký nhận thông tin mới nhất
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-cyan-100">
              Đăng ký nhận thông tin mới nhất từ chúng tôi để không bỏ lỡ bất kỳ
              thông báo hoặc cập nhật nào.
            </p>
          </div>
          <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
            <div className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full border-white px-5 my-auto placeholder-warm-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-700 focus:ring-white rounded-md"
                placeholder="Nhập email của bạn"
              />
              <button
                type="submit"
                className="my-auto mt-3 w-full flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-700 focus:ring-green-400 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              >
                Đăng ký
              </button>
            </div>
            <p className="mt-3 text-sm text-cyan-100">
              Chúng tôi tôn trọng quyền riêng tư của bạn và không bao giờ chia sẻ thông tin của bạn
              <Link to="#" className="text-white font-medium underline">
                Chính sách bảo mật
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLetter;
