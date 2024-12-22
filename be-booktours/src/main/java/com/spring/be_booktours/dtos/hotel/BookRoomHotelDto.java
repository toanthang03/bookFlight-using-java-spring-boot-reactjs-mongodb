package com.spring.be_booktours.dtos.hotel;

import java.time.LocalDate;

import com.spring.be_booktours.entities.flight_entities.ContactInfo;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookRoomHotelDto {
    private int roomTypeId; // Mã loại phòng
    @Valid
    private ContactInfo contactInfo; // Thông tin liên hệ
    private LocalDate checkInDate; // Ngày nhận phòng
    private int days; // Số ngày thuê
    private int numberOfRooms; // Số lượng phòng
}
