import React, { useState } from "react";

import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Modal from "../../../shared/components/UIElements/Modal";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";

const MissionEdit = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm({
    mission: {
      value: props.mission,
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
      <h1>Mission</h1>
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
          id="mission"
          type="text"
          label="Mission"
          minRows={5}
          width={1200}
          validators={[VALIDATOR_REQUIRE()]}
          helperText="Please input the mission"
          onInput={inputHandler}
          initialValue={formState.inputs.mission.value}
          initialValid={formState.inputs.mission.isValid}
          required
        />
      </form>
      <div className="action-bar">
        <Button onClick={showEditWarningHandler}>Cancel</Button>
      </div>
    </React.Fragment>
  );
};

export default MissionEdit;
