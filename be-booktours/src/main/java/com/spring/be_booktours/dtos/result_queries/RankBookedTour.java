package com.spring.be_booktours.dtos.result_queries;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RankBookedTour {
    private String tourName;
    private String tourType;
    private double price;
    private int totalBookedTours;
}
