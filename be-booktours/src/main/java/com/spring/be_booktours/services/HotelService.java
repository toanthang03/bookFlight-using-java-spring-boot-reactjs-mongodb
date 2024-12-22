package com.spring.be_booktours.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.spring.be_booktours.dtos.MyResponse;
import com.spring.be_booktours.dtos.hotel.BookRoomHotelDto;
import com.spring.be_booktours.dtos.hotel.DefaultHotel;
import com.spring.be_booktours.entities.AppUser;
import com.spring.be_booktours.entities.Hotel;
import com.spring.be_booktours.entities.hotel_entities.BookingRoomHotel;
import com.spring.be_booktours.entities.hotel_entities.HotelBookingHistory;
import com.spring.be_booktours.entities.hotel_entities.RoomType;
import com.spring.be_booktours.entities.sub_entities.Payment;
import com.spring.be_booktours.helpers.HotelQuery;
import com.spring.be_booktours.repositories.AppUserRepository;
import com.spring.be_booktours.repositories.HotelRepository;
import com.spring.be_booktours.utils.HotelUtils;
import com.spring.be_booktours.utils.TourUtils;

@Service
@Transactional
public class HotelService {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private AppUserRepository userRepository;

    public MyResponse<String> createDefaultHotel(DefaultHotel defaultHotel) {
        MyResponse<String> response = new MyResponse<>();

        Hotel hotel = new Hotel();
        hotel.setHotelName(defaultHotel.getHotelName());
        hotel.setHotelStar(defaultHotel.getHotelStar());
        hotel.setLocation(defaultHotel.getLocation());

        hotel.setHotelAddress("Địa chỉ mặc định");
        hotel.setHotelDescription("Mô tả mặc định");
        hotel.setHotelEmail("default@gmail.com");
        hotel.setHotelPhone("0123456789");
        hotel.setHotelImage(List.of(
                "https://pix8.agoda.net/hotelImages/42154390/694087431/4cd8bac36ea50fbb19206797f067284e.jpg?ce=0&s=375x"));
        hotel.setHotelFacilities(List.of("Wi-Fi miễn phí trong tất cả các phòng!", "Bể bơi", "Ban công hoặc sân hiên"));
        hotel.setActive(false);

        hotel.setHotelCode(HotelUtils.generateHotelCode());
        hotelRepository.save(hotel);
        response.setStatus(200);
        response.setMessage("Tạo khách sạn thành công");
        response.setData(hotel.getHotelCode());
        return response;
    }

    public MyResponse<?> updateHotel(String hotelCode, Hotel hotel) {
        MyResponse<?> response = new MyResponse<>();

        Optional<Hotel> hotelEdit = hotelRepository.findByHotelCode(hotelCode);
        if (!hotelEdit.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
        }

        Hotel hotelUpdate = hotelEdit.get();
        hotelUpdate.setHotelName(hotel.getHotelName());
        hotelUpdate.setHotelStar(hotel.getHotelStar());
        hotelUpdate.setHotelAddress(hotel.getHotelAddress());
        hotelUpdate.setHotelPhone(hotel.getHotelPhone());
        hotelUpdate.setHotelEmail(hotel.getHotelEmail());
        hotelUpdate.setHotelDescription(hotel.getHotelDescription());
        hotelUpdate.setRoomTypes(hotel.getRoomTypes());
        hotelUpdate.setHotelImage(hotel.getHotelImage());
        hotelUpdate.setHotelFacilities(hotel.getHotelFacilities());
        hotelUpdate.setActive(hotel.isActive());

        hotelRepository.save(hotelUpdate);

        response.setStatus(200);
        response.setMessage("Cập nhật thông tin khách sạn thành công");
        return response;
    }

    public MyResponse<List<Hotel>> getHotels(HotelQuery hotelQuery) {
        MyResponse<List<Hotel>> response = new MyResponse<>();
        List<Hotel> hotels = new ArrayList<>();
        Query query = new Query();

        if (hotelQuery.getHotelName().length() > 0) {
            query.addCriteria(Criteria.where("hotelName").regex(hotelQuery.getHotelName(), "i"));
        }
        if (hotelQuery.getLocationId().length() > 0) {
            query.addCriteria(Criteria.where("location.locationId").is(hotelQuery.getLocationId()));
        }
        if (hotelQuery.getActive() == 1) {
            query.addCriteria(Criteria.where("active").is(true));
        }

        // Lọc theo giá
        if (hotelQuery.getMinPrice() <= hotelQuery.getMaxPrice()) {
            query.addCriteria(Criteria.where("roomTypes.roomPrice").gte(hotelQuery.getMinPrice())
                    .lte(hotelQuery.getMaxPrice()));
        }

        // Sắp xếp
        if (hotelQuery.getSortBy().equals("price")) {
            if (hotelQuery.getSortType().equals("asc")) {
                query.with(org.springframework.data.domain.Sort
                        .by(org.springframework.data.domain.Sort.Order.asc("roomTypes.roomPrice")));
            } else {
                query.with(org.springframework.data.domain.Sort
                        .by(org.springframework.data.domain.Sort.Order.desc("roomTypes.roomPrice")));
            }
        } else if (hotelQuery.getSortBy().equals("hotelName")) {
            if (hotelQuery.getSortType().equals("asc")) {
                query.with(org.springframework.data.domain.Sort
                        .by(org.springframework.data.domain.Sort.Order.asc("hotelName")));
            } else {
                query.with(org.springframework.data.domain.Sort
                        .by(org.springframework.data.domain.Sort.Order.desc("hotelName")));
            }
        }

        // Phân trang
        query.skip((long) (hotelQuery.getPage() - 1) * hotelQuery.getLimit()); // Bỏ qua một số lượng bản ghi
        query.limit(hotelQuery.getLimit()); // Giới hạn số bản ghi trả về

        hotels = mongoTemplate.find(query, Hotel.class);
        response.setStatus(200);
        response.setMessage("Lấy danh sách khách sạn thành công");
        response.setData(hotels);
        return response;
    }

    public MyResponse<Hotel> getHotelDetail(String hotelCode) {
        MyResponse<Hotel> response = new MyResponse<>();
        Optional<Hotel> hotel = hotelRepository.findByHotelCode(hotelCode);

        if (!hotel.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
            return response;
        }

        response.setStatus(200);
        response.setMessage("Lấy thông tin khách sạn thành công");
        response.setData(hotel.get());
        return response;
    }

    public MyResponse<String> bookRoom(String email, String hotelCode, BookRoomHotelDto bookRoomHotelDto) {
        MyResponse<String> response = new MyResponse<>();
        Optional<Hotel> hotelOptional = hotelRepository.findByHotelCode(hotelCode);
        if (!hotelOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
            return response;
        }
        Hotel hotel = hotelOptional.get();
        Optional<BookingRoomHotel> bookingOptional = hotel.getBookingRoomHotels().stream()
                .filter(t -> t.getContactInfo().getEmail().equals(bookRoomHotelDto.getContactInfo().getEmail())
                        && t.getCheckInDate().isEqual(bookRoomHotelDto.getCheckInDate()))
                .findFirst();
        if (bookingOptional.isPresent()) {
            response.setStatus(403);
            response.setMessage("Đã đặt phòng trước đó");
            return response;
        }

        // Tìm loại phòng
        Optional<RoomType> roomTypeOptional = hotel.getRoomTypes().stream()
                .filter(t -> t.getRoomTypeId() == bookRoomHotelDto.getRoomTypeId()).findFirst();
        if (!roomTypeOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy loại phòng");
            return response;
        }

        // Ngày nhận phòng phải lớn hơn hoặc bằng ngày hiện tại
        if (bookRoomHotelDto.getCheckInDate().isBefore(LocalDate.now())) {
            response.setStatus(403);
            response.setMessage("Ngày nhận phòng phải lớn hơn hoặc bằng ngày hiện tại");
            return response;
        }

        // Đếm số lượng bookingHotel
        LocalDate checkInDate = bookRoomHotelDto.getCheckInDate();
        for (int i = 0; i < bookRoomHotelDto.getDays(); i++) {
            int finalI = i;
            long count = hotel.getBookingRoomHotels().stream()
                    .filter(t -> t.getRoomTypeId() == bookRoomHotelDto.getRoomTypeId()
                            && t.getCheckInDate().isEqual(checkInDate.plusDays(finalI)))
                    .count();
            if (count >= roomTypeOptional.get().getNumberOfRooms()) {
                response.setStatus(403);
                response.setMessage("Ngày " + checkInDate.plusDays(finalI)
                        + " đã hết phòng, vui lòng chọn ngày khác hoặc điều chỉnh số lượng ngày lưu trú");
                return response;
            }
        }

        BookingRoomHotel bookingRoomHotel = new BookingRoomHotel();
        bookingRoomHotel.setBookingCode(HotelUtils.generateBookingCode());
        bookingRoomHotel.setBookingDate(new Date());
        bookingRoomHotel.setRoomTypeId(bookRoomHotelDto.getRoomTypeId());
        bookingRoomHotel.setNumberOfRooms(bookRoomHotelDto.getNumberOfRooms());
        bookingRoomHotel.setCheckInDate(bookRoomHotelDto.getCheckInDate());
        bookingRoomHotel.setCheckOutDate(bookRoomHotelDto.getCheckInDate().plusDays(bookRoomHotelDto.getDays()));
        bookingRoomHotel.setTotalPrice(roomTypeOptional.get().getRoomPrice() * bookRoomHotelDto.getDays()
                * bookRoomHotelDto.getNumberOfRooms());
        bookingRoomHotel.setContactInfo(bookRoomHotelDto.getContactInfo());
        bookingRoomHotel.setEmailBooked(email);
        bookingRoomHotel.setPayment(null);
        bookingRoomHotel.setConfirmed(false);

        hotel.getBookingRoomHotels().add(bookingRoomHotel);
        hotelRepository.save(hotel);

        // Tìm user và lưu thông tin đặt phòng
        Optional<AppUser> userOptional = userRepository.findByEmail(bookRoomHotelDto.getContactInfo().getEmail());
        HotelBookingHistory hotelBookingHistory = new HotelBookingHistory();
        hotelBookingHistory.setBookingCode(bookingRoomHotel.getBookingCode());
        hotelBookingHistory.setHotelCode(hotel.getHotelCode());
        hotelBookingHistory.setBookingDate(bookingRoomHotel.getBookingDate());
        userOptional.get().getHotelBookingHistories().add(hotelBookingHistory);
        userRepository.save(userOptional.get());

        response.setStatus(200);
        response.setMessage("Đặt phòng thành công");
        response.setData(bookingRoomHotel.getBookingCode());
        return response;
    }

    public MyResponse<?> cancelRoom(String hotelCode, String bookingCode, String email) {
        MyResponse<?> response = new MyResponse<>();
        Optional<Hotel> hotelOptional = hotelRepository.findByHotelCode(hotelCode);
        if (!hotelOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
            return response;
        }
        Hotel hotel = hotelOptional.get();
        Optional<BookingRoomHotel> bookingOptional = hotel.getBookingRoomHotels().stream()
                .filter(t -> t.getBookingCode().equals(bookingCode)).findFirst();
        if (!bookingOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Đơn đặt phòng không tồn tại");
            return response;
        }
        BookingRoomHotel bookingRoomHotel = bookingOptional.get();
        if (!bookingRoomHotel.getContactInfo().getEmail().equals(email)) {
            response.setStatus(403);
            response.setMessage("Không có quyền hủy đơn đặt phòng");
            return response;
        }
        // Đã nhận phòng không thể hủy
        if (LocalDate.now().isAfter(bookingRoomHotel.getCheckInDate())) {
            response.setStatus(403);
            response.setMessage("Đã nhận phòng rồi không thể hủy");
            return response;
        }
        // Phải hủy trước 12 tiếng so với thời gian check-in
        if (LocalDate.now().isAfter(bookingRoomHotel.getCheckInDate().minusDays(1))) {
            response.setStatus(403);
            response.setMessage("Không thể hủy đơn đặt phòng");
            return response;
        }

        hotel.getBookingRoomHotels().remove(bookingRoomHotel);
        // Xóa thông tin đặt phòng trong user
        Optional<AppUser> userOptional = userRepository.findByEmail(email);
        userOptional.get().getHotelBookingHistories().removeIf(t -> t.getBookingCode().equals(bookingCode));
        userRepository.save(userOptional.get());
        hotelRepository.save(hotel);
        response.setStatus(200);
        response.setMessage("Hủy đơn đặt phòng thành công, vui lòng liên hệ số điện thoại " + hotel.getHotelPhone()
                + " để được hoàn tiền");
        return response;
    }

    public MyResponse<String> payRoom(String email, String hotelCode, String bookingCode, Payment payment) {
        MyResponse<String> response = new MyResponse<>();

        Optional<Hotel> hotelOptional = hotelRepository.findByHotelCode(hotelCode);
        if (!hotelOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
            return response;
        }
        Hotel hotel = hotelOptional.get();
        Optional<BookingRoomHotel> bOptional = hotel.getBookingRoomHotels().stream()
                .filter(t -> t.getBookingCode().equals(bookingCode))
                .findFirst();
        if (!bOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm đơn đặt phòng khách sạn");
            return response;
        }
        BookingRoomHotel bookingRoomHotel = bOptional.get();

        payment.setPaymentId(TourUtils.generatePaymentId(email));
        payment.setPaymentDate(new Date());

        bookingRoomHotel.setPayment(payment);
        hotelRepository.save(hotel);

        response.setStatus(200);
        response.setMessage("Thanh toán đơn đặt tour thành công");
        response.setData(bookingRoomHotel.getBookingCode());
        return response;
    }

    public MyResponse<BookingRoomHotel> getBookingDetail(String hotelCode, String bookingCode) {
        MyResponse<BookingRoomHotel> response = new MyResponse<>();
        Optional<Hotel> hotelOptional = hotelRepository.findByHotelCode(hotelCode);
        if (!hotelOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
            return response;
        }
        Hotel hotel = hotelOptional.get();
        Optional<BookingRoomHotel> bookingOptional = hotel.getBookingRoomHotels().stream()
                .filter(t -> t.getBookingCode().equals(bookingCode)).findFirst();
        if (!bookingOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy đơn đặt phòng");
            return response;
        }
        response.setStatus(200);
        response.setMessage("Lấy thông tin đơn đặt phòng thành công");
        response.setData(bookingOptional.get());
        return response;
    }

    public MyResponse<List<BookingRoomHotel>> viewBookingRoom(String hotelCode, LocalDate date) {
        MyResponse<List<BookingRoomHotel>> response = new MyResponse<>();
        Optional<Hotel> hotel = hotelRepository.findByHotelCode(hotelCode);
        if (!hotel.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
            return response;
        }
        // Lấy danh sách đặt phòng của khách sạn dựa vào check-in và check-out
        // tìm các booking có (checkin <= ngày được truyền vào <= checkout)
        List<BookingRoomHotel> bookingRoomHotels = hotel.get().getBookingRoomHotels();
        bookingRoomHotels = bookingRoomHotels.stream()
                .filter(t -> (t.getCheckInDate().isBefore(date) ||
                        t.getCheckInDate().isEqual(date))
                        && (t.getCheckOutDate().isAfter(date) || t.getCheckOutDate().isEqual(date)))
                .collect(Collectors.toList());

        response.setStatus(200);
        response.setMessage("Lấy danh sách đặt phòng thành công");
        response.setData(bookingRoomHotels);
        return response;
    }

    public MyResponse<?> confirmBookingRoom(String hotelCode, String bookingCode) {
        MyResponse<?> response = new MyResponse<>();
        Optional<Hotel> hotelOptional = hotelRepository.findByHotelCode(hotelCode);
        if (!hotelOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
            return response;
        }
        Hotel hotel = hotelOptional.get();
        Optional<BookingRoomHotel> bookingOptional = hotel.getBookingRoomHotels().stream()
                .filter(t -> t.getBookingCode().equals(bookingCode)).findFirst();
        if (!bookingOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy đơn đặt phòng");
            return response;
        }
        BookingRoomHotel bookingRoomHotel = bookingOptional.get();
        bookingRoomHotel.setConfirmed(true);
        hotelRepository.save(hotel);
        response.setStatus(200);
        response.setMessage("Xác nhận đơn đặt phòng thành công");
        return response;
    }

    public MyResponse<RoomType> addRoomType(String hotelCode, RoomType roomType) {
        MyResponse<RoomType> response = new MyResponse<>();
        Optional<Hotel> hotelOptional = hotelRepository.findByHotelCode(hotelCode);
        if (!hotelOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy khách sạn");
            return response;
        }
        Hotel hotel = hotelOptional.get();

        // Phải thêm đủ 3 ảnh
        if (roomType.getRoomImage().size() != 3) {
            response.setStatus(400);
            response.setMessage("Phải thêm đủ 3 ảnh");
            return response;
        }

        // Phải thêm ít nhất 3 tiện ích
        if (roomType.getRoomFacilities().size() < 3) {
            response.setStatus(400);
            response.setMessage("Phải thêm ít nhất 3 tiện ích");
            return response;
        }

        // Phải thêm ít nhất 3 chi tiết
        if (roomType.getRoomDetails().size() < 3) {
            response.setStatus(400);
            response.setMessage("Phải thêm ít nhất 3 chi tiết");
            return response;
        }
        roomType.setRoomTypeId(hotel.getRoomTypes().size() + 1);
        hotel.getRoomTypes().add(roomType);
        hotelRepository.save(hotel);
        response.setStatus(200);
        response.setMessage("Thêm loại phòng thành công");
        response.setData(roomType);
        return response;
    }

    public MyResponse<List<Hotel>> getHotels() {
        MyResponse<List<Hotel>> response = new MyResponse<>();
        List<Hotel> hotels = hotelRepository.findAll();
        response.setStatus(200);
        response.setMessage("Lấy danh sách khách sạn thành công");
        response.setData(hotels);
        return response;
    }

}
