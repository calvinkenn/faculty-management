import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./CivilServiceItem.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const CivilServiceItem = (props) => {
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
      "http://localhost:5000/api/users/getEditCivil",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          civilId: props.civilId,
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
      "http://localhost:5000/api/users/deleteCivil",
      "DELETE",
      JSON.stringify({
        civilId: props.civilId,
        userId: storedData.userId,
      }),
      { "Content-Type": "application/json" }
    );

    const getUserCivil = await fetch(
      "http://localhost:5000/api/users/getUserCivil",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedData.userId,
        }),
      }
    );
    const getUserCivilData = await getUserCivil.json();
    props.setUserData(getUserCivilData.userCivil, responseData.message);
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
      <div className="civil-container">
        <div className="civil-container__data">
          <div className="civ-service-title-cont">
            <div className="basic-title-blank"></div>
              <div className="basic-title-text">
                <h1>Career - {props.career}</h1>
              </div>
          </div>
          <div className="civ-service-details-cont">
            <div className="civ-service-details">
              <div>Career: {props.career}</div>
              <div>Rating: {props.rating}</div>
              <div>Date: {props.date}</div>
              <div>Place of Examination: {props.examPlace}</div>
              <div>License Number: {props.licenseNumber}</div>
              <div>License Validity: {props.licenseValidity}</div>
            </div>
            <div className="civ-service-action-btn">
              {!userIdByParams && (
                <div className="civil-container__actions">
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

export default CivilServiceItem;
