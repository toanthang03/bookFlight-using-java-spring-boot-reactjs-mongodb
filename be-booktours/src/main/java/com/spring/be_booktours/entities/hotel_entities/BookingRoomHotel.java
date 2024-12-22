package com.spring.be_booktours.entities.hotel_entities;

import java.time.LocalDate;
import java.util.Date;

import com.spring.be_booktours.entities.flight_entities.ContactInfo;
import com.spring.be_booktours.entities.sub_entities.Payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRoomHotel {
    private String bookingCode; // Mã đặt phòng
    private Date bookingDate; // Ngày đặt phòng
    private int roomTypeId; // Mã loại phòng(r)
    private int numberOfRooms; // Số lượng phòng(r)
    private LocalDate checkInDate; // Ngày nhận phòng(r)
    private LocalDate checkOutDate; // Ngày trả phòng
    private String emailBooked; // Email người đặt phòng
    private double totalPrice; // Tổng số tiền
    private ContactInfo contactInfo; // Thông tin liên hệ(r)
    private Payment payment; // Thông tin thanh toán
    private boolean confirmed; // true: đã xác nhận, false: chưa xác nhận
}
