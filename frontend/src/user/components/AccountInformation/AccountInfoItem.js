import React from "react";

import Button from "../../../shared/components/FormElements/Button";
import "./AccountInfoItem.css";

const AccountInfoItem = (props) => {
  return (
    <div className="account-container">
      <div className="account-container__data">
        <div>Employee Number: {props.employeeNum}</div>
        <div>Faculty: {props.faculty}</div>
        <div>Employment Type: {props.employmentType}</div>
        <div>Email: {props.email}</div>
        <div>Password: ************</div>
      </div>
    </div>
  );
};

export default AccountInfoItem;
