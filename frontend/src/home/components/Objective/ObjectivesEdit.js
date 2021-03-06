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

const ObjectivesEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [inputListBSIT, setInputListBSIT] = useState([{ bsitObjectives: "" }]);
  const [inputListBLIS, setInputListBLIS] = useState([{ blisObjectives: "" }]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showBSITConfirmModal, setShowBSITConfirmModal] = useState(false);

  useEffect(() => {
    if (props.item_IT) {
      setInputListBSIT(props.item_IT); //Set inputList to awards data
    }
    if (props.item_BLIS) {
      setInputListBLIS(props.item_BLIS);
    }
  }, []);

  const [formState, inputHandler, setFormData] = useForm({
    bsitObjectives: {
      value: inputListBSIT.length > 1 ? inputListBSIT : "",
      isValid: inputListBSIT.length > 1 ? true : false,
    },
    blisObjectives: {
      value: inputListBLIS.length > 1 ? inputListBLIS : "",
      isValid: inputListBLIS.length > 1 ? true : false,
    },
  });

  const submitBSITEditHandler = async (e) => {
    console.log("Edit");
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/vmgo/editBSITObjectives", //Change to account
        "PATCH",
        JSON.stringify({
          id: props.id,
          bsitObjectives: inputListBSIT,
          blisObjectives: inputListBLIS,
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

  const submitBLISEditHandler = async (e) => {
    console.log("Edit");
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/vmgo/editBLISObjectives", //Change to account
        "PATCH",
        JSON.stringify({
          id: props.id,
          bsitObjectives: inputListBSIT,
          blisObjectives: inputListBLIS,
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

  // handle click event of the Add button
  const handleAddClickBSIT = () => {
    formState.inputs.bsitObjectives.value = "";
    setInputListBSIT([...inputListBSIT, { bsitObjectives: "" }]);
  };

  // handle input change
  const handleInputChangeBSIT = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListBSIT];
    list[index][name] = value;
    setInputListBSIT(list);
  };

  // handle click event of the Remove button
  const handleRemoveClickBSIT = (index) => {
    const list = [...inputListBSIT];
    list.splice(index, 1);
    setInputListBSIT(list);
  };

  // handle click event of the Add button
  const handleAddClickBLIS = () => {
    formState.inputs.blisObjectives.value = "";
    setInputListBLIS([...inputListBLIS, { blisObjectives: "" }]);
  };

  // handle input change
  const handleInputChangeBLIS = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListBLIS];
    list[index][name] = value;
    setInputListBLIS(list);
  };

  // handle click event of the Remove button
  const handleRemoveClickBLIS = (index) => {
    const list = [...inputListBLIS];
    list.splice(index, 1);
    setInputListBLIS(list);
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

  const showBSITConfirmHandler = () => {
    setShowBSITConfirmModal(true);
  };

  const closeSaveConfirmHandler = () => {
    setShowBSITConfirmModal(false);
  };

  return (
    <React.Fragment>
      <h1>Objectives</h1>
      <Modal //Modal for SaveChanges
        show={showBSITConfirmModal}
        onCancel={closeEditWarningHandler}
        header="Save Changes?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <div className="obj-cancel-edit">
              <Button
                onClick={
                  props.bsitObj ? submitBSITEditHandler : submitBLISEditHandler
                }
              >
                Yes
              </Button>
              <span />
              <Button inverse onClick={closeSaveConfirmHandler}>
                No
              </Button>
            </div>
          </React.Fragment>
        }
      >
        {props.bsitObj && (
          <p>Do you want to save changes to BSIT Objectives?</p>
        )}
        {!props.bsitObj && (
          <p>Do you want to save changes to BLIS Objectives?</p>
        )}
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={closeEditWarningHandler}
        header="Cancel Edit?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <div className="obj-cancel-edit">
              <Button onClick={cancelEditHandler}>
                Yes
              </Button>
              <span />
              <Button danger onClick={closeEditWarningHandler}>
                No
              </Button>
            </div>
          </React.Fragment>
        }
      >
        <p>Do you want to cancel editing Objectives?</p>
      </Modal>
      <form
        onSubmit={props.bsitObj ? submitBSITEditHandler : submitBLISEditHandler}
      >
        {props.bsitObj && (
          <div className="bsit-obj-forms">
            The following are the objectives of the BSIT program:
            {inputListBSIT.map((x, i) => {
              return (
                <div>
                  <div>
                    <TextField
                      name="bsitObjectives"
                      id="bsitObjectives"
                      type="text"
                      label="Objectives BSIT"
                      minRows={3}
                      multiline
                      value={x.bsitObjectives}
                      onChange={(e) => handleInputChangeBSIT(e, i)}
                    />
                    <div className="btn-box">
                      {inputListBSIT.length !== 1 && (
                        <muiBtn
                          className="obj-remove-add"
                          onClick={() => handleRemoveClickBSIT(i)}
                        >
                          <IconButton aria-label="delete" size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </muiBtn>
                      )}
                      {inputListBSIT.length - 1 === i && (
                        <muiBtn
                          className="obj-remove-add"
                          onClick={handleAddClickBSIT}
                        >
                          <IconButton aria-label="add" size="small">
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </muiBtn>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!props.bsitObj && (
          <div className="blis-obj-forms">
            The following are the objectives of the BLIS program:
            {inputListBLIS.map((x, i) => {
              return (
                <div>
                  <div>
                    <TextField
                      name="blisObjectives"
                      id="blisObjectives"
                      type="text"
                      label="Objectives BLIS"
                      minRows={3}
                      multiline
                      value={x.blisObjectives}
                      onChange={(e) => handleInputChangeBLIS(e, i)}
                    />
                    <div className="btn-box">
                      {inputListBLIS.length !== 1 && (
                        <muiBtn
                          className="obj-remove-add"
                          onClick={() => handleRemoveClickBLIS(i)}
                        >
                          <IconButton aria-label="delete" size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </muiBtn>
                      )}
                      {inputListBLIS.length - 1 === i && (
                        <muiBtn
                          className="obj-remove-add"
                          onClick={handleAddClickBLIS}
                        >
                          <IconButton aria-label="add" size="small">
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </muiBtn>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="action-bar">
          <Button type="button" onClick={showBSITConfirmHandler}>
            Save
          </Button>
          <span />
          <Button type="button" onClick={showEditWarningHandler}>
            Cancel
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ObjectivesEdit;
