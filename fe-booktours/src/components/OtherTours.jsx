import React, { useEffect, useState } from "react";
import TourService from "../services/TourService";
import formatPrice from "../utils/format-price";
import TourCard3 from "./TourCard3";

const OtherTours = (props) => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await TourService.getTours({
          region: "",
          location: "",
          tourType: null,
          vehicle: null,
          sortBy: "price",
          sortType: props.sortType,
          page: 1,
          limit: 4,
        });
        // console.log(response);
        setTours(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTours();
  }, []);
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tours?.map((tour) => (
        <TourCard3 key={tour.tourId} tour={tour} />
      ))}
    </div>
  );
};

export default OtherTours;
