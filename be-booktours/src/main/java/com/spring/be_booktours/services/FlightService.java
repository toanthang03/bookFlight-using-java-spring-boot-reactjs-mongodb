package com.spring.be_booktours.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import com.spring.be_booktours.dtos.MyResponse;
import com.spring.be_booktours.dtos.flight.AirportsToBeReached;
import com.spring.be_booktours.dtos.flight.BookTicketDto;
import com.spring.be_booktours.dtos.flight.CancellationRate;
import com.spring.be_booktours.dtos.flight.DefaultFlight;
import com.spring.be_booktours.dtos.flight.DetailTicket;
import com.spring.be_booktours.dtos.flight.MostFlightBooking;
import com.spring.be_booktours.dtos.result_queries.RevenueOfAirline;
import com.spring.be_booktours.entities.AppUser;
import com.spring.be_booktours.entities.Flight;
import com.spring.be_booktours.entities.flight_entities.FlightBooking;
import com.spring.be_booktours.entities.flight_entities.Schedule;
import com.spring.be_booktours.entities.flight_entities.Ticket;
import com.spring.be_booktours.entities.sub_entities.Payment;
import com.spring.be_booktours.helpers.FlightQuery;
import com.spring.be_booktours.repositories.AppUserRepository;
import com.spring.be_booktours.repositories.FlightRepository;
import com.spring.be_booktours.utils.FlightUtils;
import com.spring.be_booktours.utils.TourUtils;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private AppUserRepository appUserRepository;

    public MyResponse<List<Flight>> getFlights(FlightQuery flightQuery) {
        MyResponse<List<Flight>> response = new MyResponse<>();
        List<Flight> flights = new ArrayList<>();
        Query query = new Query();

        if (flightQuery.getDeparture().length() > 0) {
            // Lọc theo sân bay đi
            query.addCriteria(Criteria.where("departure.airfieldId").is(flightQuery.getDeparture()));
        }

        if (flightQuery.getDestination().length() > 0) {
            // Lọc theo sân bay đến
            query.addCriteria(Criteria.where("destination.airfieldId").is(flightQuery.getDestination()));
        }

        // Lọc theo hãng hàng không
        if (flightQuery.getAirline().length() > 0) {
            query.addCriteria(Criteria.where("airline.airlineId").is(flightQuery.getAirline()));
        }
        // Lọc theo ngày khởi hành nếu ngày khởi hành lớn hơn hoặc là ngày hôm nay
        if (flightQuery.getDepartureDate().isEqual(LocalDate.now())
                || flightQuery.getDepartureDate().isAfter(LocalDate.now())) {
            query.addCriteria(Criteria.where("schedules.departureDate").is(flightQuery.getDepartureDate()));
        } else {
            query.addCriteria(Criteria.where("schedules.departureDate").gte(flightQuery.getDepartureDate()));
        }
        // Lọc theo có thể hủy
        if (flightQuery.getCancelable().length() > 0) {
            query.addCriteria(Criteria.where("cancelable").is(flightQuery.getCancelable().equals("cancelable")));
        }
        // Lọc theo đang hoạt động
        if (flightQuery.getActive().length() > 0) {
            query.addCriteria(Criteria.where("active").is(flightQuery.getActive().equals("active")));
        }
        // Lọc theo giá
        query.addCriteria(Criteria.where("normalPrice").gte(flightQuery.getMinPrice())
                .lte(flightQuery.getMaxPrice()));

        // Sắp xếp
        if (flightQuery.getSortBy().equals("price")) {
            if (flightQuery.getSortType().equals("asc")) {
                query.with(org.springframework.data.domain.Sort
                        .by(org.springframework.data.domain.Sort.Order.asc("normalPrice")));
            } else {
                query.with(org.springframework.data.domain.Sort
                        .by(org.springframework.data.domain.Sort.Order.desc("normalPrice")));
            }
        }

        // Phân trang
        query.skip((long) (flightQuery.getPage() - 1) * flightQuery.getLimit()); // Bỏ qua một số lượng bản ghi
        query.limit(flightQuery.getLimit()); // Giới hạn số bản ghi trả về

        flights = mongoTemplate.find(query, Flight.class);
        response.setStatus(200);
        response.setMessage("Lấy danh sách chuyến bay thành công");
        response.setData(flights);
        return response;
    }

    // Tính tiền

    // Trả về mã vé sau khi đặt vé thành công
    public MyResponse<String> bookTicket(String flightCode, BookTicketDto bookTicketDto) {
        MyResponse<String> response = new MyResponse<>();
        Optional<Flight> flightOptional = flightRepository.findByFlightCode(flightCode);
        if (!flightOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy chuyến bay");
            return response;
        }
        // Kiểm tra chuyến bay có hỗ trợ lịch bay trong ticket không
        Schedule schedule = flightOptional.get().getSchedules().stream()
                .filter(s -> s.getScheduleId().equals(bookTicketDto.getScheduleId())).findFirst().orElse(null);
        if (schedule == null) {
            response.setStatus(400);
            response.setMessage("Chuyến bay không hỗ trợ lịch bay trong vé");
            return response;
        }

        // Kiểm tra chuyến bay có đang hoạt động không
        if (!flightOptional.get().isActive()) {
            response.setStatus(400);
            response.setMessage("Chuyến bay không hoạt động");
            return response;
        }
        Flight flight = flightOptional.get();

        // Kiểm tra điều kiện

        // Phải đặt vé trước 12h so với ngày xuất phát
        // Nếu ngày đặt vé và ngày bay là ngày hôm nay thì kiểm tra giờ đặt
        if (new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
                .isEqual(schedule.getDepartureDate())) {
            // Nếu giờ đặt vé sau 12h so với giờ xuất phát
            // Lấy lịch bay từ danh sách lịch bay của chuyến bay
            if (new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalTime()
                    .isAfter(schedule.getDepartureTime().minusHours(12))) {
                response.setStatus(400);
                response.setMessage("Phải đặt vé trước 12h so với giờ xuất phát");
                return response;
            }
        }

        // Kiểm tra số lượng ghế còn trống thì lấy số lượng ghế thường/vip so sánh với
        // số ghế khả dụng trong Schedule
        // Nếu số ghế còn trống nhỏ hơn số ghế cần đặt thì thông báo lỗi
        int totalVipSeats = bookTicketDto.getPassengers().stream().filter(p -> p.isVip() == true).toArray().length;
        if (totalVipSeats > schedule.getAvailableVipSeats()) {
            response.setStatus(400);
            response.setMessage("Chỉ còn " + schedule.getAvailableVipSeats() + " ghế VIP trống");
            return response;
        }
        int totalNormalSeats = bookTicketDto.getPassengers().stream().filter(p -> p.isVip() == false).toArray().length;
        if (totalNormalSeats > schedule.getAvailableNormalSeats()) {
            response.setStatus(400);
            response.setMessage("Chỉ còn " + schedule.getAvailableNormalSeats() + " ghế thường trống");
            return response;
        }

        // Khi thỏa mãn tất cả điều kiện thì tính tiền và thêm vé vào chuyến bay
        Ticket ticket = new Ticket();
        ticket.setTicketId(FlightUtils.generateTicketId(flightCode));
        ticket.setScheduleId(bookTicketDto.getScheduleId());
        ticket.setPassengers(bookTicketDto.getPassengers());

        // Tìm và gán dịch vụ cho vé
        flight.getFlightServices().forEach(fs -> {
            for (String fsId : bookTicketDto.getFlightServiceIds()) {
                if (fs.getFlightServiceId().equals(fsId)) {
                    ticket.getFlightServices().add(fs);
                }
            }
        });

        ticket.setContactInfo(bookTicketDto.getContactInfo());
        // Tính tiền
        double totalPrice = FlightUtils.calculatePrice(flight, ticket);
        ticket.setTotalPrice(totalPrice);
        ticket.setBookingDate(new Date());
        ticket.setConfirmed(false);
        ticket.setCanceled(false);

        flight.getTickets().add(ticket);
        // Cập nhật số ghế còn trống
        schedule.setAvailableNormalSeats(schedule.getAvailableNormalSeats() - totalNormalSeats);
        schedule.setAvailableVipSeats(schedule.getAvailableVipSeats() - totalVipSeats);
        flightRepository.save(flight);
        // Cập nhật vào lịch sử đặt vé của người dùng
        Optional<AppUser> user = appUserRepository.findByEmail(bookTicketDto.getContactInfo().getEmail());
        if (user.isPresent()) {
            FlightBooking flightBooking = new FlightBooking(flightCode, ticket.getTicketId(), ticket.getBookingDate());
            user.get().getFlightBookings().add(flightBooking);
            appUserRepository.save(user.get());
        } else {
            response.setStatus(404);
            response.setMessage("Không tìm thấy người dùng");
            return response;
        }

        response.setStatus(200);
        response.setMessage("Đặt vé thành công");
        response.setData(ticket.getTicketId());
        return response;
    }

    public MyResponse<Double> calculatePrice(String flightCode, Ticket ticket) {
        MyResponse<Double> response = new MyResponse<>();
        Optional<Flight> flight = flightRepository.findByFlightCode(flightCode);
        if (!flight.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy chuyến bay");
            return response;
        }

        double totalPrice = FlightUtils.calculatePrice(flight.get(), ticket);
        response.setStatus(200);
        response.setMessage("Tính tiền thành công tổng tiền của bạn là: " + totalPrice);
        response.setData(totalPrice);
        return response;
    }

    public MyResponse<Double> cancelTicket(String flightCode, String ticketId, String email) {
        MyResponse<Double> response = new MyResponse<>();
        Optional<Flight> flightOptional = flightRepository.findByFlightCode(flightCode);
        if (!flightOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy chuyến bay");
            return response;
        }
        Flight flight = flightOptional.get();
        if (!flight.isCancelable()) {
            response.setStatus(400);
            response.setMessage("Vé không được phép hủy");
            return response;
        }
        Optional<Ticket> ticketOptional = flight.getTickets().stream().filter(t -> t.getTicketId().equals(ticketId))
                .findFirst();
        if (!ticketOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy vé hoặc vé đã bị hủy");
            return response;
        }

        Ticket ticket = ticketOptional.get();

        // Kiểm tra ngày giờ hủy vé
        Schedule schedule = flight.getSchedules().stream().filter(s -> s.getScheduleId().equals(ticket.getScheduleId()))
                .findFirst().get();
        if (schedule.getDepartureDate().isBefore(LocalDate.now())) {
            response.setStatus(400);
            response.setMessage("Không thể hủy vé sau ngày xuất phát");
            return response;
        } else {
            // Phải hủy vé trước 8h so với ngày xuất phát
            // Nếu ngày hủy vé là ngày hôm nay
            if (new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
                    .isEqual(schedule.getDepartureDate())) {
                // Nếu giờ hủy vé sau 8h so với giờ xuất phát
                if (new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalTime()
                        .isAfter(schedule.getDepartureTime().minusHours(8))) {
                    response.setStatus(400);
                    response.setMessage("Phải hủy vé trước 8h so với giờ xuất phát");
                    return response;
                }
            }
        }

        if (!ticket.getContactInfo().getEmail().equals(email)) {
            response.setStatus(403);
            response.setMessage("Không thể hủy vé của người khác");
            return response;
        }
        if (ticket.isCanceled()) {
            response.setStatus(400);
            response.setMessage("Vé đã hủy");
            return response;
        }
        if (ticket.isConfirmed()) {
            response.setStatus(400);
            response.setMessage("Vé đã xác nhận không thể hủy");
            return response;
        }
        // Tìm và Set lại số ghế còn trống
        schedule.setAvailableNormalSeats(schedule.getAvailableNormalSeats()
                + ticket.getPassengers().stream().filter(p -> p.isVip() == false).toArray().length);
        schedule.setAvailableVipSeats(schedule.getAvailableVipSeats()
                + ticket.getPassengers().stream().filter(p -> p.isVip() == true).toArray().length);
        ticket.setCanceled(true);
        flightRepository.save(flight);

        // Xóa vé khỏi lịch sử đặt vé của người dùng
        Optional<AppUser> user = appUserRepository.findByEmail(email);
        if (user.isPresent()) {
            user.get().getFlightBookings().removeIf(fb -> fb.getFlightCode().equals(flightCode)
                    && fb.getTicketId().equals(ticketId));
            appUserRepository.save(user.get());
        } else {
            response.setStatus(404);
            response.setMessage("Không tìm thấy người dùng");
            return response;
        }
        response.setStatus(200);
        response.setMessage("Hủy vé thành công, số tiền hoàn lại: " + ticket.getTotalPrice() * 0.8);
        response.setData(ticket.getTotalPrice() * 0.8);
        return response;
    }

    public MyResponse<DetailTicket> getTicketInfo(String flightCode, String ticketId) {
        MyResponse<DetailTicket> response = new MyResponse<>();
        Optional<Flight> flightOptional = flightRepository.findByFlightCode(flightCode);
        if (!flightOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy chuyến bay");
            return response;
        }
        Flight flight = flightOptional.get();
        Optional<Ticket> ticketOptional = flight.getTickets().stream().filter(t -> t.getTicketId().equals(ticketId))
                .findFirst();
        if (!ticketOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy vé");
            return response;
        }
        Ticket ticket = ticketOptional.get();
        // Tìm thông tin lịch bay
        Schedule schedule = flight.getSchedules().stream().filter(s -> s.getScheduleId().equals(ticket.getScheduleId()))
                .findFirst().get();
        DetailTicket detailTicket = new DetailTicket();
        detailTicket.setTicket(ticket);
        detailTicket.setSchedule(schedule);
        detailTicket.setFlightName(flight.getFlightName());
        detailTicket.setAirlineName(flight.getAirline().getAirlineName());
        detailTicket.setDepartureAirfield(flight.getDeparture().getAirfieldName());
        detailTicket.setDestinationAirfield(flight.getDestination().getAirfieldName());
        // ...
        response.setStatus(200);
        response.setMessage("Lấy thông tin vé thành công");
        response.setData(detailTicket);
        return response;
    }

    // Trả về mã chuyến bay sau khi tạo chuyến bay thành công
    public MyResponse<String> createDefaultFlight(DefaultFlight defaultFlight) {
        MyResponse<String> response = new MyResponse<>();

        // Kiểm tra trùng mã sân bay
        if (defaultFlight.getDeparture().getAirfieldId().equals(defaultFlight.getDestination().getAirfieldId())) {
            response.setStatus(400);
            response.setMessage("Sân bay đi và sân bay đến không được trùng nhau");
            return response;
        }

        // Kiểm tra xem đã tồn tại chuyến bay chưa
        List<Flight> flightOptional = flightRepository
                .findByAirlineAirlineIdAndDepartureAirfieldIdAndDestinationAirfieldId(
                        defaultFlight.getAirline().getAirlineId(), defaultFlight.getDeparture().getAirfieldId(),
                        defaultFlight.getDestination().getAirfieldId());

        if (flightOptional.size() > 0) {
            response.setStatus(400);
            response.setMessage("Chuyến bay đã được hỗ trợ");
            return response;
        }

        Flight flight = new Flight();
        flight.setFlightCode(FlightUtils.generateFlightCode(defaultFlight));
        flight.setFlightName("Chuyến bay từ " + defaultFlight.getDeparture().getAirfieldName() + " đến "
                + defaultFlight.getDestination().getAirfieldName());
        flight.setAirline(defaultFlight.getAirline());
        flight.setDeparture(defaultFlight.getDeparture());
        flight.setDestination(defaultFlight.getDestination());
        flight.setSchedules(
                Set.of(new Schedule(FlightUtils.generateScheduleId(), LocalDate.now(), LocalTime.of(8, 0), 3, 0, 10,
                        40)));
        flight.setNormalPrice(500000);
        flight.setVipPrice(1000000);
        flight.setTax(100000);
        flight.setCancelable(true);
        flight.setActive(false);
        flightRepository.save(flight);

        response.setStatus(200);
        response.setMessage("Tạo chuyến bay thành công, mã chuyến bay của bạn là: " + flight.getFlightCode());
        response.setData(flight.getFlightCode());
        return response;
    }

    public MyResponse<Schedule> addSchedule(String flightCode, Schedule schedule) {
        MyResponse<Schedule> response = new MyResponse<>();
        Optional<Flight> flightOptional = flightRepository.findByFlightCode(flightCode);
        if (!flightOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy chuyến bay");
            return response;
        }
        Flight flight = flightOptional.get();
        // Kiểm tra xem lịch bay đã tồn tại chưa
        boolean isExist = flight.getSchedules().stream()
                .anyMatch(s -> s.getDepartureDate().isEqual(schedule.getDepartureDate())
                        && s.getDepartureTime().equals(schedule.getDepartureTime()));
        if (isExist) {
            response.setStatus(400);
            response.setMessage("Lịch bay đã tồn tại");
            return response;
        }

        // Kiểm tra ngày giờ xuất phát
        if (schedule.getDepartureDate().isBefore(LocalDate.now())) {
            response.setStatus(400);
            response.setMessage("Ngày xuất phát phải lớn hơn hoặc bằng ngày hiện tại");
            return response;
        }
        // Nếu ngày xuất phát và ngày hiện tại bằng nhau thì kiểm tra giờ xuất phát
        if (schedule.getDepartureDate().isEqual(LocalDate.now())) {
            if (schedule.getDepartureTime().isBefore(LocalTime.now())) {
                response.setStatus(400);
                response.setMessage("Giờ xuất phát phải lớn hơn giờ hiện tại");
                return response;
            }
        }

        schedule.setScheduleId(FlightUtils.generateScheduleId());
        schedule.setAvailableNormalSeats(40);
        schedule.setAvailableVipSeats(10);
        flight.getSchedules().add(schedule);
        flightRepository.save(flight);
        response.setStatus(200);
        response.setMessage("Thêm lịch bay thành công, mã lịch bay của bạn là: " + schedule.getScheduleId());
        response.setData(schedule);
        return response;
    }

    public MyResponse<?> updateFlight(String flightCode, Flight flight) {
        MyResponse<?> response = new MyResponse<>();
        Optional<Flight> flightOptional = flightRepository.findByFlightCode(flightCode);
        if (!flightOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy chuyến bay");
            return response;
        }
        Flight oldFlight = flightOptional.get();
        oldFlight.setSchedules(flight.getSchedules());
        oldFlight.setNormalPrice(flight.getNormalPrice());
        oldFlight.setVipPrice(flight.getVipPrice());
        oldFlight.setTax(flight.getTax());
        oldFlight.setFlightServices(flight.getFlightServices());
        oldFlight.setActive(flight.isActive());
        oldFlight.setCancelable(flight.isCancelable());
        oldFlight.setTickets(flight.getTickets()); // Xác nhận vé
        flightRepository.save(oldFlight);
        response.setStatus(200);
        response.setMessage("Sửa chuyến bay thành công");
        return response;
    }

    public MyResponse<Flight> getFlightDetail(String flightCode) {
        MyResponse<Flight> response = new MyResponse<>();
        Optional<Flight> flightOptional = flightRepository.findByFlightCode(flightCode);
        if (!flightOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy chuyến bay");
            return response;
        }
        response.setStatus(200);
        response.setMessage("Lấy thông tin chuyến bay thành công");
        response.setData(flightOptional.get());
        return response;
    }

    public MyResponse<List<RevenueOfAirline>> revenueByAirline() {
        MyResponse<List<RevenueOfAirline>> response = new MyResponse<>();

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("tickets"),
                Aggregation.match(Criteria.where("tickets.canceled").is(false)),
                Aggregation.group("airline.airlineName").sum("tickets.totalPrice").as("totalRevenue"),
                Aggregation.project("totalRevenue"));

        AggregationResults<RevenueOfAirline> result = mongoTemplate.aggregate(aggregation, "flights",
                RevenueOfAirline.class);
        List<RevenueOfAirline> revenueOfAirlines = result.getMappedResults();

        response.setStatus(200);
        response.setMessage("Thống kê doanh thu theo hãng bay thành công");
        response.setData(revenueOfAirlines);
        return response;
    }

    public MyResponse<List<MostFlightBooking>> top5MostFrequentFlights() {
        MyResponse<List<MostFlightBooking>> response = new MyResponse<>();
        // db.flights.aggregate([
        // // Đếm số lượng vé được đặt cho từng chuyến bay
        // {
        // : {
        // flightCode: 1, // Mã chuyến bay
        // flightName: 1, // Tên chuyến bay
        // ticketCount: { : "" } // Số lượng vé
        // }
        // },
        // // Sắp xếp giảm dần theo số lượng vé
        // { : { ticketCount: -1 } },
        // // Lấy ra top 5 chuyến bay
        // { : 5 }
        // ]);

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.project("flightCode", "flightName").and("tickets").size().as("ticketCount"),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "ticketCount")),
                Aggregation.limit(5));

        AggregationResults<MostFlightBooking> result = mongoTemplate.aggregate(aggregation, "flights",
                MostFlightBooking.class);
        List<MostFlightBooking> mostFlightBookings = result.getMappedResults();
        response.setStatus(200);
        response.setMessage("Thống kê 5 chuyến bay thường xuyên nhất thành công");
        response.setData(mostFlightBookings);
        return response;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public MyResponse<CancellationRate> cancellationRate() {
        MyResponse<CancellationRate> response = new MyResponse<>();
        try {
            // Bước 1: Unwind để tách mảng "tickets"
            AggregationOperation unwindTickets = Aggregation.unwind("tickets");

            // Bước 2: Group để đếm tổng vé và vé bị hủy
            AggregationOperation groupByAll = Aggregation.group()
                    .count().as("totalTickets") // Tổng số vé
                    .sum(ConditionalOperators.when(Criteria.where("tickets.canceled").is(true)).then(1).otherwise(0))
                    .as("canceledTickets"); // Số vé bị hủy

            // Bước 3: Project để tính tỷ lệ hủy
            AggregationOperation projectCancelRate = Aggregation.project("totalTickets", "canceledTickets")
                    .andExpression("canceledTickets / totalTickets * 100").as("cancelRate"); // Tính tỷ lệ hủy (%)

            // Bước 4: Tạo aggregation pipeline
            Aggregation aggregation = Aggregation.newAggregation(unwindTickets, groupByAll, projectCancelRate);

            // Bước 5: Thực thi aggregation
            AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "flights", Map.class);

            // Lấy kết quả duy nhất
            Map<String, Object> result = results.getUniqueMappedResult();

            if (result != null) {
                // Chuyển đổi kết quả thành đối tượng CancellationRate
                CancellationRate cancellationRate = new CancellationRate();
                cancellationRate.setTotalTickets((Integer) result.get("totalTickets"));
                cancellationRate.setCancelledTickets((Integer) result.get("canceledTickets"));
                cancellationRate.setCancelRate((Double) result.get("cancelRate"));

                // Gắn dữ liệu vào response
                response.setStatus(200);
                response.setMessage("Thống kê tỷ lệ vé bị hủy thành công");
                response.setData(cancellationRate);
            } else {
                response.setStatus(404);
                response.setMessage("Không có dữ liệu vé để thống kê");
            }

        } catch (Exception e) {
            response.setStatus(500);
            response.setMessage("Đã xảy ra lỗi: " + e.getMessage());
        }

        return response;
    }

    public MyResponse<List<AirportsToBeReached>> top5MostVisitedAirports() {
        MyResponse<List<AirportsToBeReached>> response = new MyResponse<>();
        Aggregation aggregation = Aggregation.newAggregation(
                // unwind tickets
                Aggregation.unwind("tickets"),
                // group by departure.airfieldName
                Aggregation.group("departure.airfieldName").count().as("totalBookings"),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "totalBookings")),
                Aggregation.limit(5));

        AggregationResults<AirportsToBeReached> result = mongoTemplate.aggregate(aggregation, "flights",
                AirportsToBeReached.class);
        List<AirportsToBeReached> top5MostVisitedAirports = result.getMappedResults();
        response.setStatus(200);
        response.setMessage("Thống kê 5 sân bay được đến nhiều nhất thành công");
        response.setData(top5MostVisitedAirports);
        return response;
    }

    public MyResponse<String> payTicket(String email, String flightCode, String ticketId, Payment payment) {
        MyResponse<String> response = new MyResponse<>();

        Optional<Flight> flightOptional = flightRepository.findByFlightCode(flightCode);
        if (!flightOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy chuyến bay");
            return response;
        }
        Flight flight = flightOptional.get();
        Optional<Ticket> ticketOptional = flight.getTickets().stream().filter(t -> t.getTicketId().equals(ticketId))
                .findFirst();
        if (!ticketOptional.isPresent()) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy vé");
            return response;
        }
        Ticket ticket = ticketOptional.get();
        if (!ticket.getContactInfo().getEmail().equals(email)) {
            response.setStatus(403);
            response.setMessage("Không thể thanh toán vé của người khác");
            return response;
        }
        if (ticket.isCanceled()) {
            response.setStatus(400);
            response.setMessage("Vé đã hủy không thể thanh toán");
            return response;
        }
        if (ticket.isConfirmed()) {
            response.setStatus(400);
            response.setMessage("Vé đã xác nhận không thể thanh toán");
            return response;
        }

        payment.setPaymentId(TourUtils.generatePaymentId(email));
        payment.setPaymentDate(new Date());

        ticket.setPayment(payment);
        flightRepository.save(flight);

        response.setStatus(200);
        response.setMessage("Thanh toán vé thành công");
        response.setData(ticket.getTicketId());
        return response;
    }

    public MyResponse<Double> revenueByNDays(int days) {
        MyResponse<Double> response = new MyResponse<>();
        LocalDate numberDaysAgo = LocalDate.now().minusDays(days);
        Date numberDaysAgoDate = Date.from(numberDaysAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("tickets"),
                // Chỉ lấy những vé đã xác nhận
                Aggregation.match(Criteria.where("tickets.bookingDate").gte(numberDaysAgoDate)
                        .and("tickets.confirmed").is(true)),

                Aggregation.group().sum("tickets.totalPrice").as("totalRevenue"));

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "flights", Document.class);
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

    public MyResponse<Integer> countBookedTicketsByNDays(int days) {
        MyResponse<Integer> response = new MyResponse<>();
        LocalDate numberDaysAgo = LocalDate.now().minusDays(days);
        Date numberDaysAgoDate = Date.from(numberDaysAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("tickets"),
                Aggregation.match(Criteria.where("tickets.bookingDate").gte(numberDaysAgoDate)),
                Aggregation.group().count().as("totalBookedTickets"));

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "flights", Document.class);
        Document result = results.getUniqueMappedResult();
        if (result == null) {
            response.setStatus(404);
            response.setMessage("Không lấy được số vé đã đặt");
        } else {
            int totalBookedTickets = result.getInteger("totalBookedTickets");
            response.setStatus(200);
            response.setMessage("Số vé đã đặt trong " + days + " ngày gần nhất là: " + totalBookedTickets);
            response.setData(totalBookedTickets);
        }
        return response;
    }

    public MyResponse<AppUser> mostBookingCustomerByNDays(int n) {
        MyResponse<AppUser> response = new MyResponse<>();

        LocalDate numberDaysAgo = LocalDate.now().minusDays(n);
        Date numberDaysAgoDate = Date.from(numberDaysAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());

        Query query = new Query();
        query.addCriteria(Criteria.where("flightBookings.bookingDate").gte(numberDaysAgoDate));
        query.with(Sort.by(Sort.Order.desc("flightBookings.bookingDate")));
        query.limit(1);
        AppUser user = mongoTemplate.findOne(query, AppUser.class);
        if (user == null) {
            response.setStatus(404);
            response.setMessage("Không tìm thấy người dùng");
        } else {
            response.setStatus(200);
            response.setMessage("Người dùng đặt vé nhiều nhất trong " + n + " ngày gần nhất");
            response.setData(user);
        }
        return response;
    }

}
