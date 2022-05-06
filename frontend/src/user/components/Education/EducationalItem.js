import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./EducationalItem.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const EducationalItem = (props) => {
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
      "http://localhost:5000/api/users/getEditEducation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          educId: props.educId,
        }),
      }
    );
    const responseData = await response.json();
    props.setIsEditModeHandler(responseData.editData);
  };

  const confirmDeleteHandler = async () => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    setShowConfirmModal(false);
    const responseData = await sendRequest(
      "http://localhost:5000/api/users/deleteEducation",
      "DELETE",
      JSON.stringify({
        educId: props.educId,
        userId: storedData.userId,
      }),
      { "Content-Type": "application/json" }
    );

    const getUserEducation = await fetch(
      "http://localhost:5000/api/users/getUserEducation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedData.userId,
        }),
      }
    );
    const getUserEducationData = await getUserEducation.json();
    props.setUserData(getUserEducationData.userEducation, responseData.message);
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
      <div className="educational-container">
        <div className="educational-container__data">
          <div className="educ-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>{props.level}</h1>
            </div>
          </div>
          <div className="educ-details-cont">
            <div className="details-cont">
              <div>Level: {props.level}</div>
              <div>School: {props.school}</div>
              {props.degree !== "N/A" ? <div>Degree: {props.degree}</div> : ""}
              <div>From: {props.from}</div>
              <div>To: {props.to}</div>
              {props.yearGraduated ? (
                <div>Year graduated: {props.yearGraduated}</div>
              ) : (
                ""
              )}
              <div>Highest Level/ Units Earned: {props.highestLevel}</div>
              <div>
                Awards:{" "}
                {props.awards > 0
                  ? props.awards.map((award) => <div>{award.awards}</div>)
                  : "N/A"}
              </div>
            </div>
            <div className="educ-action-btn">
              {!userIdByParams && (
                <div className="educational-container__actions">
                  <Button onClick={editModeHandler}>Edit</Button>
                  <Button danger onClick={showDeleteWarningHandler}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EducationalItem;
