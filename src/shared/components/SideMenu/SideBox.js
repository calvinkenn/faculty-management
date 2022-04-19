import React from "react";

import "./SideBox.css";

const SideBox = (props) => {
  return (
    <div className={`side-header ${props.className}`}>{props.children}</div>
  );
};

export default SideBox;
