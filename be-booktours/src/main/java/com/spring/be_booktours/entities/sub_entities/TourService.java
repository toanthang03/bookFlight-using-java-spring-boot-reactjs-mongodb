package com.spring.be_booktours.entities.sub_entities;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TourService {
    private String serviceName; // Tên dịch vụ
    private double price; // Giá
}
