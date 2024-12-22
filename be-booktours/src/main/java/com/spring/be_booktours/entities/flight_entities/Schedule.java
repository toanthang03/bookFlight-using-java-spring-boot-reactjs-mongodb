package com.spring.be_booktours.entities.flight_entities;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Lịch bay
public class Schedule {
    private String scheduleId; // Mã lịch bay
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate departureDate; // Ngày khởi hành
    @JsonFormat(pattern = "HH:mm")
    private LocalTime departureTime; // Giờ khởi hành
    private int durationHour;
    private int durationMinute;
    private int availableVipSeats; // Số ghế còn trống
    private int availableNormalSeats; // Số ghế còn trống
}
