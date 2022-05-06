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
        <div className="employment-acc-info-cont">
          <div className="employment-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Employment Account Information</h1>
            </div>
          </div>
          <div className="employment-detail-cont">
            <div>Employee Number: {props.employeeNum}</div>
            <div>Faculty: {props.faculty ? props.faculty : "N/A"}</div>
            <div>
              Employment Type:{" "}
              {props.employmentType ? props.employmentType : "N/A"}
            </div>
          </div>
        </div>
        <div className="account-info-cont">
          <div className="account-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Account Information</h1>
            </div>
          </div>
          <div className="account-info-detail-cont">
            <div>Email: {props.email}</div>
            {!auth.isAdmin && (
              <div className="change-pass-cont">
                Password: ************
                <div className="change-btn-cont">
                  <Button onClick={changePassHandler}>Change Password</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoItem;
