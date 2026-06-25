import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="bebas">
      <Navbar> </Navbar>
      <div className="max-w-7xl mx-auto my-2 md:my-4 lg:my-8">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
