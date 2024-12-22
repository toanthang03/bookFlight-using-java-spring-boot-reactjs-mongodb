package com.spring.be_booktours.dtos.flight;

import java.util.List;
import java.util.Set;

import com.spring.be_booktours.entities.flight_entities.ContactInfo;
import com.spring.be_booktours.entities.flight_entities.Passenger;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookTicketDto {
    private String scheduleId;
    private List<Passenger> passengers; // Hành khách
    private Set<String> flightServiceIds; // Dịch vụ đã chọn
    @Valid
    private ContactInfo contactInfo; // Thông tin liên hệ
}
