package com.spring.be_booktours.helpers;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightQuery {
    private String departure; // Sân bay đi
    private String destination; // Sân bay đến
    private String airline; // Hãng hàng không
    private LocalDate departureDate; // Ngày khởi hành
    private double minPrice; // Giá thấp nhất
    private double maxPrice; // Giá cao nhất
    private String cancelable; // Được phép hủy
    private String active; // Đang hoạt động
    private String sortBy; // Sắp xếp theo
    private String sortType; // Loại sắp xếp
    private int page; // Trang
    private int limit; // Giới hạn
}
