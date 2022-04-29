import React, { useContext } from "react";

import Button from "../../../shared/components/FormElements/Button";
import { AuthContext } from "../../../shared/context/auth-context";
import profilePic from "../../../assets/Image/Qw.png";
import "./AccountInfoItem.css";

const AccountInfoItem = (props) => {
  const auth = useContext(AuthContext);
  const changePassHandler = () => {
    props.changePasswordHandler();
  };

  return (
    <div className="account-container">
      <div className="account-container__data">
        <div className="account-container__image">
          <img
            src={
              props.profilePic !== ""
                ? `http://localhost:5000/${props.profilePic}`
                : profilePic
            }
            alt="profile-pic"
          />
        </div>
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
