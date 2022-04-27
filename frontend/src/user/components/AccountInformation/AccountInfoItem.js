import React, { useContext } from "react";

import Button from "../../../shared/components/FormElements/Button";
import { AuthContext } from "../../../shared/context/auth-context";
import "./AccountInfoItem.css";

const AccountInfoItem = (props) => {
  const auth = useContext(AuthContext);
  const changePassHandler = () => {
    props.changePasswordHandler();
  };

  return (
    <div className="account-container">
      <div className="account-container__data">
        <div>Employee Number: {props.employeeNum}</div>
        <div>Faculty: {props.faculty}</div>
        <div>Employment Type: {props.employmentType}</div>
        <div>Email: {props.email}</div>
        {!auth.isAdmin && (
          <div>
            Password: ************
            <Button onClick={changePassHandler}>Change Pass</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInfoItem;
