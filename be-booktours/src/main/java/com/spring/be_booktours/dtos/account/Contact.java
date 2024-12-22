package com.spring.be_booktours.dtos.account;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @NotBlank(message = "Vui lòng nhập họ tên")
    private String fullName;
    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Vui lòng nhập email")
    private String email;
    @NotBlank(message = "Vui lòng nhập thông điệp")
    private String message;
}
