import React from "react";

import CivilServiceItem from "./CivilServiceItem";
import "./CivilServiceList.css";

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0, 4),
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
};
const CivilServiceList = (props) => {

  if (props.items.length === 0){
    return <div>no civil service/s found.</div>
  }
  return (

    <div className="training-list">
      {props.items.map((item) => (
        <CivilServiceItem
          setUserData = {props.setUserData}
          setIsEditModeHandler={props.setIsEditModeHandler}
          career={item.career}
          rating={item.rating}
          date={formatDate(item.date.substring(0, 10))}
          examPlace={item.placeOfExam}
          licenseNumber={item.licenseNumber}
          licenseValidity={formatDate(item.licenseValidity.substring(0, 10))}
          civilId = {item._id}
        />
      ))}
    </div>
  );
};

export default CivilServiceList;
