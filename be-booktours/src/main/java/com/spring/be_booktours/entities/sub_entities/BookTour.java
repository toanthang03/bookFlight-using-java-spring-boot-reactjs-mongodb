package com.spring.be_booktours.entities.sub_entities;


import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookTour {
    private String bookingCode; // Mã đặt tour
    private String emailBooking; // Email đặt tour
    private Date bookingDate; // Ngày đặt tour
    private double totalPrice; // Tổng giá
    private Date departureDate; // Ngày khởi hành
    private int adultNumber; // Số lượng người lớn
    private int childrenNumber; // Số lượng trẻ em
    private int youngChildrenNumber; // Số lượng trẻ nhỏ
    private int babyNumber; // Số lượng em bé
    private String note; // Ghi chú
    @Valid
    private Booker booker; // Người đặt tour
    private Set<TourService> tourServices = new HashSet<>(); // Danh sách dịch vụ đi kèm
    private boolean isConfirmed; // Trạng thái xác nhận
    private Payment payment; // Thông tin thanh toán
}
