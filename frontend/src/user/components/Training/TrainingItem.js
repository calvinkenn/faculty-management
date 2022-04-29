import React, { useState } from "react";

import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./TrainingItem.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
const TrainingItem = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, success, sendRequest, clearError, clearSuccess} = useHttpClient();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const editModeHandler = () => {
    props.setIsEditModeHandler(true);
  };

  const confirmDeleteHandler =  async () => {
    setShowConfirmModal(false);
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const responseData = await sendRequest('http://localhost:5000/api/users/deleteUserTraining',
    "DELETE",
    JSON.stringify({
      trainingId : props.trainingId,
      userId :  storedData.userId
    }),
    { "Content-Type": "application/json" }
    );

    const getUserTraining = await fetch("http://localhost:5000/api/users/getUserTraining", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: storedData.userId,
      }),
    });
    const getUserTrainingData = await getUserTraining.json();
    props.setUserData(getUserTrainingData.userTraining, responseData.message);
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
      <div className="training-container">
        <div className="training-container__data">
          <div>TITLE: {props.title}</div>
          <div>TYPE: {props.type}</div>
          <div>FROM: {props.from}</div>
          <div>TO: {props.to}</div>
          <div>Hours: {props.hours}</div>
          <div>Type of learning and development: {props.typeOfLD}</div>
          <div>Conducted/Sponsored by: {props.conducted}</div>
        </div>
        <div className="training-container__image">
          <img src={props.certificate} alt={props.title} />
        </div>
        <div className="training-container__actions">
          <Button onClick={editModeHandler}>Edit</Button>
          <Button danger onClick={showDeleteWarningHandler}>
            Delete
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TrainingItem;
