package com.spring.be_booktours.dtos.result_queries;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TotalBookingOfRegion {
    private String regionName;
    private int totalBooking;
}
