import React, { useContext, useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/solid";
import { GlobalContext } from "../contexts/GlobalProvider";
import { Link } from "react-router-dom";

const UserInfomation = () => {
  const context = useContext(GlobalContext);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    setProfile(context.profile);
  }, []);
  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Thông tin cá nhân
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Chi tiết thông tin cá nhân của bạn
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Mã người dùng</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {profile?.id}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {" "}
              {profile?.name}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {profile?.email}
              {!profile?.verifiedEmail && (
                <Link to="/verify-email" className="text-sky-600">
                  (Xác thực ngay)
                </Link>
              )}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Số điện thoại</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {profile?.phone === null ? "Chưa cập nhật" : profile?.phone}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Vai trò</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {profile?.authorities?.map((role) => role.authority).join(", ")}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Mật khẩu</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {profile?.password}
              {
                <Link to="/setting?nav=2" className="text-sky-600">
                  (Đổi mật khẩu)
                </Link>
              }
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default UserInfomation;
