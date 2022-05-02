import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./WorkExperienceItem.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const WorkExperienceItem = (props) => {
  const userIdByParams = useParams().userId;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const editModeHandler = async () => {
    const response = await fetch(
      "http://localhost:5000/api/users/getEditWorkExperience",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workId: props.workId,
        }),
      }
    );
    const responseData = await response.json();
    props.setIsEditModeHandler(responseData.editData);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const responseData = await sendRequest(
      "http://localhost:5000/api/users/deleteWorkExperience",
      "DELETE",
      JSON.stringify({
        workId: props.workId,
        userId: storedData.userId,
      }),
      { "Content-Type": "application/json" }
    );
    const response = await fetch(
      "http://localhost:5000/api/users/getWorkExperience",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedData.userId,
        }),
      }
    );
    const getUserWork = await response.json();
    props.setUserData(getUserWork.WorkExperience, responseData.message);
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Delete this item?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and delete this item?</p>
      </Modal>
      <div className="work-container">
        <div className="work-container__data">
          <div>Company: {props.company}</div>
          <div>Position: {props.position}</div>
          <div>Department: {props.department}</div>
          <div>FROM: {props.fromDate}</div>
          <div>TO: {props.toDate}</div>
          <div>Monthly Salary: &#8369;{props.monthlySalary}</div>
          <div>
            Salary Grade: {props.salaryGrade}-{props.salaryStep}
          </div>
          <div>Government: {props.government}</div>
        </div>
        {!userIdByParams && (
          <div className="work-container__actions">
            <Button onClick={editModeHandler}>Edit</Button>
            <Button danger onClick={showDeleteWarningHandler}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default WorkExperienceItem;
