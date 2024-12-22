import axios from "axios";

export default class HotelService {
  static BASE_URL = "http://localhost:8081/api/v1/hotel";
  static ADMIN_URL = "http://localhost:8081/api/v1/admin/hotel";

  // Xem các khách sạn
  static async getHotels(hotelQuery) {
    let url = `${this.BASE_URL}?hotelName=${hotelQuery.hotelName}&locationId=${hotelQuery.locationId}&minPrice=${hotelQuery.minPrice}&maxPrice=${hotelQuery.maxPrice}&active=${hotelQuery.active}&sortBy=${hotelQuery.sortBy}&sortType=${hotelQuery.sortType}&page=${hotelQuery.page}&limit=${hotelQuery.limit}`;
    // console.log(url);

    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Xem chi tiết khách sạn
  static async getHotel(hotelCode) {
    try {
      const response = await axios.get(`${this.BASE_URL}/${hotelCode}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Đặt khách sạn
  static async bookHotel(hotelCode, booking) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/book-room/${hotelCode}`,
        booking,
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

  // Hủy đặt phòng
  static async cancelBookHotel(hotelCode, bookingCode) {
    try {
      const response = await axios.put(
        `${this.BASE_URL}/cancel-room/${hotelCode}/${bookingCode}`, null,
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

  // Chi tiết đơn đặt phòng
  static async getBookingHotel(hotelCode, bookingCode) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/booking-detail/${hotelCode}/${bookingCode}`,
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

  // Thanh toán
  static async payment(hotelCode, bookingCode, payment) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/pay-room/${hotelCode}/${bookingCode}`,
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

  // Tạo mặc định
  static async createDefaultHotel(defaultHotel) {
    try {
      const response = await axios.post(
        `${this.ADMIN_URL}/create-default-hotel`,
        defaultHotel,
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

  // Cập nhật khách sạn
  static async updateHotel(hotelCode, hotel) {
    try {
      const response = await axios.put(
        `${this.ADMIN_URL}/update-hotel/${hotelCode}`,
        hotel,
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

  // Thêm loại phòng mới
  static async addRoomType(hotelCode, roomType) {
    try {
      const response = await axios.post(
        `${this.ADMIN_URL}/add-room-type/${hotelCode}`,
        roomType,
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

  // Xem danh sách đặt phòng của 1 khách sạn vào 1 ngày cụ thể
  static async getBookingByDate(hotelCode, date) {
    try {
      // console.log(`${this.ADMIN_URL}/view-booking-room/${hotelCode}?date=${date}`);
      
      const response = await axios.get(
        `${this.ADMIN_URL}/view-booking-room/${hotelCode}?date=${date}`,
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

  // Xác nhận đặt phòng
  static async confirmBooking(hotelCode, bookingCode) {
    try {
      const response = await axios.put(
        `${this.ADMIN_URL}/confirm-booking-room/${hotelCode}/${bookingCode}`, null,
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
