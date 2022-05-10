import React, { useState } from "react";
import TextField from "@mui/material/TextField";

import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Modal from "../../../shared/components/UIElements/Modal";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";

const GoalsEdit = (props) => {
  const [inputList, setInputList] = useState([{ goals: "" }]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm({
    goals: {
      value: props.goals,
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

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    formState.inputs.goals.value = "";
    setInputList([...inputList, { goals: "" }]);
  };

  return (
    <React.Fragment>
      <h1>Goals</h1>
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
        <p>Do you want to cancel editing Goals?</p>
      </Modal>
      <form>
        <div>
          {inputList.map((x, i) => {
            return (
              <div>
                <div>
                  <TextField
                    name="goals"
                    id="goals"
                    type="text"
                    label="Goals"
                    value={x.awards}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <div className="btn-box">
                    {inputList.length !== 1 && (
                      <button
                        className="mr10"
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </button>
                    )}
                    {inputList.length - 1 === i && (
                      <button onClick={handleAddClick}>Add</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </form>
      <div className="action-bar">
        <Button onClick={showEditWarningHandler}>Cancel</Button>
      </div>
    </React.Fragment>
  );
};

export default GoalsEdit;
