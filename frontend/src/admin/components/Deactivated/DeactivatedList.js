import React from "react";

import DeactivatedItem from "./DeactivatedItem";
import "../list.css";

const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(0, 4),
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
};

const DeactivatedList = (props) => {
  if (props.list?.length === 0) {
    return <div>No deactivated users found</div>;
  }
  return (
    <div className="list">
      {props.list
        // ?.sort((a, b) => (a[props.sortedData] > b[props.sortedData] ? 1 : -1))
        .map((application) => (
          <DeactivatedItem
            employeeNum={application.employeeNum}
            firstName={application.firstName}
            lastName={application.lastName}
            email={application.email}
            id={application._id}
            employmentType={application.employmentType}
            faculty={application.faculty}
            dateOfRegistration={
              application.dateOfRegistration
                ? formatDate(application.dateOfRegistration.substring(0, 10))
                : ""
            }
            updateDeactivatedUsers={props.updateDeactivatedUsers}
          />
        ))}
    </div>
  );
};

export default DeactivatedList;
