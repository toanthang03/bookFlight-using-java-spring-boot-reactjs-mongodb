package com.spring.be_booktours.entities.sub_entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Airfield {
    public String airfieldId;
    public String airfieldName;
    public String locationName;
}
