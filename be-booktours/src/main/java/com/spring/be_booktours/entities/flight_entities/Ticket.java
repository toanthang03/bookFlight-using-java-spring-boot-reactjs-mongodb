package com.spring.be_booktours.entities.flight_entities;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.spring.be_booktours.entities.sub_entities.Payment;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// (q) nghĩa là có thể dùng trong truy vấn
public class Ticket {
    private String ticketId; // Mã vé (được tạo tự động)
    private Date bookingDate; // Ngày đặt (được tạo tự động)
    private String scheduleId; // Lịch bay (q)
    private List<Passenger> passengers; // Hành khách
    private Set<FlightService> flightServices = new HashSet<>(); // Dịch vụ đã chọn
    private double totalPrice; // Tổng tiền
    @Valid
    private ContactInfo contactInfo; // Thông tin liên hệ
    private Payment payment; // Thông tin thanh toán
    private boolean confirmed; // true: đã xác nhận, false: chưa xác nhận (q)
    private boolean canceled; // true: đã hủy, false: chưa hủy
}
