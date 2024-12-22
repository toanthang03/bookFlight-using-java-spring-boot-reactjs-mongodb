package com.spring.be_booktours.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.spring.be_booktours.entities.Discount;
import com.spring.be_booktours.services.DiscountService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/admin/discount")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @GetMapping
    public ResponseEntity<?> getAllDiscounts() {
        return ResponseEntity.ok(discountService.getAllDiscounts());
    }

    @PostMapping
    public ResponseEntity<?> createDiscount(@Valid @RequestBody Discount discount) {
        return ResponseEntity.ok(discountService.createDiscount(discount));
    }

    @PutMapping
    public ResponseEntity<?> saveDiscount(@Valid @RequestBody Discount discount) {
        return ResponseEntity.ok(discountService.createDiscount(discount));
    }

    @DeleteMapping("/{discountId}")
    public ResponseEntity<?> deleteDiscount(@PathVariable String discountId) {
        return ResponseEntity.ok(discountService.deleteDiscount(discountId));
    }

    @PostMapping("/apply-to-all-tours")
    public ResponseEntity<?> applyToAllTours(@RequestBody Discount discount) {
        return ResponseEntity.ok(discountService.applyToAllTours(discount));
    }

}
