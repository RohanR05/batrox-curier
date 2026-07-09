import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="bebas">
      <Navbar> </Navbar>
      <div className="max-w-7xl mx-auto my-22 md:my-26">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
