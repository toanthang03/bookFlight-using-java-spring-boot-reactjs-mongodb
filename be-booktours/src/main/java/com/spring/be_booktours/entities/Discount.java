package com.spring.be_booktours.entities;

import java.util.Date;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Loại bỏ các trường null khi trả về response
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "discounts")
public class Discount {
    @Id
    private String discountId; // Mã giảm giá
    @NotBlank(message = "Vui lòng nhập tên giảm giá")
    private String discountName; // Tên giảm giá
    @Min(value = 1, message = "Giá trị giảm giá không hợp lệ")
    @Max(value = 100, message = "Giá trị giảm giá không hợp lệ")
    private int percentDiscount; // Giá trị giảm giá
    private String discountType; // Loại giảm giá (ngày lễ(phải đặt trước lễ n ngày kể từ startDate), ngày khởi hành, số lượng người)
    private String description; // Mô tả

    private Date startDate; // Ngày bắt đầu(dành cho loại giảm giá global)
    @Min(value = 1, message = "Thời gian áp dụng không hợp lệ")
    private int duration; // Thời gian áp dụng(dành cho loại giảm giá global)
    @NotBlank(message = "Vui lòng nhập hình ảnh")
    private String poster; // Hình ảnh(url)(dành cho loại giảm giá global)

    @Min(value = 4, message = "Số người tối thiểu không hợp lệ")
    private int minPeople; // Số người tối thiểu(dành cho loại giảm giá people)

    private Set<Date> departureDates; // Ngày khởi hành(dành cho loại giảm giá departure)

    // Note: 1 tour có nhiều nhất 1 giảm giá cho cho lễ và 1 giảm giá cho các loại còn lại
}
