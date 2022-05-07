import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import Card from "../../../shared/components/UIElements/Card";
import Button from "../../../shared/components/FormElements/Button";
import profilePic from "../../../assets/Image/Qw.png";
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import "../item.css";

const FacultyItem = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();

  const userDeactivateHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/actionHandler",
        "PATCH",
        JSON.stringify({
          userId: props.id,
          permissionUpdate: "deactivated",
        }),
        { "Content-Type": "application/json" }
      );
      props.updateActiveUsers(
        responseData.activeUsers,
        responseData.permission
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <div className="faculty-card-container">
        <Link to={`/admin/profile/${props.userId}`}>
          <div className="container__image">
            <img
              src={
                props.profilePic !== ""
                  ? `http://localhost:5000/${props.profilePic}`
                  : profilePic
              }
              alt={props.firstName}
            />
          </div>
          <div className="faculty-details-cont">
            <div className="faculty-name-email-cont">
              <div><h2>{props.firstName}</h2></div><span /><div><h2>{props.lastName}</h2></div><span/><div>{props.email}</div>
            </div>
            <div className="employeenum-fac-type">
              <div>Employee Number: {props.employeeNum}</div>
              <span />
              <div>Faculty: {props.faculty ? props.faculty : "N/A"}</div>
              <span />
              <div>
                Employment Type: {props.employmentType ? props.employmentType : "N/A"}
              </div>
            </div>
          </div>
        </Link>
      </div>
      <Button onClick={userDeactivateHandler}><RemoveCircleOutlineRoundedIcon /></Button>
    </Card>
  );
};

export default FacultyItem;
