package com.spring.be_booktours.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.be_booktours.entities.AirportTransfer;

@Repository
public interface AirportTransferRepository extends MongoRepository<AirportTransfer, String> {
    List<AirportTransfer> findByAirfieldAirfieldId(String airfieldId);
}
