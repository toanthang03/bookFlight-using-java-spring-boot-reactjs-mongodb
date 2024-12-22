package com.spring.be_booktours.dtos.account;

import com.spring.be_booktours.annotations.Phone;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChangeProfileRequest {
    @NotBlank(message = "Vui lòng nhập họ và tên của bạn")
    private String name;
    @Phone(message = "Số điện thoại không hợp lệ")
    @NotBlank(message = "Vui lòng nhập số điện thoại của bạn")
    private String phone;
    @NotBlank(message = "Vui lòng nhập địa chỉ của bạn")
    private String address;
}
