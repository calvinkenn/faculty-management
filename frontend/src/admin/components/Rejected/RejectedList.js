import React from "react";

import RejectedItem from "./RejectedItem";
import "../list.css";

const RejectedList = (props) => {
  if (props.list?.length === 0) {
    return <div>No rejected users found</div>;
  }
  return (
    <div className="list">
      {props.list
        ?.sort((a, b) => (a[props.sortedData] < b[props.sortedData] ? 1 : -1))
        .map((application) => (
          <RejectedItem
            employeeNum={application.employeeNum}
            firstName={application.firstName}
            lastName={application.lastName}
            email={application.email}
            id={application._id}
            updateRejectedUsers={props.updateRejectedUsers}
          />
        ))}
    </div>
  );
};

export default RejectedList;
