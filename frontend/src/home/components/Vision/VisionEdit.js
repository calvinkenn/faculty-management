import React, { useState } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Modal from "../../../shared/components/UIElements/Modal";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";

const VisionEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm({
    vision: {
      value: props.item ? props.item : "",
      isValid: false,
    },
  });

  const cancelEditHandler = () => {
    props.editModeHandler();
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
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/vmgo/editVision", //Change to account
        "PATCH",
        JSON.stringify({
          id: props.id,
          vision: formState.inputs.vision.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.messageHandler(responseData.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <div className="vision-edit-form">
        <h1>Vision</h1>
        <form onSubmit={submitEditHandler}>
          <Input
            element="textarea"
            id="vision"
            type="text"
            label="Vision"
            minRows={5}
            width={1200}
            validators={[VALIDATOR_REQUIRE()]}
            helperText="Please input the vision"
            onInput={inputHandler}
            initialValue={formState.inputs.vision.value}
            initialValid={formState.inputs.vision.isValid}
            required
          />
          <div className="action-bar">
            <Button type="submit">Save</Button>
            <span />
            <Button type="button" onClick={showEditWarningHandler}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <Modal
        show={showConfirmModal}
        onCancel={closeEditWarningHandler}
        header="Cancel Edit?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <div className="vission-cancel-edit">
            <Button danger onClick={cancelEditHandler}>
              Yes
            </Button>
            <Button inverse onClick={closeEditWarningHandler}>
              No
            </Button>
            </div>
          </React.Fragment>
        }
      >
        <p>Do you want to cancel editing Vision?</p>
      </Modal>
    </React.Fragment>
  );
};

export default VisionEdit;
