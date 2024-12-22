import React, { useState, useEffect, useRef } from "react";

function MultiRefComponent() {
  const [visibleSections, setVisibleSections] = useState([]);
  const refs = useRef([]);

  const sections = ["Section 1", "Section 2", "Section 3"]; // Ví dụ 3 phần tử

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, index]);
            observer.unobserve(entry.target); // Ngắt kết nối sau khi phần tử vào màn hình
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => (refs.current[index] = el)} // Gán ref cho mỗi phần tử
          className={`transition-all duration-1000 transform ${
            visibleSections.includes(index)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {section}
        </div>
      ))}
    </div>
  );
}

export default MultiRefComponent;
