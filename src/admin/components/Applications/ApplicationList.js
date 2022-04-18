import React from "react";

import ApplicationItem from "./ApplicationItem";
import "./ApplicationList.css";

const ApplicationList = (props) => {
  return (
    <div className="application-list">
      {props.list.map((application) => (
        <ApplicationItem
          employeeNum={application.employeeNum}
          firstName={application.firstName}
          lastName={application.lastName}
          date={application.date}
        />
      ))}
    </div>
  );
};

export default ApplicationList;
