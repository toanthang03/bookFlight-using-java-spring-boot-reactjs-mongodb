import axios from "axios";

export default class DiscountService {
  static ADMIN_URL = "http://localhost:8081/api/v1/admin/discount";

  static async getDiscounts() {
    try {
      const response = await axios.get(this.ADMIN_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async createDiscount(discount) {
    try {
      const response = await axios.post(this.ADMIN_URL, discount, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async updateDiscount(discount) {
    try {
      const response = await axios.put(this.ADMIN_URL, discount, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async deleteDiscount(id) {
    try {
      const response = await axios.delete(`${this.ADMIN_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async applyToAllTours(discount) {
    try {
      const response = await axios.post(
        `${this.ADMIN_URL}/apply-to-all-tours`,
        discount,
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
