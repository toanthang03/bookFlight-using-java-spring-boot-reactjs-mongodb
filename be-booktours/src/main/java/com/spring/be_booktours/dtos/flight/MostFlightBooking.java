package com.spring.be_booktours.dtos.flight;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MostFlightBooking {
    private String flightCode;
    private String flightName;
    private int ticketCount;
}
