package com.spring.be_booktours.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.be_booktours.dtos.MyResponse;
import com.spring.be_booktours.dtos.airport_transfer.RevenueAirportTransfer;
import com.spring.be_booktours.entities.AirportTransfer;
import com.spring.be_booktours.entities.AppUser;
import com.spring.be_booktours.entities.sub_entities.Airfield;
import com.spring.be_booktours.entities.sub_entities.BookRide;
import com.spring.be_booktours.entities.sub_entities.BookRideHistory;
import com.spring.be_booktours.entities.sub_entities.Payment;
import com.spring.be_booktours.entities.sub_entities.Vehicle;
import com.spring.be_booktours.repositories.AirportTransferRepository;
import com.spring.be_booktours.repositories.AppUserRepository;
import com.spring.be_booktours.utils.AirportTransferUtils;
import com.spring.be_booktours.utils.TourUtils;

@Service
@Transactional
public class AirportTransferService {
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private AirportTransferRepository airportTransferRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    // Thêm dịch vụ đưa đón sân bay mới
    public MyResponse<AirportTransfer> createAirportTransfer(Airfield airfield) {
        MyResponse<AirportTransfer> response = new MyResponse<>();
        // Kiểm tra sân bay đã tồn tại trong hệ thống chưa
        List<AirportTransfer> airportTransfers = airportTransferRepository
                .findByAirfieldAirfieldId(airfield.getAirfieldId());
        if (airportTransfers.size() > 0) {
            response.setStatus(400);
            response.setMessage("Sân bay đã tồn tại trong hệ thống");
            return response;
        }
        AirportTransfer airportTransfer = new AirportTransfer();
        airportTransfer.setAirfield(airfield);
        airportTransfer.setActive(false);
        airportTransfer = airportTransferRepository.save(airportTransfer);
        response.setStatus(200);
        response.setMessage("Thêm dịch vụ đưa đón sân bay thành công");
        response.setData(airportTransfer);
        return response;
    }

    public MyResponse<?> updateAirportTransfer(AirportTransfer airportTransfer) {
        MyResponse<?> response = new MyResponse<>();
        AirportTransfer airportTransferInDB = airportTransferRepository
                .findById(airportTransfer.getAirportTransferId()).orElse(null);
        if (airportTransferInDB == null) {
            response.setStatus(400);
            response.setMessage("Dịch vụ đưa đón sân bay không tồn tại trong hệ thống");
            return response;
        }
        airportTransferInDB.setAirfield(airportTransfer.getAirfield());
        airportTransferInDB.setVehicles(airportTransfer.getVehicles());
        airportTransferInDB.setBookRides(airportTransfer.getBookRides());
        airportTransferInDB.setActive(airportTransfer.isActive());
        airportTransferRepository.save(airportTransferInDB);

        response.setStatus(200);
        response.setMessage("Cập nhật dịch vụ đưa đón sân bay thành công");
        return response;
    }

    public MyResponse<RevenueAirportTransfer> getRevenue(int days) {
        MyResponse<RevenueAirportTransfer> response = new MyResponse<>();
        // Tính tổng doanh thu từ dịch vụ đưa đón sân bay trong n ngày gần nhất
        // n ngày trước tính từ hiện tại
        LocalDate numberDaysAgo = LocalDate.now().minusDays(days);
        Date numberDaysAgoDate = Date.from(numberDaysAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("bookRides"),
                Aggregation.match(Criteria.where("bookRides.bookingDate").gte(numberDaysAgoDate)),
                Aggregation.group("bookRides.bookingDate").sum("bookRides.totalCost").as("revenue"),
                Aggregation.project("revenue"));
        AggregationResults<RevenueAirportTransfer> results = mongoTemplate.aggregate(aggregation, "airportTransfers",
                RevenueAirportTransfer.class);
        RevenueAirportTransfer revenue = results.getUniqueMappedResult();
        response.setStatus(200);
        response.setMessage("Tính tổng doanh thu từ dịch vụ đưa đón sân bay thành công");
        response.setData(revenue);
        return response;
    }

    public MyResponse<List<AirportTransfer>> findAllAirportTransfer() {
        MyResponse<List<AirportTransfer>> response = new MyResponse<>();
        List<AirportTransfer> airportTransfers = airportTransferRepository.findAll();
        response.setStatus(200);
        response.setMessage("Lấy danh sách dịch vụ đưa đón sân bay thành công");
        response.setData(airportTransfers);
        return response;
    }

    public MyResponse<AirportTransfer> findByIdAirportTransfer(String airportTransferId, int isActive,
            int countVehicle) {
        MyResponse<AirportTransfer> response = new MyResponse<>();
        // Tìm dịch vụ đưa đón sân bay theo id, tình trạng hoạt động và số lượng phương
        // tiện
        AirportTransfer airportTransfer = airportTransferRepository.findById(airportTransferId).orElse(null);
        if (airportTransfer == null) {
            response.setStatus(400);
            response.setMessage("Dịch vụ đưa đón sân bay không tồn tại trong hệ thống");
            return response;
        }

        // Nếu isActive = 1 thì kiểm tra dịch vụ đưa đón sân bay có hoạt động không còn
        // nếu isActive = 0 thì không cần kiểm tra
        if (isActive == 1) {
            if (airportTransfer.isActive() == false) {
                response.setStatus(400);
                response.setMessage("Dịch vụ đưa đón sân bay không hoạt động");
                return response;
            }
        }

        // Nếu countVehicle = 1 thì kiểm tra số lượng phương tiện có lớn hơn 0 không
        if (countVehicle == 1) {
            // Kiểm tra số lượng phương tiện có lớn hơn 0 không
            if (airportTransfer.getVehicles().size() < 1) {
                response.setStatus(400);
                response.setMessage("Dịch vụ đưa đón sân bay không có phương tiện nào");
                return response;
            }
        }
        response.setStatus(200);
        response.setMessage("Lấy thông tin dịch vụ đưa đón sân bay thành công");
        response.setData(airportTransfer);
        return response;
    }

    public MyResponse<BookRide> bookRide(String airportTransferId, BookRide bookRide) {
        MyResponse<BookRide> response = new MyResponse<>();
        AirportTransfer airportTransfer = airportTransferRepository.findById(airportTransferId).orElse(null);
        if (airportTransfer == null) {
            response.setStatus(400);
            response.setMessage("Dịch vụ đưa đón sân bay không tồn tại trong hệ thống");
            return response;
        }
        // Kiểm tra ngày trước
        if (bookRide.getPickUpDate().isBefore(LocalDate.now())) {
            response.setStatus(400);
            response.setMessage("Ngày rước không hợp lệ");
            return response;
        }
        // Nếu ngày rước là ngày hiện tại thì giờ rước phải lớn hơn giờ hiện tại
        if (bookRide.getPickUpDate().isEqual(LocalDate.now())) {
            if (bookRide.getPickUpTime().isBefore(LocalTime.now())) {
                response.setStatus(400);
                response.setMessage("Giờ rước không hợp lệ");
                return response;
            }
        }
        // Tính tiền
        // Tìm phương tiện được hỗ trợ trong dịch vụ đưa đón sân bay
        double totalCost = 0;
        for (Vehicle vehicle : airportTransfer.getVehicles()) {
            if (vehicle.getVehicleId().equals(bookRide.getVehicleId())) {
                totalCost = vehicle.getVehiclePrice() * bookRide.getQuantityVehicle();
                break;
            }
        }
        if (totalCost == 0) {
            response.setStatus(400);
            response.setMessage("Phương tiện không tồn tại trong dịch vụ đưa đón sân bay");
            return response;
        }
        bookRide.setTotalCost(totalCost);
        // Tạo mã lượt đặt
        bookRide.setBookRideId(AirportTransferUtils.generateAirportTransferId());
        bookRide.setBookingDate(new Date());
        airportTransfer.getBookRides().add(bookRide);
        airportTransferRepository.save(airportTransfer);
        // Lưu lịch sử đặt chuyến đưa đón sân bay
        BookRideHistory bookRideHistory = new BookRideHistory();
        bookRideHistory.setBookRideId(bookRide.getBookRideId());
        bookRideHistory.setBookingDate(bookRide.getBookingDate());
        bookRideHistory.setAirportTransferId(airportTransferId);
        AppUser appUser = appUserRepository.findByEmail(bookRide.getBookerEmail()).orElse(null);
        if (appUser != null) {
            appUser.getBookRideHistories().add(bookRideHistory);
            appUserRepository.save(appUser);
        }
        response.setStatus(200);
        response.setMessage("Đặt chuyến đưa đón sân bay thành công");
        response.setData(bookRide);
        return response;
    }

    public MyResponse<BookRide> findBookRide(String airportTransferId, String bookRideId) {
        MyResponse<BookRide> response = new MyResponse<>();
        AirportTransfer airportTransfer = airportTransferRepository.findById(airportTransferId).orElse(null);
        if (airportTransfer == null) {
            response.setStatus(400);
            response.setMessage("Dịch vụ đưa đón sân bay không tồn tại trong hệ thống");
            return response;
        }
        BookRide bookRide = airportTransfer.getBookRides().stream().filter(b -> b.getBookRideId().equals(bookRideId))
                .findFirst().orElse(null);
        if (bookRide == null) {
            response.setStatus(400);
            response.setMessage("Lượt đặt chuyến đưa đón sân bay không tồn tại trong hệ thống");
            return response;
        }
        response.setStatus(200);
        response.setMessage("Lấy thông tin lượt đặt chuyến đưa đón sân bay thành công");
        response.setData(bookRide);
        return response;
    }

    public MyResponse<AirportTransfer> findByAirport(String airportId, int isActive, int countVehicle) {
        MyResponse<AirportTransfer> response = new MyResponse<>();
        List<AirportTransfer> airportTransfers = airportTransferRepository.findByAirfieldAirfieldId(airportId);
        if (airportTransfers.size() < 1) {
            response.setStatus(400);
            response.setMessage("Dịch vụ đưa đón sân bay không tồn tại trong hệ thống");
            return response;
        }

        AirportTransfer airportTransfer = airportTransfers.get(0);

        // Nếu isActive = 1 thì kiểm tra dịch vụ đưa đón sân bay có hoạt động không còn
        // nếu isActive = 0 thì không cần kiểm tra
        if (isActive == 1) {
            if (airportTransfer.isActive() == false) {
                response.setStatus(400);
                response.setMessage("Dịch vụ đưa đón sân bay không hoạt động");
                return response;
            }
        }

        // Nếu countVehicle = 1 thì kiểm tra số lượng phương tiện có lớn hơn 0 không
        if (countVehicle == 1) {
            // Kiểm tra số lượng phương tiện có lớn hơn 0 không
            if (airportTransfer.getVehicles().size() < 1) {
                response.setStatus(400);
                response.setMessage("Dịch vụ đưa đón sân bay không có phương tiện nào");
                return response;
            }
        }

        response.setStatus(200);
        response.setMessage("Lấy thông tin dịch vụ đưa đón sân bay thành công");
        response.setData(airportTransfer);
        return response;
    }

    public MyResponse<?> paymentBookRide(String email, String airportTransferId, String bookRideId, Payment payment) {
        MyResponse<?> response = new MyResponse<>();

        // Kiểm tra airport transfer tồn tại
        AirportTransfer airportTransfer = airportTransferRepository.findById(airportTransferId).orElse(null);
        if (airportTransfer == null) {
            response.setStatus(400);
            response.setMessage("Dịch vụ đưa đón sân bay không tồn tại trong hệ thống");
            return response;
        }

        // Kiểm tra book ride tồn tại
        BookRide bookRide = airportTransfer.getBookRides().stream().filter(b -> b.getBookRideId().equals(bookRideId))
                .findFirst().orElse(null);
        if (bookRide == null) {
            response.setStatus(400);
            response.setMessage("Lượt đặt chuyến đưa đón sân bay không tồn tại trong hệ thống");
            return response;
        }

        payment.setPaymentId(TourUtils.generatePaymentId(email));
        payment.setPaymentDate(new Date());

        bookRide.setPayment(payment);
        airportTransferRepository.save(airportTransfer);

        response.setStatus(200);
        response.setMessage("Thanh toán chuyến đưa đón sân bay thành công");
        return response;
    }
}
