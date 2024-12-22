package com.spring.be_booktours.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.be_booktours.entities.Flight;

@Repository
public interface FlightRepository extends MongoRepository<Flight, String> {
    Optional<Flight> findByFlightCode(String flightCode);

    // Tìm chuyến bay theo tên sân bay đi và tên sân bay đến
    List<Flight> findByAirlineAirlineIdAndDepartureAirfieldIdAndDestinationAirfieldId(String airlineAirlineId,
            String departureAirfieldId,
            String destinationAirfieldId);

}
