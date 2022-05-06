import React from "react";

import ApplicationItem from "./ApplicationItem";
import "../list.css";

const ApplicationList = (props) => {
  if (props.list?.length === 0) {
    return <div>No pending users found</div>;
  }

  return (
    <div className="list">
      {props.list
        ?.sort((a, b) => (a[props.sortedData] < b[props.sortedData] ? 1 : -1))
        .map((application) => (
          <ApplicationItem
            employeeNum={application.employeeNum}
            firstName={application.firstName}
            lastName={application.lastName}
            email={application.email}
            id={application._id}
            updatePendingUsers={props.updatePendingUsers}
          />
        ))}
    </div>
  );
};

export default ApplicationList;
