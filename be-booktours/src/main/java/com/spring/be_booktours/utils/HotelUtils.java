package com.spring.be_booktours.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class HotelUtils {

    // Tạo mã khách sạn
    public static String generateHotelCode() {
        // Định dạng mã khách sạn: HT + 10 kí tự chữ hoặc số ngẫu nhiên
        String hotelCode = "HT";
        for (int i = 0; i < 10; i++) {
            int random = (int) (Math.random() * 62);
            if (random < 10) {
                hotelCode += random;
            } else if (random < 36) {
                hotelCode += (char) (random + 55);
            } else {
                hotelCode += (char) (random + 61);
            }
        }
        return hotelCode; 
    }

    // Tạo mã đăng ký phòng
    public static String generateBookingCode() {
        // Định dạng mã đăng ký phòng: BKHT + 10 kí tự chữ hoặc số ngẫu nhiên
        String bookingCode = "BKHT";
        for (int i = 0; i < 10; i++) {
            int random = (int) (Math.random() * 62);
            if (random < 10) {
                bookingCode += random;
            } else if (random < 36) {
                bookingCode += (char) (random + 55);
            } else {
                bookingCode += (char) (random + 61);
            }
        }
        return bookingCode;
    }
}
