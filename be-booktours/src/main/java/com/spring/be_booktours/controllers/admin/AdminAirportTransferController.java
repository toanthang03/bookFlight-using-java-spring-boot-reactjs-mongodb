package com.spring.be_booktours.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.entities.AirportTransfer;
import com.spring.be_booktours.entities.sub_entities.Airfield;
import com.spring.be_booktours.services.AirportTransferService;

@RestController
@RequestMapping("/api/v1/admin/airport-transfer")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_AIRPORT_TRANSFER_MANAGER')")
public class AdminAirportTransferController {
    @Autowired
    private AirportTransferService airportTransferService;

    // Thêm dịch vụ đưa đón sân bay mới
    @PostMapping("/create")
    public ResponseEntity<?> createAirportTransfer(@RequestBody Airfield airfield) {
        return ResponseEntity.ok(airportTransferService.createAirportTransfer(airfield));
    }

    // Cập nhật thông tin dịch vụ đưa đón sân bay
    @PutMapping("/update")
    public ResponseEntity<?> updateAirportTransfer(@RequestBody AirportTransfer airportTransfer) {
        return ResponseEntity.ok(airportTransferService.updateAirportTransfer(airportTransfer));
    }

    // Thông kê tổng doanh thu từ dịch vụ đưa đón sân bay trong n ngày gần nhất
    @GetMapping("/revenue")
    public ResponseEntity<?> getRevenue(@RequestParam int days) {
        return ResponseEntity.ok(airportTransferService.getRevenue(days));
    }
}
