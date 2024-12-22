package com.spring.be_booktours.controllers;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

import com.spring.be_booktours.dtos.flight.BookTicketDto;
import com.spring.be_booktours.entities.flight_entities.Ticket;
import com.spring.be_booktours.entities.sub_entities.Payment;
import com.spring.be_booktours.helpers.FlightQuery;
import com.spring.be_booktours.services.FlightService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/flight")
public class FlightController {
    @Autowired
    private FlightService flightService;

    // Xem các chuyến bay
    @GetMapping
    public ResponseEntity<?> getFlights(
            @RequestParam(required = false, defaultValue = "") String departure,
            @RequestParam(required = false, defaultValue = "") String destination,
            @RequestParam(required = false, defaultValue = "") String airline,
            @RequestParam(required = false, defaultValue = "2024-01-01") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate departureDate,
            @RequestParam(required = false, defaultValue = "0") double minPrice,
            @RequestParam(required = false, defaultValue = "1000000000") double maxPrice,
            @RequestParam(required = false, defaultValue = "") String cancelable, // Rỗng: tất cả, cancelable: được phép hủy
            @RequestParam(required = false, defaultValue = "") String active, // Rỗng: tất cả, active: đang hoạt động
            @RequestParam(required = false, defaultValue = "price") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortType,
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int limit 
    ) {
        FlightQuery query = new FlightQuery(departure, destination, airline, departureDate, minPrice, maxPrice, cancelable, active, sortBy, sortType, page, limit);
        return ResponseEntity.ok(flightService.getFlights(query));
        // return ResponseEntity.ok(query);
    }

    // Xem chi tiết chuyến bay
    @GetMapping("/{flightCode}")
    public ResponseEntity<?> getFlightDetail(@PathVariable String flightCode) {
        return ResponseEntity.ok(flightService.getFlightDetail(flightCode));
    }

    // Đặt vé
    @PostMapping("/book-ticket/{flightCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> bookTicket(@PathVariable String flightCode, @Valid @RequestBody BookTicketDto bookTicketDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        bookTicketDto.getContactInfo().setEmail(email);
        return ResponseEntity.ok(flightService.bookTicket(flightCode, bookTicketDto));
    }

    // Tính tiền
    @GetMapping("/calculate-price/{flightCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> calculatePrice(@PathVariable String flightCode, @Valid @RequestBody Ticket ticket) {
        return ResponseEntity.ok(flightService.calculatePrice(flightCode, ticket));
    }

    // Xem thông tin đặt vé
    @GetMapping("/ticket-info/{flightCode}/{ticketId}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> getTicketInfo(@PathVariable String flightCode, @PathVariable String ticketId) {
        return ResponseEntity.ok(flightService.getTicketInfo(flightCode, ticketId));
    }

    // Thanh toán
    @PostMapping("/pay-ticket/{flightCode}/{ticketId}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> payTicket(@PathVariable String flightCode, @PathVariable String ticketId, @RequestBody Payment payment) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(flightService.payTicket(email, flightCode, ticketId, payment));
    }

    // Hủy vé
    @PutMapping("/cancel-ticket/{flightCode}/{ticketId}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> cancelTicket(@PathVariable String flightCode, @PathVariable String ticketId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(flightService.cancelTicket(flightCode, ticketId, email));
    }
}
