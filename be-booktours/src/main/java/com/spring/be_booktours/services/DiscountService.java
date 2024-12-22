package com.spring.be_booktours.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.spring.be_booktours.dtos.MyResponse;
import com.spring.be_booktours.entities.Discount;
import com.spring.be_booktours.entities.Tour;
import com.spring.be_booktours.repositories.DiscountRepository;
import com.spring.be_booktours.repositories.TourRepository;

@Service
public class DiscountService {
    @Autowired
    private DiscountRepository discountRepository;
    // @Autowired
    // private MongoTemplate mongoTemplate;
    @Autowired
    private TourRepository tourRepository;

    public MyResponse<List<Discount>> getAllDiscounts() {
        MyResponse<List<Discount>> response = new MyResponse<>();
        List<Discount> discounts = discountRepository.findAll();
        response.setStatus(200);
        response.setMessage("Lấy danh sách giảm giá thành công");
        response.setData(discounts);
        return response;
    }

    public MyResponse<?> applyToAllTours(Discount discount) {
        MyResponse<?> response = new MyResponse<>();
        List<Tour> tours = tourRepository.findAll();
        tours.forEach(
            tour -> {
                tour.setDiscount(discount);
                tourRepository.save(tour);
            }
        );
        response.setStatus(200);
        response.setMessage("Áp dụng giảm giá cho tất cả tour thành công");
        return response;
    }

    public MyResponse<Discount> createDiscount(Discount discount) {
        MyResponse<Discount> response = new MyResponse<>();
        Discount newDiscount = discountRepository.save(discount);
        response.setStatus(200);
        response.setMessage("Lưu giảm giá thành công");
        response.setData(newDiscount);
        return response;
    }

    public MyResponse<?> deleteDiscount(String discountId) {
        MyResponse<?> response = new MyResponse<>();
        discountRepository.deleteById(discountId);
        response.setStatus(200);
        response.setMessage("Xóa giảm giá thành công");
        return response;
    }
}
