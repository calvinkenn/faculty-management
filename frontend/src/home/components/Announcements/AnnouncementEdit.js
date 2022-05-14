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

  return (
    <React.Fragment>
      <ErrorModal error={inputError} onClear={clearInputError} />
      <Modal
        show={showConfirmModal}
        onCancel={closeEditWarningHandler}
        header="Cancel Edit?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button danger onClick={cancelEditHandler}>
              Yes
            </Button>
            <Button inverse onClick={closeEditWarningHandler}>
              No
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to cancel {props.isEditMode ? "editing" : "adding"}{" "}
          announcement?
        </p>
      </Modal>{" "}
      <div className="action-bar">
        <Button onClick={showEditWarningHandler}>Cancel</Button>
      </div>
      <form onSubmit={props.isEditMode ? submitEditHandler : submitAddHandler}>
        <div>
          <ImageUpload
            center
            id="announcementPic"
            onInput={inputHandler}
            previewUrl={formState.inputs.announcementPic.value}
            isEditMode={props.isEditMode}
            isAnnouncement={true}
          />
        </div>
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
        <Input
          element="textarea"
          id="content"
          type="text"
          label="Content"
          minRows={12}
          width={500}
          validators={[VALIDATOR_REQUIRE()]}
          helperText="Please input content of the announcement"
          onInput={inputHandler}
          initialValue={formState.inputs.content.value}
          initialValid={formState.inputs.content.isValid}
          required
        />
        <Button type="submit">{props.isEditMode ? "Save" : "Publish"}</Button>
      </form>
    </React.Fragment>
  );
};

export default AnnouncementEdit;
