import React from "react";
import Header3 from "../components/Header3";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout3 = () => {
  return (
    <div>
      <Header3 />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout3;
