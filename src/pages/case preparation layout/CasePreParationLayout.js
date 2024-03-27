import React from "react";
import CaseLeft from "../case presentation/case left bar/CaseLeft";
import "./CasePreParationLayout.scss";

import { Outlet } from "react-router-dom";

const CasePreParationLayout = () => {
  return (
    <div className="CasePreParationLayout">
      <div className="CasePreParationBody">
        {/* The Outlet component is used to render child routes defined in the parent route. */}
        <Outlet />
      </div>
    </div>
  );
};

export default CasePreParationLayout;
