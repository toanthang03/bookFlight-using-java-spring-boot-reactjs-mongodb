package com.spring.be_booktours.entities;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.spring.be_booktours.entities.sub_entities.Airfield;
import com.spring.be_booktours.entities.sub_entities.BookRide;
import com.spring.be_booktours.entities.sub_entities.Vehicle;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "airportTransfers")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AirportTransfer {
    @Id
    private String airportTransferId; // Mã chuyến bay
    private Airfield airfield; // Sân bay rước/đến
    private Set<Vehicle> vehicles = new HashSet<>(); // Các phương tiện hỗ trợ
    private Set<BookRide> bookRides = new HashSet<>(); // Các lượt đặt chuyến
    private boolean active; // true: hoạt động, false: không hoạt động
}
