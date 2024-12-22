package com.spring.be_booktours.entities.flight_entities;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Passenger {
    @NotBlank(message = "Tên hành khách không được để trống")
    private String passengerName; // Tên hành khách
    private Date dateOfBirth; // Ngày sinh
    private boolean vip; // true: ghế vip, false: ghế thường
}
