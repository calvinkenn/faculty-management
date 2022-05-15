import React, { useState } from "react";

import Modal from "../../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "../item.css";

const ApplicationItem = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  //handler for account approval
  const userApproveHandler = async (event) => {
    setShowApproveModal(false);
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/actionHandler",
        "PATCH",
        JSON.stringify({
          userId: props.id,
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
    setShowRejectModal(false);
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/actionHandler",
        "PATCH",
        JSON.stringify({
          userId: props.id,
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

  const showRejectWarningHandler = () => {
    setShowRejectModal(true);
  };

  const showApproveHandler = () => {
    setShowApproveModal(true);
  };

  const cancelHandler = () => {
    setShowApproveModal(false);
    setShowRejectModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showApproveModal || showRejectModal}
        onCancel={cancelHandler}
        header={
          showApproveModal ? "Activate this Account?" : "Reject this Account?"
        }
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button
              inverse
              onClick={
                showApproveModal ? userApproveHandler : userRejectHandler
              }
            >
              Yes
            </Button>
            <Button danger onClick={cancelHandler}>
              No
            </Button>
          </React.Fragment>
        }
      >
        {showApproveModal && (
          <p>Do you want to proceed and activate this account?</p>
        )}
        {showRejectModal && (
          <p>Do you want to proceed and reject this account?</p>
        )}
      </Modal>
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
              <ArrowBackIosIcon sx={{ fontSize: "12px" }} />
              {props.email}
              <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
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
              <h4> {props.employmentType ? props.employmentType : "N/A"}</h4>
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
            <input type="hidden" value={props.id} name="userId"></input>
            <Button type="button" onClick={showApproveHandler}>
              <h5>
                <CheckCircleIcon sx={{ fontSize: "40px" }} />
              </h5>
            </Button>
          </div>
          <span />
          <div className="reject-btn">
            <input type="hidden" value={props.id} name="userId"></input>
            <Button danger type="button" onClick={showRejectWarningHandler}>
              <h5>
                <CancelIcon sx={{ fontSize: "40px" }} />
              </h5>
            </Button>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ApplicationItem;
