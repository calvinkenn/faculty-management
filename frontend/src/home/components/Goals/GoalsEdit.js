import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Modal from "../../../shared/components/UIElements/Modal";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";

const GoalsEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [inputList, setInputList] = useState([{ goals: "" }]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (props.item) {
      setInputList(props.item); //Set inputList to awards data
    }
  }, []);

  const [formState, inputHandler, setFormData] = useForm({
    goals: {
      value: inputList.length > 1 ? inputList : "",
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
        "http://localhost:5000/api/vmgo/editGoals", //Change to account
        "PATCH",
        JSON.stringify({
          id: props.id,
          goals: inputList,
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
      <div className="goals-edit-form">
        <h1>Goals</h1>
        To realize the vision and mission of the University, the College commits
        itself to:
        <form onSubmit={submitEditHandler}>
          <div className="goals-form">
            {inputList.map((x, i) => {
              return (
                  <div className="goals-txtfield">
                    <TextField
                      name="goals"
                      id="goals"
                      type="text"
                      label="Goals"
                      minRows={3}
                      multiline
                      value={x.goals}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <div className="btn-box">
                      {inputList.length !== 1 && (
                      
                        <button
                          className="goals-remove-add"
                          onClick={() => handleRemoveClick(i)}
                        >
                          Remove
                        </button>
                      
                      )}
                      {inputList.length - 1 === i && (
                        <button className="goals-remove-add" onClick={handleAddClick}>Add</button>
                      )}
                    </div>
                  </div>
              );
            })}
          </div>
          <div className="goals-action-bar">
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
            <div className="goals-cancel-edit">
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
        <p>Do you want to cancel editing Goals?</p>
      </Modal>
    </React.Fragment>
  );
};

export default GoalsEdit;
