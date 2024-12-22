import axios from "axios";

export default class AccountService {
  static BASE_URL = "http://localhost:8081/api/v1/account";
  static ADMIN_URL = "http://localhost:8081/api/v1/admin/account";

  static async Login(formData) {
    try {
      const response = await axios.post(`${this.BASE_URL}/login`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async Register(formData) {
    try {
      const response = await axios.post(`${this.BASE_URL}/register`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async SendVerifyCode() {
    try {
      const response = await axios.get(`${this.BASE_URL}/create-and-send`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async VerifyEmail() {
    try {
      const response = await axios.get(`${this.BASE_URL}/verify-email`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async GetProfile() {
    try {
      const response = await axios.get(`${this.BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
      // console.log("Bạn chưa đăng nhập");
    }
  }

  static async GetRoles() {
    try {
      const response = await axios.get(`${this.BASE_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      // throw error;
      // console.log("Không thể xác định vai trò của bạn");
    }
  }

  static async ChangePassword(formData) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/change-password`,
        formData,
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

  static async ChangeProfile(formData) {
    try {
      const response = await axios.put(
        `${this.BASE_URL}/update-profile`,
        formData,
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

  static async getAllUsers(page, limit) {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/get-all-users?page=${page}&limit=${limit}`,
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

  static async grantRevokeRole(email, roles) {
    try {
      const response = await axios.put(
        `${this.ADMIN_URL}/roles/${email}`,
        roles,
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

  // Xóa user
  static async deleteUser(email) {
    try {
      const response = await axios.delete(`${this.ADMIN_URL}/delete/${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Đăng xuất
  static Logout() {
    localStorage.removeItem("token");
  }

  // Kiểm tra đăng nhập
  static isAuthenticated() {
    const token = localStorage.getItem("token");
    // console.log('token', token);
    return token !== null;
  }

  // Cấp lại mật khẩu
  static async resetPassword(email) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/reset-password/${email}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Đếm các user đã đăng ký trong n ngày gần nhất
  static async countUserRegisterInNDays(days) {
    try {
      const response = await axios.get(
        `${this.ADMIN_URL}/count-customers?days=${days}`,
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

  // Tính toán tỷ lệ quay lại của khách hàng
  static async getRateComeback() {
    try {
      const response = await axios.get(`${this.ADMIN_URL}/return-rate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Liên hệ
  static async Contact(formData) {
    try {
      const response = await axios.post(`${this.BASE_URL}/contact`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
