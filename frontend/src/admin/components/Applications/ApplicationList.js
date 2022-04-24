import React from "react";

import ApplicationItem from "./ApplicationItem";
import "./ApplicationList.css";

const ApplicationList = (props) => {
  if(props.list.length === 0){
    return <div>No pending users found</div>
  }
  return (
    <div className="application-list">
      {props.list.map((application) => (
        <ApplicationItem
          employeeNum={application.employeeNum}
          firstName={application.firstName}
          lastName={application.lastName}
          date={application.date}
          id = {application._id}
          updatePendingUsers = {props.updatePendingUsers}
        />
      ))}
    </div>
  );
};

export default ApplicationList;
