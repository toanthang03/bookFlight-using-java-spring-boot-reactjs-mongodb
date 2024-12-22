import React, { useEffect, useState } from "react";
import Step from "../components/Step";
import { CheckCircleIcon } from "@heroicons/react/outline";
import VnPayService from "../services/VnPaySerivce";
import { useNavigate, useParams } from "react-router-dom";
import TourService from "../services/TourService";
import formatPrice from "../utils/format-price";

const Payment = () => {
  const navigate = useNavigate();
  const { tourId, bookingCode } = useParams();
  const [qrCode, setQrCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [confirmation, setConfirmation] = useState({
    code: "",
    error: "",
  });
  useEffect(() => {
    document.title = "Thanh toán";

    const createQRCode = async (totalPrice) => {
      try {
        const response = await VnPayService.createQRCode({
          acqId: "970415", // Ngân hàng vietinbank
          accountNo: "106876415729", // Số tài khoản của teo
          accountName: "LE NGUYEN CONG HOAN", // Tên tài khoản của teo
          amount: totalPrice, // Số tiền
          format: "text",
          template: "compact",
        });
        // console.log("QR code: ", response);
        setQrCode(
          response.data?.qrDataURL.replace("data:image/png;base64,", "")
        );
        // console.log("QR code: ", response.data?.qrDataURL.replace("data:image/png;base64,", ""));
      } catch (error) {
        console.error("Failed to create QR code: ", error);
      }
    };

    const fetchBooking = async () => {
      try {
        const response = await TourService.getBookTour(tourId, bookingCode);
        // console.log(response.data);
        if (response.status === 200) {
          const totalPrice = response.data?.totalPrice;
          setTotalPrice(totalPrice);
          createQRCode(totalPrice);
        }
      } catch (error) {
        console.error("Failed to fetch booking: ", error);
      }
    };
    fetchBooking();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await TourService.payment(tourId, bookingCode, {
        paymentMethod: "Thanh toán trực tuyến",
        paymentStatus: "Đã thanh toán",
        confirmationPaymentCode: confirmation.code, // Mã xác nhận thanh toán
        paymentAmount: totalPrice, // Số tiền thanh toán
        paymentNote: `Thanh toán QR cho đơn đặt tour ${bookingCode}, số tiền ${formatPrice(
          totalPrice
        )}`, // Ghi chú
      });
      // console.log(response);
      if (response.status === 200) {
        navigate(`/booktour-detail/${tourId}/${bookingCode}`);
      }
    } catch (error) {
      console.error("Failed to confirm payment: ", error);
      setConfirmation({
        ...confirmation,
        error:
          error.response?.data?.confirmationPaymentCode ||
          "Xác nhận thanh toán thất bại",
      });
    }
  };
  return (
    <main className="my-7 bg-white max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <Step currentStep={2} />
        <h1 className="sr-only">Checkout</h1>

        <div className="">
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Thanh toán trực tuyến
              </h2>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-3xl font-semibold text-center mt-4 mb-4">
                  Quét mã QR để thanh toán
                </h2>
                <div className="flex">
                  <img
                    src={`data:image/png;base64,${qrCode}`}
                    alt="QR Code"
                    className="mx-auto w-[300px] h-[300px]"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-[384px] mx-auto">
                  <label
                    htmlFor="corfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mã giao dịch
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      placeholder="Nhập mã giao dịch để xác nhận"
                      value={confirmation.code}
                      onChange={(e) =>
                        setConfirmation({
                          ...confirmation,
                          code: e.target.value,
                        })
                      }
                    />
                    <span className="text-red-500 text-sm">
                      {confirmation.error}
                    </span>
                  </div>
                  <div className="flex mt-1">
                    <button
                      type="button"
                      className="ml-auto inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:w-auto sm:text-sm"
                      onClick={handlePayment}
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;
