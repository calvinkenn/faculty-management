import React, { useState } from "react";

import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Modal from "../../../shared/components/UIElements/Modal";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";

const VisionEdit = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm({
    vision: {
      value: props.vision,
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

  const submitEditHandler = (e) => {
    console.log("Edit");
    e.preventDefault();
  };
  return (
    <React.Fragment>
      <h1>Vision</h1>
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
        <p>Do you want to cancel editing Mission?</p>
      </Modal>
      <form>
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
      </form>
      <div className="action-bar">
        <Button onClick={showEditWarningHandler}>Cancel</Button>
      </div>
    </React.Fragment>
  );
};

export default VisionEdit;
