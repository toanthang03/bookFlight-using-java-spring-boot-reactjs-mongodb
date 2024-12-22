package com.spring.be_booktours.entities.flight_entities;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightBooking {
    private String flightCode; // Mã chuyến bay
    private String ticketId; // Mã vé
    private Date bookingDate; // Ngày đặt
}
