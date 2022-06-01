import React, { useState } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Modal from "../../../shared/components/UIElements/Modal";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";

const MissionEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm({
    mission: {
      value: props.item ? props.item : "",
      isValid: props.item ? true : false,
    },
  });

  const submitEditHandler = async (e) => {
    console.log("Edit");
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/vmgo/editMission", //Change to account
        "PATCH",
        JSON.stringify({
          id: props.id,
          mission: formState.inputs.mission.value,
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

  const cancelEditHandler = () => {
    props.editModeHandler();
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
      <Modal
        show={showConfirmModal || showSaveConfirmModal}
        onCancel={showConfirmModal ? closeEditWarningHandler : closeSaveConfirmHandler}
        header={showConfirmModal ? "Cancel Edit?" : "Save Changes"}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <div className="mission-cancel-edit">
              <Button
                
                onClick={
                  showConfirmModal ? cancelEditHandler : submitEditHandler
                }
              >
                Yes
              </Button>
              <span />
              <Button danger onClick={showConfirmModal ? closeEditWarningHandler : closeSaveConfirmHandler}>
                No
              </Button>
            </div>
          </React.Fragment>
        }
      >
        {showConfirmModal ? (
          <p>Do you want to cancel editing Mission?</p>
        ) : (
          <p>Do you want to save changes to Mission?</p>
        )}
      </Modal>

      <div className="mission-edit-form">
        <h1>Mission</h1>
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
          <div className="action-bar">
            <div className="mission-action-bar">
            <Button type="button" onClick={showSaveConfirmHandler}>
            Save
          </Button>
          <span />
          <Button type="button" onClick={showEditWarningHandler}>
            Cancel
          </Button>
            </div>
          </div>
      </div>
    </React.Fragment>
  );
};

export default MissionEdit;
