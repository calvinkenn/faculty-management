import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

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
      isValid: false,
    },
    blisObjectives: {
      value: inputListBLIS.length > 1 ? inputListBLIS : "",
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
        "http://localhost:5000/api/vmgo/editObjectives", //Change to account
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

  return (
    <React.Fragment>
      <div className="obj-edit-form">
        <h1>Objectives</h1>
        <form onSubmit={submitEditHandler}>
          <div className="bsit-obj-form">
            The following are the objectives of the BSIT program:
            {inputListBSIT.map((x, i) => {
              return (
                  <div className="bsit-obj-txtfield">
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
                        <button
                          className="obj-remove-add"
                          onClick={() => handleRemoveClickBSIT(i)}
                        >
                          Remove
                        </button>
                      )}
                      {inputListBSIT.length - 1 === i && (
                        <button className="obj-remove-add"onClick={handleAddClickBSIT}>Add</button>
                      )}
                    </div>
                  </div>
              );
            })}
          </div>

          <div className="blis-obj-form">
            The following are the objectives of the BLIS program:
            {inputListBLIS.map((x, i) => {
              return (
                <div className="blis-obj-txtfield">
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
                        <button
                          className="obj-remove-add"
                          onClick={() => handleRemoveClickBLIS(i)}
                        >
                          Remove
                        </button>
                      )}
                      {inputListBLIS.length - 1 === i && (
                        <button className="obj-remove-add" onClick={handleAddClickBLIS}>Add</button>
                      )}
                    </div>
                </div>
              );
            })}
          </div>
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
            <div className="obj-cancel-edit">
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
      <p>Do you want to cancel editing Objectives?</p>
      </Modal>
    </React.Fragment>
  );
};

export default ObjectivesEdit;
