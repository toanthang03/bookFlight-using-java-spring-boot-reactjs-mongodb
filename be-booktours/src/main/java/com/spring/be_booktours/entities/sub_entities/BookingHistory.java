package com.spring.be_booktours.entities.sub_entities;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingHistory {
    private String bookingCode; // Mã đặt tour
    private String tourId; // Mã tour
    private Date bookingDate; // Ngày đặt tour
}
