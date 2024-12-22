package com.spring.be_booktours.dtos.result_queries;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueOfAirline {
    private String _id;
    private double totalRevenue;
}
