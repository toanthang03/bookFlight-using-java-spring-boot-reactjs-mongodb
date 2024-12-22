import axios from "axios";

export default class FlightService {
  static BASE_URL = "http://localhost:8081/api/v1/flight";
  static ADMIN_URL = "http://localhost:8081/api/v1/admin/flight";

  // Xem các chuyến bay
  static async getFlights(flightQuery) {
    let url = `${this.BASE_URL}?departure=${flightQuery?.departure}&destination=${flightQuery?.destination}&airline=${flightQuery?.airline}&departureDate=${flightQuery?.departureDate}&minPrice=${flightQuery?.minPrice}&maxPrice=${flightQuery?.maxPrice}&cancelable=${flightQuery?.cancelable}&active=${flightQuery?.active}&sortBy=${flightQuery?.sortBy}&sortType=${flightQuery?.sortType}&page=${flightQuery?.page}&limit=${flightQuery?.limit}`;
  // console.log(url);
      
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Xem chi tiết chuyến bay
  static async getFlight(flightCode) {
    try {
      const response = await axios.get(`${this.BASE_URL}/${flightCode}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Đặt vé
  static async bookTicket(flightCode, ticket) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/book-ticket/${flightCode}`,
        ticket,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Xem thông tin đặt vé của một vé cụ thể
  static async getTicket(flightCode, ticketId) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/ticket-info/${flightCode}/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Thanh toán vé
  static async payTicket(flightCode, ticketId, payment) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/pay-ticket/${flightCode}/${ticketId}`,
        payment,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Hủy vé
  static async cancelTicket(flightCode, ticketId) {
    try {
      const response = await axios.put(
        `${this.BASE_URL}/cancel-ticket/${flightCode}/${ticketId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Tạo mặc định
  static async createDefaultFlight(defaultFlight) {
    try {
      const response = await axios.post(
        `${this.ADMIN_URL}/create-default-flight`,
        defaultFlight,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin chyến bay
  static async updateFlight(flightCode, flight) {
    try {
      const response = await axios.put(
        `${this.ADMIN_URL}/update-flight/${flightCode}`,
        flight,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Thêm lịch mới
  static async addSchedule(flightCode, schedule) {
    try {
      const response = await axios.post(
        `${this.ADMIN_URL}/add-schedule/${flightCode}`,
        schedule,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Tính doanh thu theo từng hãng bay
  static async getRevenueByAirline() {
    try {
      const response = await axios.get(`${this.ADMIN_URL}/revenue-by-airline`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // 5 chuyến bay thường xuyên nhất
  static async getTop5Flight() {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/top-5-most-frequent-flights`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Thống kê tỉ lệ vé bị hủy
  static async getCancelTicketRate() {
    try {
      const response = await axios.get(`${this.ADMIN_URL}/cancellation-rate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // 5 Sân bay được đến nhiều nhất
  static async getTop5Airport() {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/top-5-most-visited-airports`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Doanh thu trong n ngày gần nhất
  static async getRevenueInRecentDays(days) {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/revenue-by-n-days/${days}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Số vé đã đặt trong ngày gần nhất
  static async getTicketInRecentDays(days) {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/count-booked-tickets-by-n-days/${days}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Khách hàng đặt vé nhiều nhất trong n ngày gần nhất
  static async getTopCustomerInRecentDays(days) {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/most-booking-customer-by-n-days/${days}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }


}
