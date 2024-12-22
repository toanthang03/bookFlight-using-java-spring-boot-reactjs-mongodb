package com.spring.be_booktours.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.dtos.hotel.BookRoomHotelDto;
import com.spring.be_booktours.entities.sub_entities.Payment;
import com.spring.be_booktours.helpers.HotelQuery;
import com.spring.be_booktours.services.HotelService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/hotel")
public class HotelController {
    @Autowired
    private HotelService hotelService;

    // Lấy danh sách khách sạn
    @GetMapping
    public ResponseEntity<?> getHotels(
            @RequestParam(required = false, defaultValue = "") String hotelName,
            @RequestParam(required = false, defaultValue = "") String locationId,
            @RequestParam(required = false, defaultValue = "0") int active,
            @RequestParam(required = false, defaultValue = "0") double minPrice,
            @RequestParam(required = false, defaultValue = "1000000000") double maxPrice,
            @RequestParam(required = false, defaultValue = "hotelName") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortType,
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "5") int limit

    ) {
        HotelQuery hotelQuery = new HotelQuery(hotelName, locationId, minPrice, maxPrice, active, sortBy, sortType,
                page, limit);
        // return ResponseEntity.ok(hotelQuery);
        return ResponseEntity.ok(hotelService.getHotels(hotelQuery));
        // return ResponseEntity.ok(hotelService.getHotels());
    }

    // Lấy thông tin chi tiết của một khách sạn
    @GetMapping("/{hotelCode}")
    public ResponseEntity<?> getHotelDetail(@PathVariable String hotelCode) {
        return ResponseEntity.ok(hotelService.getHotelDetail(hotelCode));
    }

    // Đặt phòng
    @PostMapping("/book-room/{hotelCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> bookRoom(@PathVariable String hotelCode,
            @Valid @RequestBody BookRoomHotelDto defaultHotel) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        defaultHotel.getContactInfo().setEmail(email);
        return ResponseEntity.ok(hotelService.bookRoom(email, hotelCode, defaultHotel));
    }

    // Hủy phòng
    @PutMapping("/cancel-room/{hotelCode}/{bookingCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> cancelRoom(@PathVariable String hotelCode, @PathVariable String bookingCode) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(hotelService.cancelRoom(hotelCode, bookingCode, email));
    }

    // Thanh toán
    @PostMapping("/pay-room/{hotelCode}/{bookingCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> payRoom(@PathVariable String hotelCode, @PathVariable String bookingCode,
            @Valid @RequestBody Payment payment) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(hotelService.payRoom(email, hotelCode, bookingCode, payment));
    }

    // Xem thông tin đặt phòng
    @GetMapping("/booking-detail/{hotelCode}/{bookingCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> getBookingDetail(@PathVariable String hotelCode, @PathVariable String bookingCode) {
        return ResponseEntity.ok(hotelService.getBookingDetail(hotelCode, bookingCode));
    }
}
