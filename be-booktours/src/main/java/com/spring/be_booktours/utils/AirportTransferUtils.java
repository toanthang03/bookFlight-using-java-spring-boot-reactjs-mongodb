package com.spring.be_booktours.utils;

public class AirportTransferUtils {
    public static String generateAirportTransferId() {
        // Tạo mã chuyến đưa đón theo định dạng BOOKRIDE + 6 kí tự chữ hoặc số ngẫu
        // nhiên
        String id = "BOOKRIDE";
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (int i = 0; i < 6; i++) {
            int index = (int) (Math.random() * characters.length());
            id += characters.charAt(index);
        }
        return id;
    }
}
