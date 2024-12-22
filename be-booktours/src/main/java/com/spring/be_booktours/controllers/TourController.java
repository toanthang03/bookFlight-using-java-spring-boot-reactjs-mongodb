package com.spring.be_booktours.controllers;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.spring.be_booktours.entities.sub_entities.BookTour;
import com.spring.be_booktours.entities.sub_entities.Payment;
import com.spring.be_booktours.entities.sub_entities.Review;
import com.spring.be_booktours.helpers.QueryObject;
import com.spring.be_booktours.services.TourService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/tour")
public class TourController {

    @Autowired
    private TourService tourService;

    @GetMapping
    public ResponseEntity<?> getTours(
            @RequestParam(defaultValue = "", required = false) String location,
            @RequestParam(defaultValue = "", required = false) String region,
            @RequestParam(defaultValue = "0", required = false) double minPrice,
            @RequestParam(defaultValue = "0",required = false) double maxPrice,
            // @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(defaultValue = "", required = false) String vehicle,
            @RequestParam(defaultValue = "", required = false) String tourType,
            @RequestParam(defaultValue = "1", required = false) int page,
            @RequestParam(defaultValue = "5", required = false) int limit,
            @RequestParam(defaultValue = "price", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String sortType
    ) {
        // startDate = startDate == null ? new Date() : startDate;
        QueryObject queryObject = new QueryObject(location, region, minPrice, maxPrice, vehicle, tourType, sortBy, sortType, page, limit);
        // return ResponseEntity.ok(queryObject);
        return ResponseEntity.ok(tourService.getTours(queryObject));
    }

    @GetMapping("{tourId}")
    public ResponseEntity<?> getTourById(@PathVariable String tourId) {
        return ResponseEntity.ok(tourService.getTourById(tourId));
    }

    @PutMapping("/book-tour/{tourId}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> bookTour(@PathVariable String tourId, @Valid @RequestBody BookTour bookTour) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        bookTour.setEmailBooking(email);
        bookTour.setBookingDate(new Date());
        return ResponseEntity.ok(tourService.bookTour(tourId, bookTour));
    }

    @GetMapping("/book-tour")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> getHistoryBookings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(tourService.getHistoryBookings(email));
    }

    @GetMapping("/book-tour/{tourId}/{bookingCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> getBookTour(@PathVariable String tourId, @PathVariable String bookingCode) {
        return ResponseEntity.ok(tourService.getBookTourByBookingCode(tourId, bookingCode));
    }

    @DeleteMapping("/book-tour/{tourId}/{bookingCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> cancelBookTour(@PathVariable String tourId, @PathVariable String bookingCode) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(tourService.cancelBookTour(tourId, bookingCode, email));
    }

    @PostMapping("/review/{tourId}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> reviewTour(@PathVariable String tourId, @Valid @RequestBody Review review) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        review.setEmail(email);
        review.setReviewDate(new Date());
        return ResponseEntity.ok(tourService.reviewTour(tourId, review));
    }

    @PostMapping("/payment/{tourId}/{bookingCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<?> paymentTour(@PathVariable String tourId, @PathVariable String bookingCode,@Valid @RequestBody Payment payment) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(tourService.paymentTour(email, tourId, bookingCode, payment));
    }
}
