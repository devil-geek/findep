import React from "react";
import Helmet from "./helmet";
import Contact from "../components/contact";
import Footer from "../components/footer";

const Layout = ({ children }) => (
  <div className="container">
    <Helmet />
    <div id="main">{children}</div>
    <Contact />
    <Footer />
  </div>
);

export default Layout;
