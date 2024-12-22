package com.spring.be_booktours.repositories;

import java.util.Date;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.spring.be_booktours.entities.views.totalBookedOf7Days;

public interface totalBookedOf7DaysRepository extends MongoRepository<totalBookedOf7Days, Date> {

}
