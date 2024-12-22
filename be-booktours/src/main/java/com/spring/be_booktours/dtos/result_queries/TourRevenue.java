package com.spring.be_booktours.dtos.result_queries;

import org.bson.types.ObjectId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourRevenue {
    private ObjectId tourId;
    private String tourName;
    private double totalRevenue;
}
