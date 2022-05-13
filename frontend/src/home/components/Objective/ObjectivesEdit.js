import React, { useState } from "react";
import TextField from "@mui/material/TextField";

import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Modal from "../../../shared/components/UIElements/Modal";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";

const ObjectivesEdit = (props) => {
  const [inputListBSIT, setInputListBSIT] = useState([{ objectivesBSIT: "" }]);
  const [inputListBLIS, setInputListBLIS] = useState([{ objectivesBLIS: "" }]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formState, inputHandler, setFormData] = useForm({
    objectivesBSIT: {
      value: props.objectivesBSIT,
      isValid: false,
    },
    objectivesBLIS: {
      value: props.objectivesBSIT,
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

  // handle click event of the Add button
  const handleAddClickBSIT = () => {
    formState.inputs.objectivesBSIT.value = "";
    setInputListBSIT([...inputListBSIT, { objectivesBSIT: "" }]);
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
    formState.inputs.objectivesBLIS.value = "";
    setInputListBLIS([...inputListBLIS, { objectivesBLIS: "" }]);
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
      <h1>Objectives</h1>
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
        <p>Do you want to cancel editing Objectives?</p>
      </Modal>
      <form onSubmit={submitEditHandler}>
        <div>
          The following are the objectives of the BSIT program:
          {inputListBSIT.map((x, i) => {
            return (
              <div>
                <div>
                  <TextField
                    name="objectivesBSIT"
                    id="objectivesBSIT"
                    type="text"
                    label="Objectives BSIT"
                    minRows={3}
                    style={{ width: 1200 }}
                    multiline
                    value={x.awards}
                    onChange={(e) => handleInputChangeBSIT(e, i)}
                  />
                  <div className="btn-box">
                    {inputListBSIT.length !== 1 && (
                      <button
                        className="mr10"
                        onClick={() => handleRemoveClickBSIT(i)}
                      >
                        Remove
                      </button>
                    )}
                    {inputListBSIT.length - 1 === i && (
                      <button onClick={handleAddClickBSIT}>Add</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          The following are the objectives of the BLIS program:
          {inputListBLIS.map((x, i) => {
            return (
              <div>
                <div>
                  <TextField
                    name="objectivesBLIS"
                    id="objectivesBLIS"
                    type="text"
                    label="Objectives BLIS"
                    minRows={3}
                    style={{ width: 1200 }}
                    multiline
                    value={x.awards}
                    onChange={(e) => handleInputChangeBLIS(e, i)}
                  />
                  <div className="btn-box">
                    {inputListBLIS.length !== 1 && (
                      <button
                        className="mr10"
                        onClick={() => handleRemoveClickBLIS(i)}
                      >
                        Remove
                      </button>
                    )}
                    {inputListBLIS.length - 1 === i && (
                      <button onClick={handleAddClickBLIS}>Add</button>
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

export default ObjectivesEdit;
