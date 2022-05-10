import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import LinesEllipsisLoose from "react-lines-ellipsis/lib/loose";

import { AuthContext } from "../../../shared/context/auth-context";
import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./AnnouncementItem.css";

const AnnouncementItem = (props) => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const editHandler = () => {
    console.log("edit");
    props.setIsEditModeHandler();
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    //Confirm Delete
    console.log("deleted");
    setShowConfirmModal(false);
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
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and delete this item?</p>
      </Modal>
      <div>
        <div>Title: {props.title}</div>
        <div>Author: {props.author}</div>
        <div>Date Created: {props.date}</div>
        <div className="image-container">
          <img src={props.image} alt="Announcement" />
        </div>
        <div>
          Content:{" "}
          <LinesEllipsisLoose
            text={props.content}
            maxLine="3"
            lineHeight="15"
          />
        </div>
        <NavLink to={`/announcement/${props.id}`} exact>
          View
        </NavLink>
        {auth.isAdmin && <Button onClick={editHandler}>Edit</Button>}
        {auth.isAdmin && (
          <Button onClick={showDeleteWarningHandler}>Delete</Button>
        )}
      </div>
    </React.Fragment>
  );
};

export default AnnouncementItem;
