package com.spring.be_booktours.entities.sub_entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    private String vehicleId; // Mã phương tiện
    private String vehicleName; // Tên phương tiện
    private String vehicleImage; // Hình ảnh phương tiện minh họa
    private String vehicleType; // Loại phương tiện
    private int maxPeople; // Số người tối đa
    private int maxLuggage; // Số vali tối đa
    private double vehiclePrice; // Giá thuê phương tiện
}
