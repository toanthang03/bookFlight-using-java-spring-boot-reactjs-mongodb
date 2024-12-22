package com.spring.be_booktours.entities;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.spring.be_booktours.entities.sub_entities.BookTour;
import com.spring.be_booktours.entities.sub_entities.Itinerary;
import com.spring.be_booktours.entities.sub_entities.Location;
import com.spring.be_booktours.entities.sub_entities.Review;
import com.spring.be_booktours.entities.sub_entities.TourService;

// import jakarta.validation.constraints.Max;
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
@Document(collection = "tours")
public class Tour {
    @Id
    private String tourId; // Mã tour
    @NotBlank(message = "Vui lòng nhập tên tour")
    private String tourName; // Tên tour
    private String tourType; // Loại tour
    @Min(value = 0, message = "Giá không hợp lệ")
    private double price; // Giá
    // private String meetingPoint; // Điểm hẹn
    private String vehicle; // Phương tiện
    @Min(value = 11, message = "Số người tối đa không hợp lệ")
    private int maxPeople; // Số người tối đa
    private String image; // Hình ảnh(url)
    @Min(value = 0, message = "Giá phòng không hợp lệ")
    private double roomPrice; // Giá phòng
    private Location location; // Vị trí tour
    private String description; // Mô tả
    private boolean isReady; // Sẵn sàng để đặt tour
    private Set<Date> departureDates = new HashSet<>(); // Danh sách ngày khởi hành
    private Set<String> tourImages = new HashSet<>(); // Danh sách hình ảnh(url)
    private Set<Itinerary> itineraries = new HashSet<>(); // Danh sách lịch trình
    private Set<BookTour> bookTours = new HashSet<>(); // Danh sách đặt tour
    private Set<TourService> tourServices = new HashSet<>(); // Danh sách dịch vụ
    private List<Review> reviews = new ArrayList<>(); // Danh sách đánh giá
    private Discount discount; // Giảm giá
}
