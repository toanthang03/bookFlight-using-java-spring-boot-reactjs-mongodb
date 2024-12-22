package com.spring.be_booktours.entities.sub_entities;

import com.spring.be_booktours.annotations.Phone;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booker {
    @NotBlank(message = "Họ tên không được để trống")
    private String fullName; // Họ tên
    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email không được để trống")
    private String email; // Email
    @NotBlank(message = "Số điện thoại không được để trống")
    @Phone(message = "Số điện thoại không hợp lệ")
    private String phone; // Số điện thoại
    @NotBlank(message = "Địa chỉ không được để trống")
    private String address; // Địa chỉ
    private String note; // Ghi chú
}
