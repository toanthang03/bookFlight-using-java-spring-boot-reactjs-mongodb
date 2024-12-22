import React from "react";

const SettingNavigation = (props) => {
  return (
    <aside className="py-6 lg:col-span-3">
      <nav className="space-y-1">
        {props.navigations?.map((item, index) => (
          <p
            key={index}
            className={`${
              index === props.navActive
                ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900"
            } group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer`}
            aria-current={item.current ? "page" : undefined}
            onClick={() => props.setNavActive(index)}
          >
            <item.icon
              className={`${
                index === props.navActive
                  ? "text-teal-500 group-hover:text-teal-500"
                  : "text-gray-400 group-hover:text-gray-500"
              } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </p>
        ))}
      </nav>
    </aside>
  );
};

export default SettingNavigation;
