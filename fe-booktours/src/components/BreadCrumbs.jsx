import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];

const BreadCrumbs = (props) => {
  return (
    <nav className="flex py-5" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {props.pages?.map((page, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Link
                to={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
        {props.other && (
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <p className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                {props.other}
              </p>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
