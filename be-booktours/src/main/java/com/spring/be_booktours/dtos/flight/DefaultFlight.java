package com.spring.be_booktours.dtos.flight;

import com.spring.be_booktours.entities.flight_entities.Airline;
import com.spring.be_booktours.entities.sub_entities.Airfield;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DefaultFlight {
    private Airline airline; // (d) Hãng hàng không
    private Airfield departure; // (d) Sân bay đi
    private Airfield destination; // (d) Sân bay đến
}
