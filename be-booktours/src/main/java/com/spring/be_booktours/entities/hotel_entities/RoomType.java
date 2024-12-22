package com.spring.be_booktours.entities.hotel_entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomType {
    private int roomTypeId; // Mã loại phòng
    @NotBlank(message = "Tên loại phòng không được để trống")
    private String roomTypeName; // Tên loại phòng
    private int roomCapacity; // Sức chứa
    private int roomArea; // Diện tích(m2)
    private double roomPrice; // Giá phòng
    private List<String> roomImage = new ArrayList<>(); // Hình ảnh phòng
    private List<String> roomFacilities = new ArrayList<>(); // Tiện ích phòng
    private List<String> roomDetails = new ArrayList<>(); // Các chi tiết về loại phòng
    private int numberOfRooms; // Số lượng phòng
}
