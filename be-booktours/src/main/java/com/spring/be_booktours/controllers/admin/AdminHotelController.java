package com.spring.be_booktours.controllers.admin;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.dtos.hotel.DefaultHotel;
import com.spring.be_booktours.entities.Hotel;
import com.spring.be_booktours.entities.hotel_entities.RoomType;
import com.spring.be_booktours.services.HotelService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/admin/hotel")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOTEL_MANAGER')")
public class AdminHotelController {
    @Autowired
    private HotelService hotelService;

    // Thêm mặc định một khách sạn
    @PostMapping("/create-default-hotel")
    public ResponseEntity<?> createDefault(@Valid @RequestBody DefaultHotel defaultHotel) {
        return ResponseEntity.ok(hotelService.createDefaultHotel(defaultHotel));
    }

    // Thêm loại phòng mới
    @PostMapping("/add-room-type/{hotelCode}")
    public ResponseEntity<?> addRoomType(@PathVariable String hotelCode, @Valid @RequestBody RoomType roomType) {
        return ResponseEntity.ok(hotelService.addRoomType(hotelCode, roomType));
    }

    // Cập nhật thông tin khách sạn
    @PutMapping("/update-hotel/{hotelCode}")
    public ResponseEntity<?> updateHotel(@PathVariable String hotelCode, @Valid @RequestBody Hotel hotel) {
        return ResponseEntity.ok(hotelService.updateHotel(hotelCode, hotel));
    }

    // Xem thông tin đặt phòng của 1 khách sạn trong 1 ngày cụ thể
    @GetMapping("/view-booking-room/{hotelCode}")
    public ResponseEntity<?> viewBookingRoom(@PathVariable String hotelCode,
            @RequestParam(required = false, defaultValue = "2024-01-01") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        if (date == null || date.isBefore(LocalDate.now())) {
            date = LocalDate.now();
        }
        return ResponseEntity.ok(hotelService.viewBookingRoom(hotelCode, date));
    }

    // Xác nhận đặt phòng
    @PutMapping("/confirm-booking-room/{hotelCode}/{bookingCode}")
    public ResponseEntity<?> confirmBookingRoom(@PathVariable String hotelCode, @PathVariable String bookingCode) {
        return ResponseEntity.ok(hotelService.confirmBookingRoom(hotelCode, bookingCode));
    }

    // ...
}
