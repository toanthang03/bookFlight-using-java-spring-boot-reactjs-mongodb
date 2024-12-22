import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Tour bao gồm những dịch vụ gì?",
    answer:
      "Tour bao gồm: phương tiện di chuyển, chỗ ở (khách sạn, resort), vé tham quan các địa điểm trong chương trình, các bữa ăn theo lịch trình, và hướng dẫn viên du lịch.",
  },
  {
    question: " Có thể thay đổi lịch trình hoặc hủy tour không?",
    answer: "Không thể thay đổi lịch trình hoặc hủy tour sau khi đã đăng ký.",
  },
  {
    question: "Trẻ em có được giảm giá khi tham gia tour không?",
    answer:
      "Với trẻ em từ 6-11 thì sẽ được giảm 50% giá tour, trẻ em từ 3 đến 6 tuổi được giảm 80%, em bé từ 48 tháng tuổi trở xuống được giảm 90%",
  },
  {
    question: "Có cần đặt cọc trước khi tham gia tour không?",
    answer:
      "Đúng vậy, khách hàng cần đặt cọc trước từ 30% đến 50% tổng giá trị tour để giữ chỗ. Số tiền còn lại sẽ được thanh toán trước [số ngày cụ thể] khi tour khởi hành.",
  },
  {
    question:
      "Nếu không thể tham gia tour, tôi có thể nhờ người khác đi thay không?",
    answer:
      "Có thể, nhưng khách hàng cần thông báo và cung cấp thông tin của người đi thay trước [số ngày cụ thể]. Một số công ty sẽ thu thêm phí thay đổi thông tin.",
  },
  {
    question: "Tour có bao gồm vé máy bay không?",
    answer:
      "Một số tour bao gồm vé máy bay, đặc biệt là các tour quốc tế hoặc nội địa xa. Nếu tour không bao gồm vé máy bay, công ty sẽ hỗ trợ đặt vé với giá ưu đãi.",
  },
  {
    question: "Tôi cần chuẩn bị giấy tờ gì để tham gia tour?",
    answer:
      "Với tour nội địa: Chứng minh nhân dân, căn cước công dân hoặc hộ chiếu, giấy khai sinh (nếu đi cùng trẻ em).",
  },
  {
    question: "Nếu tôi bị trễ giờ khởi hành, tour có đợi không?",
    answer:
      "Thông thường, tour không thể đợi vì ảnh hưởng đến lịch trình chung. Vì vậy, khách hàng nên đến điểm hẹn đúng giờ. Nếu có vấn đề phát sinh, hãy liên hệ ngay với nhân viên hỗ trợ.",
  },
  {
    question: "Tôi có thể chọn chỗ ngồi trên xe hoặc máy bay không?",
    answer:
      "Với xe du lịch: Một số tour cho phép khách hàng chọn chỗ ngồi trước (ưu tiên cho khách đặt sớm).\nVới máy bay: Việc chọn chỗ ngồi phụ thuộc vào quy định của hãng hàng không. Công ty có thể hỗ trợ nếu bạn yêu cầu.",
  },
];
const Faq = () => {
  useEffect(() => {
    document.title = "Những câu hỏi thường gặp";
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
            Câu hỏi thường gặp
            </h2>
            <p className="mt-4 text-lg text-gray-500">
            Không thể tìm thấy câu trả lời bạn đang tìm kiếm? Liên hệ với chúng tôi
              <Link
                to="/contact"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {" "}liên hệ
              </Link>{" "}
              với chúng tôi.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-12">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    {faq.answer.split("\n").map((line, index) => (
                      <p key={index} className="mt-2">
                        {line}
                      </p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
