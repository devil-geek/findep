import React from "react";
import Helmet from "./helmet";
import Contact from "../components/contact";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Layout = ({ children, location, active }) => {
  return (
    <div className="container">
      <Helmet />
      <div id="main">
        <Navbar active={active} location={location} />
        {children}
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Layout;
