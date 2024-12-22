package com.spring.be_booktours.utils;

import java.util.Date;

import com.spring.be_booktours.entities.Discount;
import com.spring.be_booktours.entities.Tour;
import com.spring.be_booktours.entities.sub_entities.BookTour;

import lombok.experimental.UtilityClass;

@UtilityClass
public class TourUtils {

    public static int ageDiscount(String passengerType) {
        if (passengerType.equals("Em bé")) {
            return 100;
        } else if (passengerType.equals("Trẻ nhỏ")) {
            return 50;
        } else if (passengerType.equals("Trẻ em")) {
            return 20;
        } else {
            return 0;
        }
    }

    public static int cashbackPercentage(Date departureDate) {
        Date cancelDate = new Date();

        // Hủy trước 7 ngày hoàn 70%
        // Hủy từ 3 đến 6 ngày hoàn 50%
        // Hủy trong ngày không hoàn
        long diff = departureDate.getTime() - cancelDate.getTime();
        long diffDays = diff / (24 * 60 * 60 * 1000);
        if (diffDays >= 7) {
            return 70;
        } else if (diffDays >= 3) {
            return 50;
        } else {
            return 0;
        }
    }

    public static int calculateDiscount(Tour tour, BookTour bookTour, Discount discount) {
        int discountPercent = 0;
        switch (discount.getDiscountType()) {
            case "holiday":
                // Ngày lễ(phải đặt trước lễ n ngày kể từ startDate)
                Date startDate = discount.getStartDate();
                Date endDate = new Date(startDate.getTime() + discount.getDuration() * 24 * 60 * 60 * 1000);
                if (new Date().after(startDate) && new Date().before(endDate)) {
                    discountPercent = discount.getPercentDiscount();
                }
                break;
            case "people":
                // Số lượng người
                int totalPeople = bookTour.getAdultNumber() + bookTour.getChildrenNumber()
                        + bookTour.getYoungChildrenNumber() + bookTour.getBabyNumber();
                if (totalPeople >= discount.getMinPeople()) {
                    discountPercent = discount.getPercentDiscount();
                }
                break;
            case "departure":
                // Ngày khởi hành
                if (discount.getDepartureDates().contains(bookTour.getDepartureDate())) {
                    discountPercent = discount.getPercentDiscount();
                }
                break;
            default:
                break;
        }
        return discountPercent;
    }

    public static String generatePaymentId(String email) {
        // PM-yyyyMMddHHmmss-<phần tên email> - lấy từ kí tự đầu đến kí tự @
        return "PM-" + new Date().getTime() + "-" + email.substring(0, email.indexOf('@'));
    }
}
