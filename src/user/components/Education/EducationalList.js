import React from "react";

import EducationalItem from "./EducationalItem";
import "./EducationalList.css";

const EducationalList = (props) => {
  return (
    <div className="educational-list">
      {props.items.map((item) => (
        <EducationalItem
          level={item.level}
          schoolName={item.schoolName}
          degree={item.degree}
          from={item.from}
          to={item.to}
          yearGraduated={item.yearGraduated}
          awards={item.awards}
        />
      ))}
    </div>
  );
};

export default EducationalList;
