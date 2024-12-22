import axios from "axios";

export default class TourService {
  static BASE_URL = "http://localhost:8081/api/v1/tour";
  static ADMIN_URL = "http://localhost:8081/api/v1/admin/tour";

  static async getTours(objectQuery) {
    let url = this.BASE_URL + "?";

    url += `region=${objectQuery.region?.normalize(
      "NFC"
    )}&location=${objectQuery.location?.normalize("NFC")}&`;

    if (
      objectQuery.minPrice > -1 &&
      objectQuery.maxPrice - objectQuery.minPrice > 0
    ) {
      url += `minPrice=${objectQuery.minPrice}&maxPrice=${objectQuery.maxPrice}`;
    }
    if (objectQuery.vehicle !== null) {
      url += `&vehicle=${objectQuery.vehicle.normalize("NFC")}`;
    }
    if (objectQuery.tourType !== null) {
      url += `&tourType=${objectQuery.tourType.normalize("NFC")}`;
    }
    // Sort

    url += `&sortBy=${objectQuery.sortBy}&sortType=${objectQuery.sortType}`;

    url += `&page=${objectQuery.page}&limit=${objectQuery.limit}`;

    // console.log(url);

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTourById(tourId) {
    try {
      const response = await axios.get(`${this.BASE_URL}/${tourId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createDefaultTour(defaultTour) {
    try {
      const response = await axios.post(this.ADMIN_URL, defaultTour, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async saveTour(tourId, tour) {
    try {
      const response = await axios.put(`${this.ADMIN_URL}/${tourId}`, tour, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async bookTour(tourId, bookTour) {
    try {
      const response = await axios.put(
        `${this.BASE_URL}/book-tour/${tourId}`,
        bookTour,
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

  static async cancelBookTour(tourId, bookingCode) {
    try {
      const response = await axios.delete(
        `${this.BASE_URL}/book-tour/${tourId}/${bookingCode}`,
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

  static async getBookTour(tourId, bookTourId) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/book-tour/${tourId}/${bookTourId}`,
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

  static async confirmBookTour(tourId, bookTourId) {
    try {
      const response = await axios.put(
        `${this.ADMIN_URL}/confirm/${tourId}/${bookTourId}`,
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

  static async reviewTour(tourId, review) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/review/${tourId}`,
        review,
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

  static async detailBookTour(tourId, bookingCode) {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/book-tour/${tourId}/${bookingCode}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  // Lấy doanh thu trong n ngày gần nhất
  static async getRevenue(days) {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/total-revenue?days=${days}`,
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

  // Số đơn đặt tour trong n ngày gần nhất
  static async getTotalBooked(days) {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/total-booked-tours?days=${days}`,
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

  // 10 tour được đặt nhiều nhất
  static async getTop10BookedTours() {
    try {
      const response = await axios.get(`${this.ADMIN_URL}/top-booked-tours`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async payment(tourId, bookingCode, payment) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/payment/${tourId}/${bookingCode}`,
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

  // Lấy số lượng đặt tour theo từng miền
  static async getBookedToursByRegion() {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/total-booked-tours-by-region`,
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

  // Lượng đặt tour trong 7 ngày gần nhất
  static async getBookedTourOf7Days() {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/total-booking-of-7-days`,
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

  // 5 tour có lượt đánh giá tích cực
  static async getTop5TourWithPositiveReview() {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/top-positive-rating-tours`,
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

  // Lấy tổng doanh thu trong n ngày gần nhất
  static async getTotalRevenue(days) {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/total-revenue?days=${days}`,
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

  // Tour được đặt nhiều nhất trong tháng
  static async getTopBookedTourInMonth() {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/max-booked-tour-of-month`,
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
