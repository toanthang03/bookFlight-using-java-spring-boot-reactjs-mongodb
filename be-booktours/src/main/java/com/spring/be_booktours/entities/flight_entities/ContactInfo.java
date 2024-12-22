package com.spring.be_booktours.entities.flight_entities;

import com.spring.be_booktours.annotations.Phone;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactInfo {
    @NotBlank(message = "Họ tên không được để trống")
    private String fullName; // Họ tên
    private String email; // Email
    @NotBlank(message = "Số điện thoại không được để trống")
    @Phone
    private String phone; // Số điện thoại
}
