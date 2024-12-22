package com.spring.be_booktours.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.entities.sub_entities.BookRide;
import com.spring.be_booktours.entities.sub_entities.Payment;
import com.spring.be_booktours.services.AirportTransferService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/airport-transfer")
public class AirportTransferController {
    @Autowired
    private AirportTransferService airportTransferService;

    // Xem danh sách các dịch vụ đưa đón sân bay
    @GetMapping
    public ResponseEntity<?> findAllAirportTransfer() {
        return ResponseEntity.ok(airportTransferService.findAllAirportTransfer());
    }

    // Xem chi tiết dịch vụ đưa đón sân bay
    @GetMapping("{airportTransferId}")
    public ResponseEntity<?> findByIdAirportTransfer(@PathVariable String airportTransferId,
            @RequestParam(required = false, defaultValue = "0") int isActive,
            @RequestParam(required = false, defaultValue = "0") int countVehicle) {
        return ResponseEntity
                .ok(airportTransferService.findByIdAirportTransfer(airportTransferId, isActive, countVehicle));
    }

    // Tìm theo sân bay
    @GetMapping("/find-by-airport/{airportId}")
    public ResponseEntity<?> findByAirport(@PathVariable String airportId,
            @RequestParam(required = false, defaultValue = "0") int isActive,
            @RequestParam(required = false, defaultValue = "0") int countVehicle) {
        return ResponseEntity.ok(airportTransferService.findByAirport(airportId, isActive, countVehicle));
    }

    // Đặt chuyến đưa đón sân bay
    @PostMapping("/book-ride/{airportTransferId}")
    public ResponseEntity<?> bookRide(@PathVariable String airportTransferId, @Valid @RequestBody BookRide bookRide) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        bookRide.setBookerEmail(email);
        return ResponseEntity.ok(airportTransferService.bookRide(airportTransferId, bookRide));
    }

    // Tra cứu đơn đặt chuyến đưa đón sân bay
    @GetMapping("/find-book-ride/{airportTransferId}/{bookRideId}")
    public ResponseEntity<?> findBookRide(@PathVariable String airportTransferId, @PathVariable String bookRideId) {
        return ResponseEntity.ok(airportTransferService.findBookRide(airportTransferId, bookRideId));
    }

    @PostMapping("/payment-bookride/{airportTransferId}/{bookRideId}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> paymentBookRide(@PathVariable String airportTransferId, @PathVariable String bookRideId,
            @Valid @RequestBody Payment payment) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(airportTransferService.paymentBookRide(email, airportTransferId, bookRideId, payment));
    }
}
