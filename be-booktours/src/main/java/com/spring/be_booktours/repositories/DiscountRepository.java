package com.spring.be_booktours.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.spring.be_booktours.entities.Discount;

@Repository
public interface DiscountRepository extends MongoRepository<Discount, String> {
    List<Discount> findByDiscountType(String discountType);
}
