package com.spring.be_booktours.dtos.result_queries;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RevenueOfDay {
    private String revenueDate;
    private double totalRevenue;
}
