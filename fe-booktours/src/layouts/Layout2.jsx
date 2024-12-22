import React, { useEffect, useRef, useState } from "react";
import Header2 from "../components/Header2";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NewLetter from "../components/NewLetter";

const Layout2 = () => {
  return (
    <div className="min-h-full bg-gray-100">
      <Header2 />
      <Outlet />
      <NewLetter />
      <Footer />
    </div>
  );
};

export default Layout2;
