import React from "react";

import WorkExperienceItem from "./WorkExperienceItem";
import "./WorkExperienceList.css";

const WorkExperienceList = (props) => {
  return (
    <div className="work-list">
      {props.items.map((item) => (
        <WorkExperienceItem
          setIsEditModeHandler={props.setIsEditModeHandler}
          company={item.company}
          position={item.position}
          department={item.department}
          from={item.from}
          to={item.to}
          monthlySalary={item.monthlySalary}
          salaryGrade={item.salaryGrade}
          salaryStep={item.salaryStep}
          status={item.status}
          governmentService={item.governmentService}
        />
      ))}
    </div>
  );
};

export default WorkExperienceList;
