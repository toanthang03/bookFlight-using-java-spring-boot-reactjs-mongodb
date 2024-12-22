package com.spring.be_booktours.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.be_booktours.entities.Hotel;

@Repository
public interface HotelRepository extends MongoRepository<Hotel, String>{
    Optional<Hotel> findByHotelCode(String hotelCode);
}
