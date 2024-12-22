package com.spring.be_booktours.entities.sub_entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {
    private int day; // Ngày
    private String title; // Tiêu đề
    private String description; // Mô tả
}
