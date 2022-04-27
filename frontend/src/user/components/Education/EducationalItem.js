import React, { useState } from "react";

import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./EducationalItem.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const EducationalItem = (props) => {

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, success, sendRequest, clearError, clearSuccess} = useHttpClient();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

const editModeHandler = async() => {
    const response = await fetch('http://localhost:5000/api/users/getEditEducation',{
      method: "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        educId : props.educId,
      }),
    });
    const responseData = await response.json();
    props.setIsEditModeHandler(responseData.editData);
}

  const confirmDeleteHandler =  async () => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    setShowConfirmModal(false);
    const responseData = await sendRequest('http://localhost:5000/api/users/deleteEducation',
    "DELETE",
    JSON.stringify({
      educId : props.educId,
      userId :  storedData.userId
    }),
    { "Content-Type": "application/json" }
    );
    props.setUserData(responseData.userEducation, responseData.message);
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
          <div>Level: {props.level}</div>
          <div>School: {props.school}</div>
          {(props.degree ? <div>Degree: {props.degree}</div> : '')}
          <div>Year Attended: {props.from}</div>
          <div>Year Graduated: {props.to}</div>
          <div>School Address: {props.address}</div>
          <div>
            Awards:
            {props.awards.map((award) => (
              <div>{award.awards}</div>
            ))}
          </div>
        </div>
        <div className="educational-container__actions">
          <Button onClick={editModeHandler}>Edit</Button>
          <Button danger onClick={showDeleteWarningHandler}>
            Delete
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EducationalItem;
