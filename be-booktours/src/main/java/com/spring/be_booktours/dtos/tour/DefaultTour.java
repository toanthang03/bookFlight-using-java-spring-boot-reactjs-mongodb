package com.spring.be_booktours.dtos.tour;

import com.spring.be_booktours.entities.sub_entities.Location;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DefaultTour {
    @NotBlank(message = "Vui lòng nhập tên tour")
    private String tourName; // Tên tour
    private Location location; // Điểm đến
}
