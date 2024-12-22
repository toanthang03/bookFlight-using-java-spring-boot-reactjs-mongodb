package com.spring.be_booktours.entities.views;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "totalBookedOf7Days")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class totalBookedOf7Days {
    private String day;
    private double revenue;
}
