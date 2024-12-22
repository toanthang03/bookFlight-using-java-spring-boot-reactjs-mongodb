package com.spring.be_booktours.entities;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.spring.be_booktours.entities.flight_entities.Airline;
import com.spring.be_booktours.entities.flight_entities.FlightService;
import com.spring.be_booktours.entities.flight_entities.Schedule;
import com.spring.be_booktours.entities.flight_entities.Ticket;
import com.spring.be_booktours.entities.sub_entities.Airfield;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// Loại bỏ các trường null khi trả về response
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "flights")
// (d): Thuộc tính tạo mặc định
// (q): Thuộc tính truy vấn
// (q, r): Thuộc tính bắt buộc trong truy vấn
public class Flight {
    @Id
    private String flightId; // Mã chuyến bay
    private String flightCode; // Mã chuyến bay (phụ)
    private String flightName; // Tên chuyến bay
    private Airline airline; // (d)(q) Hãng hàng không
    private Airfield departure; // (d)(q, r) Sân bay đi
    private Airfield destination; // (d)(q, r) Sân bay đến
    private Set<Schedule> schedules = new HashSet<>(); // (q) Danh sách lịch bay
    private double normalPrice; // (d)(q) Giá vé người lớn
    private double vipPrice; // (d)(q) Giá vé VIP
    private double tax; // Thuế
    private Set<FlightService> flightServices = new HashSet<>(); // Dịch vụ
    private Set<Ticket> tickets = new HashSet<>(); // Vé
    private boolean cancelable; // (q) Được phép hủy? true: được phép, false: không được phép
    private boolean active; // (q) true: hoạt động, false: không hoạt động
}
