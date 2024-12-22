import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccountService from "../services/AccountService";
import { GlobalContext } from "../contexts/GlobalProvider";

const VerifyEmail = () => {
  useEffect(() => {
    document.title = "Xác thực email";
    window.scrollTo(0, 0);
  }, []);
  const [count, setCount] = useState(0);
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const [verifyCode, setVerifyCode] = useState({
    code: "",
    isExpired: false,
  });
  const [code, setCode] = useState("");
  const [validCode, setValidCode] = useState("");

  useEffect(() => {
    const fetchVerifyCode = async () => {
      try {
        const response = await AccountService.SendVerifyCode();
        // console.log(response);

        setVerifyCode({
          code: response?.data,
          isExpired: false,
        });

        // Đặt thời gian hết hạn cho mã sau 30 giây
        const timeoutId = setTimeout(() => {
          setVerifyCode((prev) => ({ ...prev, isExpired: true }));
        }, 30000);

        // Dọn dẹp timeout khi component unmount hoặc khi `count` thay đổi
        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVerifyCode();
  }, [count]);

  const handleVerify = async () => {
    if (!verifyCode.isExpired) {
      if (verifyCode.code?.length > 0 && code === verifyCode.code) {
        try {
          const response = await AccountService.VerifyEmail();
          if (response?.status === 200) {
            alert(response?.message);
            navigate("/");
          }
        } catch (error) {
          console.error(error);
          alert("Xác thực thất bại, vui lòng thử lại sau");
        }
      } else {
        setValidCode("Mã xác thực không chính xác");
      }
    } else {
      setValidCode("Mã xác thực đã hết hạn, vui lòng chọn gửi lại mã");
    }
  };
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/src/assets/img/general/logo-dark.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
          Xác thực email
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h3>
            Chúng tôi đã gửi một mã xác thực đến{" "}
            <span className="font-semibold">{context.profile?.email}</span>
          </h3>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Mã xác thực
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <span className="text-red-500">{validCode}</span>
              </div>
            </div>

            <div className="grid gap-3">
              <button
                type="button"
                className="w-full flex text-gray-700 justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={() => setCount(count + 1)}
              >
                Gửi lại
              </button>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={handleVerify}
              >
                Xác thực
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
