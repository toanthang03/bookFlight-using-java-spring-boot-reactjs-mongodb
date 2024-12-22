package com.spring.be_booktours.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.spring.be_booktours.entities.hotel_entities.BookingRoomHotel;
import com.spring.be_booktours.entities.hotel_entities.RoomType;
import com.spring.be_booktours.entities.sub_entities.Location;
// import com.spring.be_booktours.entities.sub_entities.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "hotels")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Hotel {
    @Id
    private String hotelId; // Mã khách sạn
    private String hotelCode; // Code khách sạn
    private String hotelName; // Tên khách sạn(d)
    private int hotelStar; // Số sao khách sạn(sort)
    private Location location; // Địa điểm khách sạn(tỉnh-miền)(q)(d)
    private String hotelAddress; // Địa chỉ khách sạn(d)
    private String hotelPhone; // Số điện thoại khách sạn
    private String hotelEmail; // Email khách sạn
    private String hotelDescription; // Mô tả khách sạn
    private List<String> hotelImage; // Hình ảnh khách sạn
    private List<String> hotelFacilities; // Tiện ích khách sạn
    private List<RoomType> roomTypes = new ArrayList<>(); // Danh sách loại phòng
    private List<BookingRoomHotel> bookingRoomHotels = new ArrayList<>(); // Danh sách đặt phòng
    private boolean active; // true: hoạt động, false: không hoạt động(q)
    // private List<Review> reviews; // Đánh giá
}
