package com.spring.be_booktours.dtos.flight;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.spring.be_booktours.entities.flight_entities.Schedule;
import com.spring.be_booktours.entities.flight_entities.Ticket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Loại bỏ các trường null khi trả về response
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DetailTicket {
    private Ticket ticket; // Vé
    private Schedule schedule; // Lịch bay
    private String flightName; // Tên chuyến bay
    private String airlineName; // Hãng hàng không
    private String departureAirfield; // Sân bay đi
    private String destinationAirfield; // Sân bay đến
}
