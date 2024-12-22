package com.spring.be_booktours.entities.flight_entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Hãng hàng không
public class Airline {
    private String airlineId; // Mã hãng hàng không
    private String airlineName; // Tên hãng hàng không
    private String logo; // Logo hãng hàng không
}
