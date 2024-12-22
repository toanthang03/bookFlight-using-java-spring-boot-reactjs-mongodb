import axios from "axios";

export default class DataService {
  static BASE_URL = "http://localhost:8081/api/v1/admin/data";

  static async backup() {
    try {
      const response = await axios.get(`${this.BASE_URL}/backup`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async restore() {
    try {
      const response = await axios.get(`${this.BASE_URL}/restore`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async backupCollection(collectionName) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/backup/${collectionName}`,
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

  static async restoreCollection(collectionName) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/restore/${collectionName}`,
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
