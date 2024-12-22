package com.spring.be_booktours.dtos.flight;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CancellationRate {
    private int totalTickets; // Tổng số vé
    private int cancelledTickets; // Số vé bị hủy
    private double cancelRate; // Tỷ lệ hủy
}
