package com.spring.be_booktours.utils;

import java.util.Date;

import com.spring.be_booktours.dtos.flight.DefaultFlight;
import com.spring.be_booktours.entities.Flight;
import com.spring.be_booktours.entities.flight_entities.FlightService;
import com.spring.be_booktours.entities.flight_entities.Passenger;
import com.spring.be_booktours.entities.flight_entities.Ticket;

import lombok.experimental.UtilityClass;

@UtilityClass
public class FlightUtils {

    public static double calculatePrice(Flight flight, Ticket ticket) {
        double totalPrice = 0;

        // Tính tiền theo ghế trước và tuổi sau

        // tuổi > 12 trở lên là người lớn 100% * giá loại ghế
        // 1 < tuổi <= 11 tuổi là trẻ em 50% * giá loại ghế
        // tuổi < 1 là trẻ sơ sinh 10% * giá loại ghế

        for (Passenger item : ticket.getPassengers()) {
            double totalPriceItem = 0;

            // Tính tuổi của hành khách
            int age = calculateAge(item.getDateOfBirth());
            if (age > 12) {
                // Tính tiền theo giá loại ghế
                totalPriceItem = item.isVip() ? flight.getVipPrice() : flight.getNormalPrice();
            } else if (age > 1 && age <= 11) {
                totalPriceItem = (item.isVip() ? flight.getVipPrice() : flight.getNormalPrice()) * 0.5;
            } else {
                totalPriceItem = (item.isVip() ? flight.getVipPrice() : flight.getNormalPrice()) * 0.1;
            }
            if (totalPriceItem == 0) {
                throw new RuntimeException("Ghế không tồn tại hoặc không hợp lệ");
            }
            totalPrice += totalPriceItem;
        }

        // Tổng tiền các dịch vụ đã chọn
        for (FlightService service : ticket.getFlightServices()) {
            // Nếu dịch vụ có tồn tại trong danh sách dịch vụ của chuyến bay
            if (flight.getFlightServices().contains(service)) {
                totalPrice += service.getFlightServicePrice();
            }
        }

        // Cộng thêm thuế
        totalPrice += flight.getTax();

        return totalPrice;
    }

    // Tính tuổi từ ngày sinh
    @SuppressWarnings("deprecation")
    public static int calculateAge(Date dateOfBirth) {
        int age = 0;
        // Năm hiện tại
        int currentYear = new Date(System.currentTimeMillis()).getYear();
        // Năm sinh
        int yearOfBirth = dateOfBirth.getYear();
        age = currentYear - yearOfBirth;
        // Nếu tháng sinh hiện tại nhỏ hơn tháng sinh thì trừ tuổi đi 1
        if (new Date(System.currentTimeMillis()).getMonth() < dateOfBirth.getMonth()) {
            age--;
        } else {
            // Nếu tháng sinh hiện tại bằng tháng sinh và ngày sinh hiện tại nhỏ hơn ngày
            // sinh thì trừ tuổi đi 1
            if (new Date(System.currentTimeMillis()).getMonth() == dateOfBirth.getMonth()
                    && new Date(System.currentTimeMillis()).getDate() < dateOfBirth.getDate()) {
                age--;
            }
        }

        return age;
    }

    public static String generateFlightCode(DefaultFlight defaultFlight) {
        return defaultFlight.getAirline().getAirlineId() + defaultFlight.getDeparture().getAirfieldId()
                + defaultFlight.getDestination().getAirfieldId();
    }

    public static String generateTicketId(String FlightId) {
        // Mã chuyến + ngày giờ phút giây
        String ticketId = FlightId + new Date().getTime();
        return ticketId;
    }

    public static String generateScheduleId() {
        // SCD + 3 số ngẫu nhiên từ 100 - 999
        String scheduleId = "SCD" + (int) (Math.random() * 900 + 100);
        return scheduleId;
    }

}
