package com.spring.be_booktours.entities.sub_entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.be_booktours.annotations.Phone;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookRide {
    private String bookRideId; // Mã lượt đặt
    private Date bookingDate; // Ngày đặt
    private String address; // Địa chỉ rước/đến
    private boolean airfieldToAddress; // true: rước từ sân bay, false: đến sân bay
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate pickUpDate; // Ngày rước
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime pickUpTime; // Giờ rước
    private String vehicleId; // Mã phương tiện
    private int quantityVehicle; // Số lượng phương tiện
    private double totalCost; // Tổng chi phí
    // Thông tin người đặt
    private String bookerEmail; // Email người đặt
    @NotBlank(message = "Tên người đặt không được để trống")
    private String bookerName; // Tên người đặt
    @NotBlank(message = "Số điện thoại người đặt không được để trống")
    @Phone
    private String bookerPhone; // Số điện thoại người đặt
    private String note; // Ghi chú
    private boolean confirmed; // true: đã xác nhận, false: chưa xác nhận
    private Payment payment; // Thông tin thanh toán
}
