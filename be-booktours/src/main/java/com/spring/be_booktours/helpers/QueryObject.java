package com.spring.be_booktours.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
// import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QueryObject {
    private String location; // Tỉnh thành đến
    private String region; // Vùng miền đến
    private double minPrice; // Giá thấp nhất
    private double maxPrice; // Giá cao nhất
    // private Date startDate; // Ngày bắt đầu đi
    private String vehicle; // Phương tiện
    private String tourType; // Loại tour
    // sort
    private String sortBy;
    private String sortType;
    //Phân trang
    private int page;
    private int limit;
}
