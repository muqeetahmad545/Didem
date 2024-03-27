import React, { useState } from "react";
import "./Layout.scss";

import Left_Side_Bar from "../../components/left_side_bar/Left_Side_Bar";
import NavBar from "../../components/navBar/NavBar";
import RightSideBar from "../../components/rightBar/RightSideBar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="Layout">
      {/* Left side bar component */}
      <div className="LeftSideBar">
        <Left_Side_Bar />
      </div>
      {/* Navigation bar component */}
      <div className="menu">
        <NavBar />
      </div>
      {/* Body content for the layout */}
      <div className="Layoutbody">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
