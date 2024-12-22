package com.spring.be_booktours.services;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.logging.Logger;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.spring.be_booktours.dtos.MyResponse;
import com.spring.be_booktours.dtos.result_queries.MaxBookedTourOfMonth;
import com.spring.be_booktours.dtos.result_queries.RankBookedTour;
import com.spring.be_booktours.dtos.result_queries.RevenueOfDay;
import com.spring.be_booktours.dtos.result_queries.ReviewTour;
import com.spring.be_booktours.dtos.result_queries.TotalBookingOfRegion;
import com.spring.be_booktours.dtos.result_queries.TourRevenue;
import com.spring.be_booktours.dtos.tour.DefaultTour;
import com.spring.be_booktours.entities.AppUser;
import com.spring.be_booktours.entities.Discount;
import com.spring.be_booktours.entities.Tour;
import com.spring.be_booktours.entities.sub_entities.BookTour;
import com.spring.be_booktours.entities.sub_entities.BookingHistory;
import com.spring.be_booktours.entities.sub_entities.Itinerary;
import com.spring.be_booktours.entities.sub_entities.Payment;
import com.spring.be_booktours.entities.sub_entities.Review;
import com.spring.be_booktours.entities.views.totalBookedOf7Days;
import com.spring.be_booktours.helpers.QueryObject;
import com.spring.be_booktours.repositories.AppUserRepository;
import com.spring.be_booktours.repositories.DiscountRepository;
import com.spring.be_booktours.repositories.totalBookedOf7DaysRepository;
import com.spring.be_booktours.repositories.TourRepository;
import com.spring.be_booktours.utils.TourUtils;

@Service
@Transactional
public class TourService {

    @Autowired
    private totalBookedOf7DaysRepository totalBookedOf7DaysRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private TourRepository tourRepository;
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private DiscountRepository discountRepository;
    Logger logger = Logger.getLogger(TourService.class.getName());

    // Customer method

    public MyResponse<List<Tour>> getTours(QueryObject queryObject) {
        MyResponse<List<Tour>> response = new MyResponse<>();
        List<Tour> tours = new ArrayList<>();
        Query query = new Query();

        if (queryObject.getRegion().length() > 0) {
            query.addCriteria(Criteria.where("location.regionName").regex(".*" + queryObject.getRegion() + ".*"));
        }
        if (queryObject.getLocation().length() > 0) {
            query.addCriteria(
                    Criteria.where("location.locationName").regex(".*" + queryObject.getLocation() + ".*"));
        }

        if (queryObject.getMinPrice() >= 0 && queryObject.getMaxPrice() > queryObject.getMinPrice()) {
            query.addCriteria(Criteria.where("price").gte(queryObject.getMinPrice()).lt(queryObject.getMaxPrice()));
        }
        // if (queryObject.getStartDate() != null) {
        // query.addCriteria(Criteria.where("departureDates").is(queryObject.getStartDate()));
        // }
        if (queryObject.getVehicle().length() > 0) {
            query.addCriteria(Criteria.where("vehicle").regex(".*" + queryObject.getVehicle() + ".*"));
        }
        if (queryObject.getTourType().length() > 0) {
            query.addCriteria(Criteria.where("tourType").regex(".*" + queryObject.getTourType() + ".*"));
        }

        // Sắp xếp
        if (queryObject.getSortBy().length() < 1) {
            queryObject.setSortBy("price");
        } else {
            queryObject.setSortBy(queryObject.getSortBy());
        }

        if (queryObject.getSortType().equalsIgnoreCase("asc")) {
            query.with(org.springframework.data.domain.Sort
                    .by(org.springframework.data.domain.Sort.Order.asc(queryObject.getSortBy())));
        } else {
            query.with(org.springframework.data.domain.Sort
                    .by(org.springframework.data.domain.Sort.Order.desc(queryObject.getSortBy())));
        }

        // query.addCriteria(Criteria.where("isReady").is(true));
        // Skip và Limit để thực hiện phân trang
        query.skip((long) (queryObject.getPage() - 1) * queryObject.getLimit()); // Bỏ qua một số lượng bản ghi
        query.limit(queryObject.getLimit()); // Giới hạn số bản ghi trả về

        logger.info("Query: " + queryObject.toString());
        tours = mongoTemplate.find(query, Tour.class);
        if (tours.size() == 0) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy tour phù hợp với yêu cầu của bạn");
        } else {
            response.setStatus(200);
            response.setMessage("Lấy danh sách tour thành công");
            logger.info("Lấy danh sách tour thành công, số lượng tour: " + tours.size());
            response.setData(tours);
        }
        return response;
    }

    public MyResponse<Tour> getTourById(String tourId) {
        MyResponse<Tour> response = new MyResponse<>();
        Tour tour = tourRepository.findById(tourId).orElse(null);
        if (tour == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy tour");
        } else {
            response.setStatus(200);
            response.setMessage("Lấy thông tin tour thành công");
            response.setData(tour);
        }
        return response;
    }

    public MyResponse<String> bookTour(String tourId, BookTour bookTour) {
        MyResponse<String> response = new MyResponse<>();

        Tour tour = tourRepository.findById(tourId).orElse(null);
        if (tour == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy tour");
        } else {
            // Kiểm tra ngày có tồn tại trong danh sách ngày khởi hành của tour
            // không
            if (!tour.getDepartureDates().contains(bookTour.getDepartureDate())) {
                response.setStatus(400);
                response.setMessage("Ngày khởi hành không tồn tại trong danh sách ngày khởi hành của tour");
                return response;
            }
            // Kiểm tra ngày đã hết hạn đăng ký chưa
            if (bookTour.getDepartureDate().before(new Date())) {
                response.setStatus(400);
                response.setMessage("Tour đã hết hạn đăng ký");
                return response;
            }
            bookTour.setBookingCode(UUID.randomUUID().toString());

            // Tính tổng giá
            double totalPrice = 0;

            // Tính giá theo độ tuổi của hành khách
            totalPrice += bookTour.getAdultNumber() * tour.getPrice()
                    + bookTour.getChildrenNumber() * tour.getPrice() * 0.5
                    + bookTour.getYoungChildrenNumber() * tour.getPrice() * 0.2
                    + bookTour.getBabyNumber() * tour.getPrice() * 0.1;

            // Tính giá theo các dịch vụ khác
            if (bookTour.getTourServices() == null) {
                bookTour.setTourServices(Set.of());
            }

            for (com.spring.be_booktours.entities.sub_entities.TourService item : bookTour.getTourServices()) {
                totalPrice += item.getPrice();
            }

            // Tính giá theo các dịch vụ giảm giá của trang web

            // Giảm giá cho lần đặt tour đầu tiên
            double totalDiscount = 0;
            AppUser user = appUserRepository.findByEmail(bookTour.getEmailBooking()).orElse(null);
            if (user != null) {
                if (user.getBookingHistories().size() == 0) {
                    totalDiscount += 10;
                }
            } else {
                // Tài khoản không tồn tại
                response.setStatus(404);
                response.setMessage("Tài khoản không tồn tại");
                return response;
            }

            // Các dịch vụ giảm giá khác
            // Giảm giá theo lễ
            List<Discount> discounts = discountRepository.findByDiscountType("holiday");
            if (discounts.size() > 0) {
                for (Discount discount : discounts) {
                    totalDiscount += TourUtils.calculateDiscount(tour, bookTour, discount);
                }
            }

            // Các loại giảm giá khác
            if (tour.getDiscount() != null) {
                totalDiscount += TourUtils.calculateDiscount(tour, bookTour, tour.getDiscount());
            }

            // Tổng giảm giá tối đa là 25%
            if (totalDiscount / 100 > 0.25) {
                totalDiscount = 0.25;
            } else {
                totalDiscount = totalDiscount / 100;
            }

            bookTour.setTotalPrice(totalPrice * (1 - totalDiscount));
            tour.getBookTours().add(bookTour);
            tourRepository.save(tour);

            // Lưu thông tin đặt tour vào user
            BookingHistory bookingHistory = new BookingHistory(bookTour.getBookingCode(), tourId,
                    bookTour.getBookingDate());

            user.getBookingHistories().add(bookingHistory);
            appUserRepository.save(user);

            response.setStatus(200);
            response.setMessage("Đăng ký tour thành công");
            response.setData(bookTour.getBookingCode());
        }

        return response;
    }

    public MyResponse<BookTour> getBookTourByBookingCode(String tourId, String bookingCode) {
        MyResponse<BookTour> response = new MyResponse<>();
        Tour tour = tourRepository.findById(tourId).orElse(null);
        if (tour == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy tour");
        } else {
            BookTour bookTour = tour.getBookTours().stream().filter(item -> item.getBookingCode().equals(bookingCode))
                    .findFirst().orElse(null);
            if (bookTour == null) {
                response.setStatus(404);
                response.setMessage("Không tìm thấy thông tin đặt tour");
            } else {
                response.setStatus(200);
                response.setMessage("Lấy thông tin đặt tour thành công");
                response.setData(bookTour);
            }
        }
        return response;
    }

    public MyResponse<?> cancelBookTour(String tourId, String bookingCode, String email) {
        MyResponse<?> response = new MyResponse<>();
        Tour tour = tourRepository.findById(tourId).orElse(null);
        if (tour == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy tour");
        } else {
            BookTour bookTour = tour.getBookTours().stream().filter(item -> item.getBookingCode().equals(bookingCode))
                    .findFirst().orElse(null);
            if (bookTour == null) {
                response.setStatus(404);
                response.setMessage("Không tìm thấy thông tin đặt tour");
            } else {
                // Kiểm tra xem người dùng có quyền hủy tour không
                if (!bookTour.getEmailBooking().equals(email)) {
                    response.setStatus(400);
                    response.setMessage("Bạn không có quyền hủy tour này");
                    return response;
                }
                // Nếu tour đã qua ngày khởi hành thì không cho hủy
                if (bookTour.getDepartureDate().before(new Date())) {
                    response.setStatus(400);
                    response.setMessage("Tour đã qua ngày khởi hành, không thể hủy");
                    return response;
                }
                // Nếu tour đã xác nhận thì không cho hủy
                if (bookTour.isConfirmed()) {
                    response.setStatus(400);
                    response.setMessage("Tour đã được xác nhận, vui lòng liên hệ với quản trị viên để hủy");
                    return response;
                }
                // Tính số tiền hoàn lại
                double cashback = bookTour.getTotalPrice()
                        * TourUtils.cashbackPercentage(tour.getDepartureDates().iterator().next()) / 100;

                // Xóa thông tin đặt tour // Bảo trì
                // tour.getBookTours().remove(bookTour);
                // tourRepository.save(tour);

                // Xóa thông tin đặt tour trong user // Bảo trì
                // appUserRepository.findByEmail(bookTour.getEmailBooking()).ifPresent(user -> {
                // user.getBookingHistories().removeIf(item ->
                // item.getBookingCode().equals(bookingCode));
                // appUserRepository.save(user);
                // });

                response.setStatus(200);
                response.setMessage("Hủy tour thành công, phần trăm hoàn lại: "
                        + TourUtils.cashbackPercentage(tour.getDepartureDates().iterator().next())
                        + "%, số tiền hoàn lại: " + cashback);
            }
        }
        return response;
    }
    // Manager or Admin method

    @SuppressWarnings("deprecation")
    public MyResponse<String> createDefaultTour(DefaultTour defaultTour) {
        MyResponse<String> response = new MyResponse<>();
        Tour tour = new Tour();

        tour.setTourName(defaultTour.getTourName());
        tour.setLocation(defaultTour.getLocation());
        tour.setVehicle("Phương tiện");
        tour.setMaxPeople(10);
        tour.setImage("https://media.travel.com.vn/Tour/tfd_240925041939_234049_Ganh%20Da%20Dia%20(1).jpg");
        tour.setTourType("Tiêu chuẩn");
        tour.setPrice(500000);
        tour.setRoomPrice(100000);
        tour.setMaxPeople(20);
        tour.setDescription("Mô tả");

        Date departureDate = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);
        departureDate.setHours(0);
        departureDate.setMinutes(0);
        departureDate.setSeconds(0);
        tour.setDepartureDates(Set.of(departureDate)); // 10 ngày sau kể từ
                                                       // ngày hiện tại
        tour.setItineraries(Set.of(new Itinerary(1, "Tiêu đề cho lộ trình 1", "Mô tả cho lộ trình 1")));
        tour.setTourImages(
                Set.of("https://media.travel.com.vn/Tour/tfd_240925041939_234049_Ganh%20Da%20Dia%20(1).jpg"));
        tour.setTourServices(Set.of());
        tour.setReady(false);

        Tour createdTour = tourRepository.save(tour);
        if (createdTour.getTourId().length() < 0) {
            response.setStatus(500);
            response.setMessage("Tạo tour thất bại");
        } else {
            response.setStatus(200);
            response.setMessage("Tạo tour thành công, mã tour: " + createdTour.getTourId());
            response.setData(createdTour.getTourId());
        }
        return response;
    }

    public MyResponse<?> updateTour(String tourId, Tour updatedTour) {
        MyResponse<?> response = new MyResponse<>();
        Class<?> clazz = updatedTour.getClass();
        // Lấy tất cả các trường của lớp
        Field[] fields = clazz.getDeclaredFields();
        // Lặp qua các trường và in ra tên trường cùng giá trị
        for (Field field : fields) {
            // Cho phép truy cập vào các trường private
            field.setAccessible(true);

            // In ra tên trường và giá trị của nó
            System.out.println(field.getName());
        }
        Tour tour = tourRepository.findById(tourId).orElse(null);
        if (tour == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy tour");
        } else {
            tour.setTourName(updatedTour.getTourName());
            tour.setVehicle(updatedTour.getVehicle());
            tour.setMaxPeople(updatedTour.getMaxPeople());
            tour.setImage(updatedTour.getImage());
            tour.setTourType(updatedTour.getTourType());
            tour.setPrice(updatedTour.getPrice());
            tour.setRoomPrice(updatedTour.getRoomPrice());
            tour.setMaxPeople(updatedTour.getMaxPeople());
            tour.setDescription(updatedTour.getDescription());
            tour.setDepartureDates(updatedTour.getDepartureDates());
            tour.setItineraries(updatedTour.getItineraries());
            tour.setTourImages(updatedTour.getTourImages());
            tour.setTourServices(updatedTour.getTourServices());
            tour.setReady(updatedTour.isReady());
            tour.setDiscount(updatedTour.getDiscount());

            tourRepository.save(tour);
            response.setStatus(200);
            response.setMessage("Cập nhật tour thành công");
        }

        return response;
    }

    public MyResponse<Set<BookingHistory>> getHistoryBookings(String email) {
        MyResponse<Set<BookingHistory>> response = new MyResponse<>();
        appUserRepository.findByEmail(email).ifPresent(user -> {
            response.setStatus(200);
            response.setMessage("Lấy lịch sử đặt tour thành công");
            response.setData(user.getBookingHistories());
        });
        return response;
    }

    public MyResponse<?> confirmTour(String tourId, String bookingCode) {
        MyResponse<?> response = new MyResponse<>();
        Tour tour = tourRepository.findById(tourId).orElse(null);
        if (tour == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy tour");
        } else {
            BookTour bookTour = tour.getBookTours().stream().filter(item -> item.getBookingCode().equals(bookingCode))
                    .findFirst().orElse(null);
            if (bookTour == null) {
                response.setStatus(404);
                response.setMessage("Không tìm thấy thông tin đặt tour");
            } else {
                bookTour.setConfirmed(true);
                tourRepository.save(tour);
                response.setStatus(200);
                response.setMessage("Xác nhận tour thành công");
            }
        }
        return response;
    }

    public MyResponse<Review> reviewTour(String tourId, Review review) {
        MyResponse<Review> response = new MyResponse<>();
        Tour tour = tourRepository.findById(tourId).orElse(null);
        if (tour == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy tour");
        } else {
            AppUser user = appUserRepository.findByEmail(review.getEmail()).orElse(null);
            if (user == null) {
                response.setStatus(404);
                response.setMessage("Không tìm thấy người dùng");
                return response;
            } else {
                review.setName(user.getName());
            }

            // Kiểm tra xem người dùng đã đánh giá tour chưa
            for (Review item : tour.getReviews()) {
                if (item.getEmail().equals(review.getEmail())) {
                    response.setStatus(400);
                    response.setMessage("Bạn đã đánh giá tour này rồi");
                    return response;
                }
            }

            tour.getReviews().add(review);
            tourRepository.save(tour);
            response.setStatus(200);
            response.setMessage("Đánh giá tour thành công");
            response.setData(review);
        }
        return response;
    }

    public MyResponse<List<TourRevenue>> getTopRevenueTours() {
        MyResponse<List<TourRevenue>> response = new MyResponse<>();
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("bookTours"),
                // : {
                // _id: { tourId: "", tourName: "" },
                // totalRevenue: { : ".totalPrice" }
                // }
                Aggregation.group("tourId", "tourName").sum("bookTours.totalPrice").as("totalRevenue"),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "totalRevenue")),
                Aggregation.limit(3),
                Aggregation.project("tourId", "tourName", "totalRevenue"));

        AggregationResults<TourRevenue> results = mongoTemplate.aggregate(aggregation, "tours", TourRevenue.class);
        List<TourRevenue> tourRevenues = results.getMappedResults();
        if (tourRevenues.size() == 0) {
            response.setStatus(404);
            response.setMessage("Không lấy được danh sách");
        } else {
            response.setStatus(200);
            response.setMessage("Lấy danh sách tour có doanh thu cao nhất thành công");
            response.setData(tourRevenues);
        }
        return response;
    }

    public MyResponse<Double> getTotalRevenue(int days) {
        MyResponse<Double> response = new MyResponse<>();
        LocalDate numberDaysAgo = LocalDate.now().minusDays(days);
        Date numberDaysAgoDate = Date.from(numberDaysAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("bookTours"),
                Aggregation.match(Criteria.where("bookTours.bookingDate").gte(numberDaysAgoDate)),

                Aggregation.group().sum("bookTours.totalPrice").as("totalRevenue"));

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "tours", Document.class);
        Document result = results.getUniqueMappedResult();
        if (result == null) {
            response.setStatus(404);
            response.setMessage("Không lấy được doanh thu");
        } else {
            double totalRevenue = result.getDouble("totalRevenue");
            response.setStatus(200);
            response.setMessage("Doanh thu trong " + days + " ngày gần nhất là: " + totalRevenue);
            response.setData(totalRevenue);
        }
        return response;
    }

    public MyResponse<Integer> getTotalBookedTours(int days) {
        MyResponse<Integer> response = new MyResponse<>();
        LocalDate numberDaysAgo = LocalDate.now().minusDays(days);
        Date numberDaysAgoDate = Date.from(numberDaysAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("bookTours"),
                Aggregation.match(Criteria.where("bookTours.bookingDate").gte(numberDaysAgoDate)),

                Aggregation.count().as("totalBookedTours"));

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "tours", Document.class);
        Document result = results.getUniqueMappedResult();
        if (result == null) {
            response.setStatus(404);
            response.setMessage("Không lấy được số lượng tour đã đặt");
        } else {
            int totalBookedTours = result.getInteger("totalBookedTours");
            response.setStatus(200);
            response.setMessage("Số lượng tour đã được đặt trong " + days + " ngày gần nhất là: " + totalBookedTours);
            response.setData(totalBookedTours);
        }
        return response;
    }

    // Tính doanh thu trong n ngày gần nhất
    public MyResponse<RevenueOfDay> getRevenueByDay(int days) {
        MyResponse<RevenueOfDay> response = new MyResponse<>();
        // n ngày trước tính từ hiện tại
        LocalDate numberDaysAgo = LocalDate.now().minusDays(days);
        Date numberDaysAgoDate = Date.from(numberDaysAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("bookTours"),
                Aggregation.match(Criteria.where("bookTours.bookingDate").gte(numberDaysAgoDate)),
                Aggregation.group("bookTours.bookingDate").sum("bookTours.totalPrice").as("revenue"),
                Aggregation.project("revenue").and("bookTours.bookingDate").as("day"));

        AggregationResults<RevenueOfDay> results = mongoTemplate.aggregate(aggregation, "tours", RevenueOfDay.class);
        RevenueOfDay revenueOfDays = results.getUniqueMappedResult();
        response.setStatus(200);
        response.setMessage("Lấy danh sách doanh thu thành công");
        response.setData(revenueOfDays);
        return response;
    }

    public MyResponse<List<RankBookedTour>> getTopBookedTours() {
        MyResponse<List<RankBookedTour>> response = new MyResponse<>();
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("bookTours"),
                Aggregation.group("tourName", "tourType", "price")
                        .count().as("totalBookedTours"),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "totalBookedTours")),
                Aggregation.limit(10),
                Aggregation.project("totalBookedTours")
                        .and("tourName").as("tourName")
                        .and("tourType").as("tourType")
                        .and("price").as("price"));

        AggregationResults<RankBookedTour> results = mongoTemplate.aggregate(aggregation, "tours",
                RankBookedTour.class);
        List<RankBookedTour> tours = results.getMappedResults();
        if (tours.size() == 0) {
            response.setStatus(404);
            response.setMessage("Không lấy được danh sách");
        } else {
            response.setStatus(200);
            response.setMessage("Lấy danh sách tour được đặt nhiều nhất thành công");
            response.setData(tours);
        }
        return response;
    }

    public MyResponse<?> paymentTour(String email, String tourId, String bookingCode, Payment payment) {
        MyResponse<?> response = new MyResponse<>();

        // Kiểm tra tour tồn tại
        Tour tour = tourRepository.findById(tourId).orElse(null);
        if (tour == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy tour");
            return response;
        }
        // Tìm bookTour
        BookTour bookTour = tour.getBookTours().stream().filter(item -> item.getBookingCode().equals(bookingCode))
                .findFirst().orElse(null);
        if (bookTour == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy thông tin đặt tour");
            return response;
        }

        payment.setPaymentId(TourUtils.generatePaymentId(email));
        payment.setPaymentDate(new Date());

        bookTour.setPayment(payment);
        tourRepository.save(tour);

        response.setStatus(200);
        response.setMessage("Thanh toán tour thành công");
        return response;
    }

    public MyResponse<List<TotalBookingOfRegion>> getTotalBookedToursByRegion() {
        MyResponse<List<TotalBookingOfRegion>> response = new MyResponse<>();

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("bookTours"),
                Aggregation.group("location.regionName")
                        .count().as("totalBooking"),
                Aggregation.project("totalBooking")
                        .and("_id").as("regionName"));

        AggregationResults<TotalBookingOfRegion> results = mongoTemplate.aggregate(aggregation, "tours",
                TotalBookingOfRegion.class);
        List<TotalBookingOfRegion> totalBookingOfRegions = results.getMappedResults();
        if (totalBookingOfRegions.size() == 0) {
            response.setStatus(404);
            response.setMessage("Không lấy được danh sách");
        } else {
            response.setStatus(200);
            response.setMessage("Lấy danh sách số lượng tour đã đặt theo miền thành công");
            response.setData(totalBookingOfRegions);
        }
        return response;
    }

    public MyResponse<List<ReviewTour>> getTopPositiveRatingTours() {
        MyResponse<List<ReviewTour>> response = new MyResponse<>();
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("reviews"),
                Aggregation.group("tourName", "tourType", "price")
                        .avg("reviews.rating").as("averageRating"),
                Aggregation.match(Criteria.where("averageRating").gte(3)),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "averageRating")),
                Aggregation.limit(5),
                Aggregation.project("averageRating")
                        .and("tourName").as("tourName")
                        .and("tourType").as("tourType")
                        .and("price").as("price"));

        AggregationResults<ReviewTour> results = mongoTemplate.aggregate(aggregation, "tours", ReviewTour.class);
        List<ReviewTour> tours = results.getMappedResults();
        if (tours.size() == 0) {
            response.setStatus(404);
            response.setMessage("Không lấy được danh sách");
        } else {
            response.setStatus(200);
            response.setMessage("Lấy danh sách tour có đánh giá tích cực nhất thành công");
            response.setData(tours);
        }
        return response;
    }

    public MyResponse<List<totalBookedOf7Days>> gettotalBookedOf7Days() {
        MyResponse<List<totalBookedOf7Days>> response = new MyResponse<>();
        List<totalBookedOf7Days> bookingOf7Days = totalBookedOf7DaysRepository.findAll();
        if (bookingOf7Days.size() == 0) {
            response.setStatus(404);
            response.setMessage("Không lấy được danh sách");
        } else {
            response.setStatus(200);
            response.setMessage("Lấy danh sách lượng đặt tour trong ngày gần nhất thành công");
            response.setData(bookingOf7Days);
        }
        return response;
    }

    public MyResponse<MaxBookedTourOfMonth> getMaxBookedTourOfMonth() {
        MyResponse<MaxBookedTourOfMonth> response = new MyResponse<>();
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("bookTours"),
                Aggregation.group("tourName")
                        .count().as("totalBookings"),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "totalBookings")),
                Aggregation.limit(1),
                Aggregation.project("totalBookings")
                        .and("_id").as("_id"));
        
        AggregationResults<MaxBookedTourOfMonth> results = mongoTemplate.aggregate(aggregation, "tours", MaxBookedTourOfMonth.class);
        MaxBookedTourOfMonth maxBookedTourOfMonth = results.getUniqueMappedResult();
        if (maxBookedTourOfMonth == null) {
            response.setStatus(404);
            response.setMessage("Không lấy được tour được đặt nhiều nhất trong tháng");
        } else {
            response.setStatus(200);
            response.setMessage("Lấy tour được đặt nhiều nhất trong tháng thành công");
            response.setData(maxBookedTourOfMonth);
        }
        return response;
    }   

}
