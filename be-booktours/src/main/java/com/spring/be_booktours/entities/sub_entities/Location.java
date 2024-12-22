package com.spring.be_booktours.entities.sub_entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    private String locationId;
    private String locationName; // Hà Nội, Sài Gòn, ...
    private String regionName; // Miền Bắc, Miền Trung, Miền Nam, ...
}
