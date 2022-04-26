import React, { useState } from "react";

import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./WorkExperienceItem.css";

const WorkExperienceItem = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const editModeHandler = () => {
    props.setIsEditModeHandler(true);
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
      <div className="work-container">
        <div className="work-container__data">
          <div>Company: {props.company}</div>
          <div>Position: {props.position}</div>
          <div>Department: {props.department}</div>
          <div>FROM: {props.from}</div>
          <div>TO: {props.to}</div>
          <div>Salary: {props.salary}</div>
          <div>Status: {props.status}</div>
          <div>Government: {props.governmentService}</div>
        </div>
        <div className="work-container__actions">
          <Button onClick={editModeHandler}>Edit</Button>
          <Button danger onClick={showDeleteWarningHandler}>
            Delete
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkExperienceItem;
