import axios from "axios";

export default class AirportTransferService {
  static BASE_URL = "http://localhost:8081/api/v1/airport-transfer";
  static ADMIN_URL = "http://localhost:8081/api/v1/admin/airport-transfer";

  // Get all airport transfers
  static async getAirportTransfers() {
    try {
      const response = await axios.get(this.BASE_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get airport transfer by id
  static async getAirportTransferById(airportTransfer, isActive, countVehicle) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/${airportTransfer}?isActive=${isActive}&countVehicle=${countVehicle}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get airport transfer by airport
  static async getAirportTransferByAirport(airportId, isActive, countVehicle) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/find-by-airport/${airportId}?isActive=${isActive}&countVehicle=${countVehicle}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // book ride
  static async bookRide(airportTransferId, bookRide) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/book-ride/${airportTransferId}`,
        bookRide,
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

  // get book ride by id
  static async getBookRideById(airportTransferId, bookRideId) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/find-book-ride/${airportTransferId}/${bookRideId}`,
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

  // tạo chuyến đi
  static async createAirportTransfer(airport) {
    try {
      const response = await axios.post(`${this.ADMIN_URL}/create`, airport, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // cập nhật chuyến đi
  static async updateAirportTransfer(airportTransfer) {
    try {
      const response = await axios.put(
        `${this.ADMIN_URL}/update`,
        airportTransfer,
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

  // doanh thu trong n ngày gần nhất
  static async getRevenueInLastNDays(days) {
    try {
      const response = await axios.get(`${this.ADMIN_URL}/revenue/${days}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // thanh toán
  static async payment(airportTransferId, bookRideId, payment) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/payment-bookride/${airportTransferId}/${bookRideId}`,
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
}
