import React from "react";

export default function Pagination(props) {
  return (
    <nav
      className="mt-5 rounded-lg bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Hiển thị bản ghi thứ
          <span className="font-medium">
            {" "}
            {(props.page - 1) * props.limit + 1}
          </span>{" "}
          đến <span className="font-medium">{props.page * props.limit}</span>
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          onClick={props.onPrevious}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Trước
        </button>
        <button
          onClick={props.onNext}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Sau
        </button>
      </div>
    </nav>
  );
}
