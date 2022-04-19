import React, { useState } from "react";

import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./EducationalItem.css";

const EducationalItem = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
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
          <div>School: {props.schoolName}</div>
          <div>Degree: {props.degree}</div>
          <div>From: {props.from}</div>
          <div>To: {props.to}</div>
          <div>Year Graduated: {props.yearGraduated}</div>
          <div>
            Awards:
            {props.awards.map((award) => (
              <div>{award}</div>
            ))}
          </div>
        </div>
        <div className="educational-container__actions">
          <Button>Edit</Button>
          <Button danger onClick={showDeleteWarningHandler}>
            Delete
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EducationalItem;
