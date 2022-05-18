import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);

  useEffect(() => {
    if (props.item) {
      setInputList(props.item); //Set inputList to awards data
    }
  }, []);

  const [formState, inputHandler, setFormData] = useForm({
    goals: {
      value: inputList.length > 1 ? inputList : "",
      isValid: inputList.length > 1 ? true : false,
    },
  });

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
      <Modal
        show={showConfirmModal || showSaveConfirmModal}
        onCancel={
          showConfirmModal ? closeEditWarningHandler : closeSaveConfirmHandler
        }
        header={showConfirmModal ? "Cancel Edit?" : "Save Changes"}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <div className="mission-cancel-edit">
              <Button
                danger
                onClick={
                  showConfirmModal ? cancelEditHandler : submitEditHandler
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
          <p>Do you want to cancel editing Goals?</p>
        ) : (
          <p>Do you want to save changes to Goals?</p>
        )}
      </Modal>
      <div className="goals-edit-form">
        <h1>Goals</h1>
        To realize the vision and mission of the University, the College commits
        itself to:
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
                    <muiBtn
                      type="button"
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}
                    >
                      <IconButton aria-label="delete" size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </muiBtn>
                  )}
                  {inputList.length - 1 === i && (
                    <muiBtn type="button" onClick={handleAddClick}>
                      <IconButton aria-label="add" size="small">
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </muiBtn>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="goals-action-bar">
          <Button type="button" onClick={showSaveConfirmHandler}>
            Save
          </Button>
          <span />
          <Button type="button" onClick={showEditWarningHandler}>
            Cancel
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GoalsEdit;
