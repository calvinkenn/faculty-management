import React from "react";

import cictLogo from "../../../assets/Image/print-header.png";
import "./PrintHeader.css";

const PrintHeader = (props) => {
  return (
    <div className="print-header">
      <div className="image-container">
        <img src={cictLogo} alt="cict-logo" />
      </div>
      <div className="heading-container">
        <div>
          <p className="b-1">Bulacan State University </p>
          <p className="b-2">COLLEGE OF INFORMATION AND </p>
          <p className="b-2">COMMUNICATIONS TECHNOLOGY </p>
          <p className="b-1">Guinhawa City of Malolos</p>
        </div>
      </div>
    </div>
  );
};

export default PrintHeader;
