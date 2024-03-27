import React from "react";
import "./CaseLeft.scss";

const CaseLeft = (props) => {
  return (
    <div className="left">
      {/* Render the case information received as a prop. */}
      <span>{props.case}</span>
    </div>
  );
};

export default CaseLeft;
