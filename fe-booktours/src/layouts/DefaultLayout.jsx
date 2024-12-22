import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="font-roboto bg-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
