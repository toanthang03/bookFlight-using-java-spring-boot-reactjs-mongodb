import React from 'react'
import { Link } from 'react-router-dom'
import formatPrice from '../utils/format-price'
import { SearchIcon } from '@heroicons/react/solid'

const TourCard3 = (props) => {
  return (
    <div className=" bg-white font-roboto border border-solid rounded-lg p-3 shadow-md group grid grid-cols-1 md:gap-1 gap-2">
      <div className="md:col-span-2 w-full h-40 md:h-56 overflow-hidden rounded-lg my-auto">
        <img
          src={props.tour?.image}
          alt="Hình ảnh"
          srcSet=""
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="md:col-span-3 px-3 mx-auto">
        <div className="flex mt-1">
          <div className="border border-solid flex text-base bg-gray-100 rounded-lg text-gray-500 px-2 font-medium">
            <span className="m-auto">
              {props.tour?.location?.locationName}
            </span>
          </div>
          <div className="ml-auto flex text-base bg-rose-400 rounded-lg text-white px-2 font-medium">
            <span className="m-auto">{props.tour?.tourType}</span>
          </div>
        </div>
        <h3 className="mt-2 line-clamp-1 text-2xl font-bold">
          {props.tour?.tourName}
        </h3>
        <p className="mt-2 line-clamp-2">{props.tour?.description}</p>
        <div className="mt-2">
          Thời gian:{" "}
          {props.tour?.itineraries?.length > 1 ? (
            <span className="text-sky-700">
              {props.tour?.itineraries?.length}N
              {props.tour?.itineraries?.length - 1}Đ
            </span>
          ) : (
            <span className="text-sky-700">Trong ngày</span>
          )}
        </div>
        <div className="mt-2">
          Phương tiện:{" "}
          <span className="text-sky-700">{props.tour?.vehicle}</span>
        </div>
        <div className="flex">
          {props.tour?.bookTours?.length > 0 && (
            <div className="mt-2">
              Lượt đặt tour:{" "}
              <span className="text-xl text-red-500">
                {props.tour?.bookTours?.length}
              </span>
            </div>
          )}
          {props.tour?.reviews?.length > 0 && (
            <div className="ml-auto mt-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-gray-600 font-bold text-sm ml-1">
                {props.tour?.reviews?.reduce(
                  (acc, review) => acc + review.rating,
                  0
                ) / props.tour?.reviews?.length}
                <span className="text-gray-500 font-normal">
                  ({props.tour?.reviews?.length} đánh giá)
                </span>
              </p>
            </div>
          )}{" "}
        </div>
          <div className="my-auto">
            Giá từ:{" "}
            <span className="text-3xl font-extrabold text-rose-600">
              {formatPrice(props.tour?.price)}
            </span>
            /khách
          </div>
          <Link
            to={`/tour-detail/${props.tour?.tourId}`}
            className="my-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Xem chi tiết
          </Link>
      </div>
    </div>
  )
}

export default TourCard3