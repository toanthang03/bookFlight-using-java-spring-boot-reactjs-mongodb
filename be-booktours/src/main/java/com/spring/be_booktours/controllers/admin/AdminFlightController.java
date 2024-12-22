package com.spring.be_booktours.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.dtos.flight.DefaultFlight;
import com.spring.be_booktours.entities.Flight;
import com.spring.be_booktours.entities.flight_entities.Schedule;
import com.spring.be_booktours.services.FlightService;

@RestController
@RequestMapping("/api/v1/admin/flight")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_FLIGHT_MANAGER')")
public class AdminFlightController {

    @Autowired
    private FlightService flightService;

    // Thêm chuyến bay(chỉ truyền vào các thông tin cần thiết, các thông tin khác sẽ
    // được tạo tự động)
    @PostMapping("/create-default-flight")
    public ResponseEntity<?> createDefaultFlight(@RequestBody DefaultFlight defaultFlight) {
        return ResponseEntity.ok(flightService.createDefaultFlight(defaultFlight));
    }

    // Thêm lịch bay cho chuyến bay
    @PostMapping("/add-schedule/{flightCode}")
    public ResponseEntity<?> addSchedule(@PathVariable String flightCode, @RequestBody Schedule schedule) {
        return ResponseEntity.ok(flightService.addSchedule(flightCode, schedule));
    }

    // Sửa chuyến bay
    @PutMapping("/update-flight/{flightCode}")
    public ResponseEntity<?> updateFlight(@PathVariable String flightCode, @RequestBody Flight flight) {
        return ResponseEntity.ok(flightService.updateFlight(flightCode, flight));
    }

    // Thống kê v.v..

    // Tính doanh thu theo từng hãng bay
    @GetMapping("/revenue-by-airline")
    public ResponseEntity<?> revenueByAirline() {
        return ResponseEntity.ok(flightService.revenueByAirline());
    }

    // 5 chuyến bay thường xuyên nhất
    @GetMapping("/top-5-most-frequent-flights")
    public ResponseEntity<?> top5MostFrequentFlights() {
        return ResponseEntity.ok(flightService.top5MostFrequentFlights());
    }

    // Thống kê tỉ lệ vé bị hủy
    @GetMapping("/cancellation-rate")
    public ResponseEntity<?> cancellationRate() {
        return ResponseEntity.ok(flightService.cancellationRate());
    }

    // Doanh thu theo n ngày gần nhất
    @GetMapping("/revenue-by-n-days/{n}")
    public ResponseEntity<?> revenueByNDays(@PathVariable int n) {
        return ResponseEntity.ok(flightService.revenueByNDays(n));
    }

    // Đếm các vé đã đặt trong n ngày gần nhất
    @GetMapping("/count-booked-tickets-by-n-days/{n}")
    public ResponseEntity<?> countBookedTicketsByNDays(@PathVariable int n) {
        return ResponseEntity.ok(flightService.countBookedTicketsByNDays(n));
    }

    // Khách hàng đặt vé nhiều nhất trong n ngày gần nhất
    @GetMapping("/most-booking-customer-by-n-days/{n}")
    public ResponseEntity<?> mostBookingCustomerByNDays(@PathVariable int n) {
        return ResponseEntity.ok(flightService.mostBookingCustomerByNDays(n));
    }

}
