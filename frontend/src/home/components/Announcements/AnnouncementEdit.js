import React, { useState } from "react";

import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./AnnouncementEdit.css";

const AnnouncementEdit = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: props.title,
      isValid: false,
    },
    author: {
      value: props.author,
      isValid: true,
    },
    date: {
      value: props.date,
      isValid: false,
    },
    content: {
      value: props.content,
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

  const submitEditHandler = (e) => {
    console.log("Edit");
    e.preventDefault();
  };

  const submitAddHandler = (e) => {
    console.log("Add");
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={closeEditWarningHandler}
        header="Delete this item?"
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
