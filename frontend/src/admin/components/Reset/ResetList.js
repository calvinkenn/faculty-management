import React from "react";

import ResetItem from "./ResetItem";
import "../list.css";

const ResetList = (props) => {
  if (props.list?.length === 0) {
    return <div>No users requesting password reset found</div>;
  }
  return (
    <div className="list">
      {props.list?.map((reset) => (
        <ResetItem
          userId={reset._id}
          employeeNum={reset.employeeNum}
          firstName={reset.firstName}
          lastName={reset.lastName}
          email={reset.email}
          reset={reset.faculty}
          employmentType={reset.employmentType}
          updateResetUsers={props.updateResetUsers}
          profilePic={reset.profilePic}
          id={reset._id}
        />
      ))}
    </div>
  );
};

export default ResetList;
