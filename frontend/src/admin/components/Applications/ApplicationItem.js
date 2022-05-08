import React, { useState } from "react";

import "../item.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const ApplicationItem = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();
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
      props.updatePendingUsers(
        responseData.pendingUsers,
        responseData.permission
      );
    } catch (err) {}
  };
  //handler for account rejection
  const userRejectHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/actionHandler",
        "PATCH",
        JSON.stringify({
          userId: event.target.userId.value,
          permissionUpdate: "rejected",
        }),
        { "Content-Type": "application/json" }
      );
      props.updatePendingUsers(
        responseData.pendingUsers,
        responseData.permission
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card>
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
        <div className="approve-btn">
          <form onSubmit={userApproveHandler}>
            <input type="hidden" value={props.id} name="userId"></input>
            <Button type="submit"><h5><CheckCircleIcon sx={{fontSize: '40px'}}/></h5></Button>
          </form>
        </div>
        <span />
        <div className="reject-btn">
          <form onSubmit={userRejectHandler}>
            <input type="hidden" value={props.id} name="userId"></input>
            <Button danger type="submit">
              <h5><CancelIcon sx={{fontSize: '40px'}}/></h5>
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default ApplicationItem;
