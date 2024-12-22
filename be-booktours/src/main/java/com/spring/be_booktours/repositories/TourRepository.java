package com.spring.be_booktours.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.spring.be_booktours.entities.Tour;

@Repository
public interface TourRepository extends MongoRepository<Tour, String> {
}
