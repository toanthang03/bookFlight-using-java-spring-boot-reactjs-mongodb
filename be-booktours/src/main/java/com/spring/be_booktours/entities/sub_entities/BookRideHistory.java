package com.spring.be_booktours.entities.sub_entities;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookRideHistory {
    private String bookRideId; // Mã lượt đặt
    private String airportTransferId; // Mã chuyến bay
    private Date bookingDate; // Ngày đặt
}
