package com.spring.be_booktours.entities.sub_entities;

import java.util.Date;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    private String paymentId; // Mã thanh toán
    private String paymentMethod; // Phương thức thanh toán
    private String paymentStatus; // Trạng thái thanh toán
    @NotBlank(message = "Mã xác nhận không được để trống")
    private String confirmationPaymentCode; // Mã xác nhận
    private Date paymentDate; // Ngày thanh toán
    @Min(value = 0, message = "Số tiền thanh toán phải lớn hơn 0")
    private String paymentAmount; // Số tiền thanh toán
    private String paymentNote; // Ghi chú
}
