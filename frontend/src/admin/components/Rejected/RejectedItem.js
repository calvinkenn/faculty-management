import React, { useState } from "react";

import "../item.css";
import Modal from "../../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";

const RejectedItem = (props) => {
  const { isLoading, error, success, sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  //handler for account approval
  const userApproveHandler = async (event) => {
    setShowConfirmModal(false);
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/actionHandler",
        "PATCH",
        JSON.stringify({
          userId: props.id,
          permissionUpdate: "pending",
        }),
        { "Content-Type": "application/json" }
      );
      props.updateRejectedUsers(
        responseData.pendingUsers,
        responseData.permission
      );
    } catch (err) {
      console.log(err);
    }
  };

  const showConfirmModalHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelHandler}
        header={"Reactivate this Account?"}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={userApproveHandler}>
              Yes
            </Button>
            <Button danger onClick={cancelHandler}>
              No
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and reactivate this account?</p>
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
          <div>
            Rejected Reason/Note :{" "}
            {props.deactivateNote ? props.deactivateNote : "N/A"}
          </div>
        </div>
        <div className="container__actions__back-to-pending">
          <Button type="button" onClick={showConfirmModalHandler}>
            <h4>
              <ReplayCircleFilledIcon sx={{ fontSize: "40px" }} />
            </h4>
          </Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default RejectedItem;
