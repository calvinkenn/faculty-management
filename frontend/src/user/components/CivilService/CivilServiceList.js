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

const formatDateLong = (date) => {
  const formatter = new Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const month1 = formatter.format(new Date(date));
  return month1;
};

const CivilServiceList = (props) => {
  if (props.items?.length === 0) {
    return <div>no civil service/s found.</div>;
  }
  return (
    <div className="training-list">
      {props.items?.map((item) => (
        <CivilServiceItem
          setUserData={props.setUserData}
          setIsEditModeHandler={props.setIsEditModeHandler}
          career={item.career}
          rating={item.rating}
          date={formatDateLong(item.date)}
          examPlace={item.placeOfExam}
          licenseNumber={item.licenseNumber}
          licenseValidity={
            item.licenseValidity !== null
              ? formatDateLong(item.licenseValidity)
              : "N/A"
          }
          civilId={item._id}
        />
      ))}
    </div>
  );
};

export default CivilServiceList;
