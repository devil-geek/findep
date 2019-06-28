import React from "react";

import Helmet from "./helmet";
import Header from "./header";
import Navbar from "./navbar";

const Layout = ({ children }) => (
  <div>
    <Helmet />
    <div id="main">
      <Navbar />
      <Header />
      {children}
    </div>
  </div>
);

export default Layout;
