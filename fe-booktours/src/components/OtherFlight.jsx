import React, { useEffect, useState } from "react";
import FlightService from "../services/FlightService";
import FlightCard from "./FlightCard";
import { useNavigate } from "react-router-dom";

const OtherFlight = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await FlightService.getFlights({
          departure: "HAN",
          destination: "SGN",
          airline: "",
          departureDate: "2024-01-01",
          minPrice: 0,
          maxPrice: 999999999,
          cancelable: "",
          active: "active",
          sortBy: "price",
          sortType: "asc",
          page: 1,
          limit: 5,
        });
        // console.log(response.data);
        setFlights(response.data);
        setSelectedFlight(-1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlights();
  }, []);
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {flights?.map((flight) => (
        <FlightCard
          key={flight.flightCode}
          flight={flight}
          onClick={() => navigate(`/flights?departure=HAN&destination=SGN`)}
        />
      ))}
    </div>
  );
};

export default OtherFlight;
