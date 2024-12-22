package com.spring.be_booktours.entities.sub_entities;

import java.util.Date;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    private String name; //Họ tên người đánh giá
    private String email; //Email người đánh giá
    private String content; //Nội dung đánh giá
    @Min(1)
    @Max(5)
    private int rating; //Điểm đánh giá [1-5]
    private Date reviewDate; //Ngày đánh giá
}
