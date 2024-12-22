import React, { useEffect, useRef, useState } from "react";

const Ref = () => {
  const divRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Ngắt kết nối sau khi xuất hiện lần đầu
          }
        });
      },
      { threshold: 0.1 } // Tùy chọn độ rộng của phần tử cần hiển thị
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => {
      if (observer && divRef.current) observer.unobserve(divRef.current);
    };
  }, []);
  return (
    <div
      ref={divRef}
      className={`transition-all duration-700 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      Nội dung xuất hiện từ dưới lên
    </div>
  );
};

export default Ref;
