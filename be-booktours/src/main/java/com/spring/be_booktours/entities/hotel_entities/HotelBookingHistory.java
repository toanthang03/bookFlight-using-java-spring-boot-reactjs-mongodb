package com.spring.be_booktours.entities.hotel_entities;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelBookingHistory {
    private String hotelCode;
    private String bookingCode;
    private Date bookingDate;
}
