import React from "react";

import WorkExperienceItem from "./WorkExperienceItem";
import "./WorkExperienceList.css";

const WorkExperienceList = (props) => {
  if (props.items?.length === 0) {
    return <div>No work experience/s found.</div>;
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
