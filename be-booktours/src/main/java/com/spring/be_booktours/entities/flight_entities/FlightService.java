package com.spring.be_booktours.entities.flight_entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightService {
    private String flightServiceId; // Mã dịch vụ
    private String flightServiceName; // Tên dịch vụ
    private double flightServicePrice; // Giá dịch vụ
}
