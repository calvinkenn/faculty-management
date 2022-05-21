import React from "react";

import WorkExperienceItem from "./WorkExperienceItem";
import "./WorkExperienceList.css";
import noData from "../../../assets/Image/no-data-found.png";

const WorkExperienceList = (props) => {
  if (props.items?.length === 0) {
    return <div className="no-data-found">
      <img src={noData} />
      <h1>No Work Experiences Found</h1>
    </div>;
  }
  return (
    <div className="work-list">
      {props.items
        ?.sort((a, b) => (a.toDate < b.toDate ? 1 : -1))
        .map((item) => (
          <WorkExperienceItem
            setUserData={props.setUserData}
            setIsEditModeHandler={props.setIsEditModeHandler}
            company={item.company}
            position={item.position}
            department={item.department}
            statusOfAppointment={item.statusOfAppointment}
            fromDate={item.fromDate}
            toDate={item.toDate}
            monthlySalary={item.monthlySalary}
            salaryGrade={item.salaryGrade}
            salaryStep={item.salaryStep}
            government={item.government}
            workId={item._id}
          />
        ))}
    </div>
  );
};

export default WorkExperienceList;
