import React, { useState } from "react";

import "../item.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import profilePic from "../../../assets/Image/Qw.png";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DeactivatedItem = (props) => {
  const { isLoading, error, success, sendRequest } = useHttpClient();
  //handler for account approval
  const userApproveHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/actionHandler",
        "PATCH",
        JSON.stringify({
          userId: event.target.userId.value,
          permissionUpdate: "accepted",
        }),
        { "Content-Type": "application/json" }
      );
      props.updateDeactivatedUsers(
        responseData.pendingUsers,
        responseData.permission
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <div className="faculty-card-container">
          {/* <div className="container__image">
            <img
              src={
                props.profilePic !== ""
                  ? `http://localhost:5000/${props.profilePic}`
                  : profilePic
              }
              alt={props.firstName}
            />
          </div> */}
          <div className="faculty-details-cont">
            <div className="faculty-name-email-cont">
              <div>
                <h2>{props.firstName}</h2>
              </div>
              <span />
              <div>
                <h2>{props.lastName}</h2>
              </div>
              <span />
              <div className="email-cont">
                <ArrowBackIosIcon sx={{fontSize: '12px'}}/>
                  {props.email}
                <ArrowForwardIosIcon sx={{fontSize: '12px'}}/>
              </div>
            </div>
            <div className="employeenum-fac-type">
              <div className="employee-num">
                <h4>{props.employeeNum}</h4>
                <h6>Employee Number</h6>
              </div>
              <span />
              <div className="fac-dept">
                <h4>{props.faculty ? props.faculty : "N/A"}</h4>
                <h6>Department</h6>
              </div>
              <span />
              <div className="emp-status">
                <h4>
                  {" "}
                  {props.employmentType ? props.employmentType : "N/A"}
                </h4>
                <h6>Employment Status</h6>
              </div>
              <div className="date-of-reg">
                <h4>
                  {" "}
                  {props.dateOfRegistration ? props.dateOfRegistration : "N/A"}
                </h4>
                <h6>Date of Registration</h6>
              </div>
            </div>
          </div>
        <div className="container__actions">
          <form onSubmit={userApproveHandler}>
            <input type="hidden" value={props.id} name="userId"></input>
            <Button type="submit"><h4><ChangeCircleIcon sx={{fontSize: '40px'}}/></h4></Button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default DeactivatedItem;
