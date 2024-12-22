import React from 'react'
import { LocationData } from '../../statics/datas/LocationData';
import { Link } from 'react-router-dom';

const locations = LocationData;
const HotelLocationList = () => {
  return (
    <div className="mt-10 p-5">
          <h1 className="text-3xl font-bold">
            Khám phá khách sạn các khu vực ở Việt Nam
          </h1>
          <div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-2">
            {locations.map((location, index) => (
              <div key={index} className="flex">
                <Link
                  to="#"
                  className="text-sm hover:underline text-blue-500 font-medium"
                >
                  {location.locationName}
                </Link>
                <span className="text-sm ml-auto font-medium">
                  {location.regionName}
                </span>
              </div>
            ))}
          </div>
        </div>
  )
}

export default HotelLocationList