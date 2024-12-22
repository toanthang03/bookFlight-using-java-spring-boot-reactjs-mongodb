import axios from "axios";

export default class VnPayService {

    static VNPAY_URL = "https://api.vietqr.io/v2/generate";

    static async createQRCode(data) {
        try {
            const response = await axios.post(this.VNPAY_URL, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}