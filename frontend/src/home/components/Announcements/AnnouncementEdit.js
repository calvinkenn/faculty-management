import React, { useState } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload";
import "./AnnouncementEdit.css";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

const AnnouncementEdit = (props) => {
  const { sendRequest } = useHttpClient();
  const [inputError, setInputError] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: props.isEditMode ? props.item[0].title : "",
      isValid: false,
    },
    author: {
      value: props.isEditMode ? props.item[0].author : "",
      isValid: true,
    },
    announcementPic: {
      value: props.isEditMode ? props.item[0].image : "",
      isValid: false,
    },
    content: {
      value: props.isEditMode ? props.item[0].content : "",
      isValid: true,
    },
  });

  const submitEditHandler = async (e) => {
    console.log("Edit");
    e.preventDefault();

    const responseData = await sendRequest(
      "http://localhost:5000/api/announcement/editAnnouncement",
      "PATCH",
      JSON.stringify({
        id: props.item[0]._id,
        title: formState.inputs.title.value,
        author: formState.inputs.author.value,
        content: formState.inputs.content.value,
      }),
      { "Content-Type": "application/json" }
    );
    props.messageHandler(responseData.message);
  };

  const submitAddHandler = async (e) => {
    console.log("Add");
    e.preventDefault();

    if (!formState.inputs.announcementPic.value) {
      setInputError("Please upload photo");
      return;
    }

    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("author", formState.inputs.author.value);
    formData.append("content", formState.inputs.content.value);
    formData.append("announcementPic", formState.inputs.announcementPic.value);
    const responseData = await sendRequest(
      "http://localhost:5000/api/announcement/addNewAnnouncement",
      "POST",
      formData
    );
    props.messageHandler(responseData.message);
  };

  const clearInputError = () => {
    setInputError("");
  };

  const cancelEditHandler = () => {
    props.isEditMode
      ? props.setIsEditModeHandler()
      : props.setIsAddModeHandler();
  };

  const showEditWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const closeEditWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const showSaveConfirmHandler = () => {
    setShowSaveConfirmModal(true);
  };

  const closeSaveConfirmHandler = () => {
    setShowSaveConfirmModal(false);
  };

  return (
    <React.Fragment>
      <div className="edit-announcement-cont">
        <ErrorModal error={inputError} onClear={clearInputError} />
        <Modal
          show={showConfirmModal || showSaveConfirmModal}
          onCancel={
            showConfirmModal ? closeEditWarningHandler : closeSaveConfirmHandler
          }
          header={
            showConfirmModal
              ? props.isEditMode
                ? "Cancel Editing?"
                : "Cancel Adding?"
              : "Save Changes"
          }
          footerClass="place-item__modal-actions"
          footer={
            <React.Fragment>
              <div className="mission-cancel-edit">
                <Button
                  danger
                  onClick={
                    showConfirmModal
                      ? cancelEditHandler
                      : props.isEditMode
                      ? submitEditHandler
                      : submitAddHandler
                  }
                >
                  Yes
                </Button>
                <Button
                  inverse
                  onClick={
                    showConfirmModal
                      ? closeEditWarningHandler
                      : closeSaveConfirmHandler
                  }
                >
                  No
                </Button>
              </div>
            </React.Fragment>
          }
        >
          {showConfirmModal ? (
            <p>
              Do you want to cancel {props.isEditMode ? "editing" : "adding"}{" "}
              announcement?
            </p>
          ) : (
            <p>Do you want to save changes to Announcement?</p>
          )}
        </Modal>{" "}
        <div className="announce-edit-form">
          <ImageUpload
            center
            id="announcementPic"
            onInput={inputHandler}
            previewUrl={formState.inputs.announcementPic.value}
            isEditMode={props.isEditMode}
            isAnnouncement={true}
          />
        </div>
        <div className="edit-title-input">
          <Input
            element="input"
            id="title"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            helperText="Please input the title of the announcement"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
            required
          />
        </div>
        <div className="edit-author-input">
          <Input
            element="input"
            id="author"
            type="text"
            label="Author"
            validators={[VALIDATOR_REQUIRE()]}
            helperText="Please input the author of the announcement"
            onInput={inputHandler}
            initialValue={formState.inputs.author.value}
            initialValid={formState.inputs.author.isValid}
            required
          />
        </div>
        <div className="edit-content-input">
          <Input
            element="textarea"
            id="content"
            type="text"
            label="Content"
            minRows={12}
            validators={[VALIDATOR_REQUIRE()]}
            helperText="Please input content of the announcement"
            onInput={inputHandler}
            initialValue={formState.inputs.content.value}
            initialValid={formState.inputs.content.isValid}
            required
          />
        </div>

        <div className="action-bar">
          <Button type="button" onClick={showSaveConfirmHandler}>
            {props.isEditMode ? "Save" : "Publish"}
          </Button>
          <span />
          <Button onClick={showEditWarningHandler}>Cancel</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AnnouncementEdit;
