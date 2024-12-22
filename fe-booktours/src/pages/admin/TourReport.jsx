import React, { useEffect, useState } from "react";
import TourService from "../../services/TourService";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartSkeleton from "../../components/admin/ChartSkeleton";
import formatDateYYYYMMDD from "../../utils/format-date-yyyymmdd";
import AccountService from "../../services/AccountService";
import formatPrice from "../../utils/format-price";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const options = {
  plugins: {
    title: {
      display: true,
      text: "Lượng đặt tour của từng vùng miền",
    },
    legend: {
      position: "right",
    },
  },
};
const options2 = {
  plugins: {
    title: {
      display: true,
      text: "Lượng đặt tour trong 7 ngày gần nhất", // Tiêu đề của biểu đồ
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Ngày", // Tiêu đề của trục X
      },
    },
    y: {
      title: {
        display: true,
        text: "Doanh thu", // Tiêu đề của trục Y
      },
    },
  },
};

const TourReport = () => {
  const [loading, setLoading] = useState(true);
  const [maxBookedTourOfMonth, setMaxBookedTourOfMonth] = useState({});
  const [daysSelected, setDaysSelected] = useState(7);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookedOfRegions, setTotalBookedOfRegions] = useState({});
  const [totalBookedOf7Days, setTotalBookedOf7Days] = useState([]);
  const [topRatedTours, setTopRatedTours] = useState([]);
  const [rateComeBack, setRateComeBack] = useState(0);
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date;
  });

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await TourService.getTotalRevenue(daysSelected);
        setTotalRevenue(response.data);
      } catch (error) {
        console.error("Failed to fetch total revenue: ", error);
      }
    };
    fetchTotalRevenue();
  }, [daysSelected]);

  useEffect(() => {
    document.title = "Báo cáo tour";

    const fetchTotalBookedOfRegions = async () => {
      try {
        const response = await TourService.getBookedToursByRegion();
        // console.log(response.data);
        if (response.status === 200) {
          setLoading(false);
          const data = response.data;
          setTotalBookedOfRegions({
            labels: data?.length > 0
              ? data?.map((item) => `${item.regionName}(${item.totalBooking})`)
              : ["Red", "Blue", "Yellow"],
            datasets: [
              {
                data: data?.length > 0
                  ? data?.map((item) => item.totalBooking)
                  : [300, 50, 100],
                // Màu ngẫu nhiên
                backgroundColor: Array.from(
                  { length: data ? data.length : 3 },
                  () => "#" + Math.floor(Math.random() * 16777215).toString(16)
                ),
                hoverBackgroundColor: Array.from(
                  { length: data ? data.length : 3 },
                  () => "#" + Math.floor(Math.random() * 16777215).toString(16)
                ),
              },
            ],
          });
        }
      } catch (error) {
        console.error("Failed to fetch total booked of regions: ", error);
      }
    };
    const fetchTotalBookedOf7Days = async () => {
      try {
        const response = await TourService.getBookedTourOf7Days();
        // console.log(response.data);
        const revenues = response.data;
        const newRevenues = [];
        last7Days.forEach((date) => {
          const formattedDate = formatDateYYYYMMDD(date);
          const revenue = revenues.find((item) => item.day === formattedDate);
          newRevenues.push({
            day: formattedDate,
            revenue: revenue ? revenue.revenue : 0,
          });
        });
        newRevenues.reverse();
        // console.log(newRevenues);
        setTotalBookedOf7Days({
          labels: newRevenues?.length > 0
            ? newRevenues?.map((item) => item.day)
            : ["2021-09-01", "2021-09-02", "2021-09-03"],
          datasets: [
            {
              label: "Doanh thu",
              data: newRevenues?.length > 0
                ? newRevenues?.map((item) => item.revenue)
                : [100, 200, 300],
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền cho các cột
              borderColor: "rgba(75, 192, 192, 1)", // Màu đường viền cho các cột
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch revenue of 7 days: ", error);
      }
    };
    const fetchRateComeBack = async () => {
      try {
        const response = await AccountService.getRateComeback();
        // console.log(response.data);
        setRateComeBack(response.data);
      } catch (error) {
        console.error("Failed to fetch rate come back: ", error);
      }
    };
    const fetchTopRatingTours = async () => {
      try {
        const response = await TourService.getTop5TourWithPositiveReview();
        // console.log(response.data);
        setTopRatedTours(response.data);
      } catch (error) {
        console.error("Failed to fetch rate come back: ", error);
      }
    };
    const fetchMaxBookedTourOfMonth = async () => {
      try {
        const response = await TourService.getTopBookedTourInMonth();
        // console.log(response.data);
        setMaxBookedTourOfMonth(response.data);
      } catch (error) {
        console.error("Failed to fetch max booked tour of month: ", error);
      }
    };
    fetchTotalBookedOfRegions();
    fetchTotalBookedOf7Days();
    fetchRateComeBack();
    fetchTopRatingTours();
    fetchMaxBookedTourOfMonth();
  }, []);

  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 md:px-8">
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="rounded-xl overflow-hidden bg-white">
              {loading ? (
                <ChartSkeleton />
              ) : (
                <Doughnut data={totalBookedOfRegions} options={options} />
              )}
            </div>
            <div className="rounded-xl overflow-hidden bg-white lg:col-span-2">
              {loading ? (
                <ChartSkeleton />
              ) : (
                <Bar data={totalBookedOf7Days} options={options2} />
              )}
            </div>
            <div className="rounded-xl overflow-hidden bg-white col-span-1 p-5">
              <h1 className="text-center font-bold text-sm mb-2">
                Tỷ lê khách hàng quay lại
              </h1>
              <div className="w-40 h-40 m-auto flex">
                <p className="text-sky-700 text-6xl font-bold m-auto">
                  {rateComeBack}%
                </p>
              </div>
              <p>
                (Cứ 10 người đặt tour thì sẽ có {(10 * rateComeBack) / 100}{" "}
                người quay lại)
              </p>
            </div>
            <div className="rounded-xl overflow-hidden bg-white col-span-1 p-5">
              <h1 className="text-center font-bold text-sm mb-2">
                Doanh thu trong {daysSelected} ngày gần nhất
              </h1>
              <div className="grid m-auto h-40">
                <p className="text-sky-700 text-4xl font-bold m-auto">
                  {formatPrice(totalRevenue)}
                </p>
              </div>
              <div className="grid">
                <input
                  type="number"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  value={daysSelected}
                  onChange={(e) => setDaysSelected(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e" || e.key === "E") {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                  }}
                />
                <span className="mx-auto mt-1">
                  (Chỉ định ngày để xem doanh thu)
                </span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-white col-span-1 p-5">
              <h1 className="text-center font-bold text-sm mb-2">
                Tour được đặt nhiều nhất trong tháng
              </h1>
              <div className="grid m-auto h-56">
                <h1 className="text-sky-700 text-2xl font-bold m-auto text-center">
                  {maxBookedTourOfMonth?._id}
                </h1>
                <h5 className="text-black text-2xl m-auto text-center">Số lượng đặt: <span className="text-sky-700 text-3xl font-body">{maxBookedTourOfMonth?.totalBookings}</span></h5>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden lg:col-span-3 p-5">
              <h1 className="text-center font-bold text-sm mb-2">
                5 Tour có nhiều đánh giá tích cực
              </h1>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tên tour
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Điểm trung bình
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topRatedTours?.map((tour, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="w-5 truncate px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {tour.tourName}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          {tour.averageRating}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TourReport;
