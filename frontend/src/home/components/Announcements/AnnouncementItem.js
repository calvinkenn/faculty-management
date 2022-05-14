import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import LinesEllipsisLoose from "react-lines-ellipsis/lib/loose";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./AnnouncementItem.css";

const AnnouncementItem = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const editHandler = () => {
    console.log("edit");
    props.setIsEditModeHandler(props.id);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    //Confirm Delete
    console.log("deleted");
    setShowConfirmModal(false);

    const responseData = await sendRequest(
      "http://localhost:5000/api/announcement/deleteAnnouncement",
      "DELETE",
      JSON.stringify({
        announcementID: props.id,
      }),
      { "Content-Type": "application/json" }
    );
    props.messageHandler(responseData.message);
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
      <div className="announcement-container">
        <div className="item">
          <div>Title: {props.title}</div>
          <div>Author: {props.author}</div>
          <div>Date Created: {props.date}</div>
          {props.editDate ? <div>Date Edited: {props.editDate}</div> : ""}
          <div className="image-container">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt="Announcement"
            />
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
      </div>
    </React.Fragment>
  );
};

export default AnnouncementItem;
