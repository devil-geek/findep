import React from "react";
import Helmet from "./helmet";

const Layout = ({ children }) => (
  <div className="container">
    <Helmet />
    <div id="main">
      {children}
    </div>
  </div>
);

export default Layout;
