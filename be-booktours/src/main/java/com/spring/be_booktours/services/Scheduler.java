package com.spring.be_booktours.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.spring.be_booktours.entities.Flight;
import com.spring.be_booktours.entities.flight_entities.Schedule;
import com.spring.be_booktours.repositories.FlightRepository;

@Service
public class Scheduler {

    Logger logger = Logger.getLogger(Scheduler.class.getName());

    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private FlightService flightService;
    @Autowired
    private DataService dataService;

    // Back up dữ liệu lúc 9 giờ tối mỗi ngày
    @Scheduled(cron = "0 0 21 * * ?")
    public void backupData() {
        dataService.backupData("D:\\backupmongodb");
        try {
            dataService.backupData("D:\\backupmongodb");
            logger.info("Backup data successfully at " + System.currentTimeMillis());
        } catch (Exception ex) {
            logger.info("Backup data failed at " + System.currentTimeMillis() + "(" + ex.getMessage() + ")");
        }
    }

    // Lập lịch bay tự động vào 10 giờ sáng mỗi ngày
    // @Scheduled(cron = "0 55 10 * * ?")
    // Lập lịch bay tự động vào 0 giờ thứ 2 và thứ 5 hàng tuần
    @Scheduled(cron = "0 0 0 ? * MON,THU")
    public void autoScheduleFlight() {
        List<Flight> flightCodes = flightRepository.findAll();
        for (Flight flight : flightCodes) {
            // Lập lịch bay tự động cho 3 ngày tiếp theo kể từ ngày hiện tại
            LocalDate currentDate = LocalDate.now();
            for (int i = 0; i < 3; i++) {
                Schedule schedule = new Schedule();
                schedule.setDepartureDate(currentDate.plusDays(i));
                // Giờ khởi hành là 10h sáng
                schedule.setDepartureTime(LocalTime.of(10, 30));
                schedule.setDurationHour(2);
                schedule.setDurationMinute(30);
                flightService.addSchedule(flight.getFlightCode(), schedule);
            }
        }
        logger.info("Add schedule to flight succesfully at " + System.currentTimeMillis());
    }

}
