package com.spring.be_booktours.dtos.hotel;

import com.spring.be_booktours.entities.sub_entities.Location;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DefaultHotel {
    private String hotelName; // Tên khách sạn
    private int hotelStar; // Số sao khách sạn
    private Location location; // Địa điểm khách sạn
}
