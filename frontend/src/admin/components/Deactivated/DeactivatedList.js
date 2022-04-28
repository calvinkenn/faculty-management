import React from "react";

import DeactivatedItem from "./DeactivatedItem";
import "../list.css";

const DeactivatedList = (props) => {
  if (props.list.length === 0) {
    return <div>No deactivated users found</div>;
  }
  return (
    <div className="list">
      {props.list.map((application) => (
        <DeactivatedItem
          employeeNum={application.employeeNum}
          firstName={application.firstName}
          lastName={application.lastName}
          email={application.email}
          id={application._id}
          updateDeactivatedUsers={props.updateDeactivatedUsers}
        />
      ))}
    </div>
  );
};

export default DeactivatedList;
