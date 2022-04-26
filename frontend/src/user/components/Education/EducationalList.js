import React from "react";

import EducationalItem from "./EducationalItem";
import "./EducationalList.css";

const EducationalList = (props) => {

  if(props.userData.length === 0){
    return <div>no education found</div>
  }
  return (
    <div className="educational-list">
      {props.userData.map((item) => (
        <EducationalItem
          setIsEditModeHandler={props.setIsEditModeHandler}
          level={item.level}
          school={item.school}
          degree={item.degree}
          from={item.fromDate}
          address = {item.address}
          to={item.toDate}
          awards = {item.awards}
          educId = {item._id}
        />
      ))}
    </div>
  );
};

export default EducationalList;
