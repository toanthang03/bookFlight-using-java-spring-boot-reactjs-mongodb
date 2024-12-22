package com.spring.be_booktours.dtos.result_queries;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaxBookedTourOfMonth {
    private String _id;
    private int totalBookings;
}
