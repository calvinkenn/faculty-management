import React from "react";

import EducationalItem from "./EducationalItem";
import "./EducationalList.css";
import noData from "../../../assets/Image/no-data-found.png";

const EducationalList = (props) => {
  if (props.userData.length === 0) {
    return <div className="no-data-found">
        <img src={noData} />
        <h1>No Educational Background Found</h1>
    </div>;
  }
  return (
    <div className="educational-list">
      {props.userData
        ?.sort((a, b) => (a.sorting > b.sorting ? 1 : -1))
        .map((item) => (
          <EducationalItem
            setUserData={props.setUserData}
            setIsEditModeHandler={props.setIsEditModeHandler}
            level={item.level}
            school={item.school}
            degree={item.degree}
            from={item.fromDate}
            yearGraduated={item.yearGraduated}
            highestLevel={item.highestLevel}
            to={item.toDate}
            awards={item.awards}
            educId={item._id}
          />
        ))}
    </div>
  );
};

export default EducationalList;
