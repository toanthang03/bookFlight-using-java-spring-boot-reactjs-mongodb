package com.spring.be_booktours.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelQuery {
    private String hotelName; // Tên khách sạn
    private String locationId; // Mã địa điểm
    private double minPrice; // Giá thấp nhất
    private double maxPrice; // Giá cao nhất
    private int active; // Đang hoạt động(1: đang hoạt động, 0: tất cả)
    private String sortBy; // Sắp xếp theo
    private String sortType; // Loại sắp xếp
    private int page; // Trang
    private int limit; // Giới hạn
}
