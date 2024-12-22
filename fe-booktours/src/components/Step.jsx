import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const steps = [
  { id: "01", name: "Cung cấp thông tin" },
  { id: "02", name: "Thanh toán" },
  { id: "03", name: "Hoàn tất" },
];

const Step = (props) => {
  return (
    <nav aria-label="Progress" className="my-10">
      <ol
        role="list"
        className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0"
      >
        {steps.map((step, index) => (
          <li key={step.name} className="relative md:flex-1 md:flex">
            {index < props.currentStep - 1 ? (
              <Link to={step.href} className="group flex items-center w-full">
                <span className="px-6 py-4 flex items-center text-sm font-medium">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-sky-600 rounded-full group-hover:bg-sky-800">
                    <CheckIcon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {step.name}
                  </span>
                </span>
              </Link>
            ) : index === props.currentStep - 1 ? (
              <Link
                to={step.href}
                className="px-6 py-4 flex items-center text-sm font-medium"
                aria-current="step"
              >
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-sky-600 rounded-full">
                  <span className="text-sky-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-sky-600">
                  {step.name}
                </span>
              </Link>
            ) : (
              <Link to={step.href} className="group flex items-center">
                <span className="px-6 py-4 flex items-center text-sm font-medium">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                    {step.name}
                  </span>
                </span>
              </Link>
            )}

            {index !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className="hidden md:block absolute top-0 right-0 h-full w-5"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Step;
