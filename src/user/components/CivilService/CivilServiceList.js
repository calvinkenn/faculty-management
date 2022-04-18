import React from "react";

import CivilServiceItem from "./CivilServiceItem";
import "./CivilServiceList.css";

const CivilServiceList = (props) => {
  return (
    <div className="training-list">
      {props.items.map((item) => (
        <CivilServiceItem
          career={item.career}
          rating={item.rating}
          date={item.date}
          examPlace={item.examPlace}
          licenseNumber={item.licenseNumber}
          licenseValidity={item.licenseValidity}
        />
      ))}
    </div>
  );
};

export default CivilServiceList;
