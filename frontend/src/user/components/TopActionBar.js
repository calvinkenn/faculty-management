import React, { useEffect, useState, useContext } from "react";

import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./TopActionBar.css";

const TopActionBar = (props) => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(props.isEditMode);
  const [isAddMode, setIsAddMode] = useState(props.isAddMode);

  useEffect(() => {
    setIsEditMode(props.isEditMode);
    setIsAddMode(props.isAddMode);
  }, [props.isEditMode, props.isAddMode]);

  const showCancelEditHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelEditHandler = () => {
    setShowConfirmModal(false);
    props.updateEditModeState(false);
  };
  const cancelAddHandler = () => {
    setShowConfirmModal(false);
    props.updateAddModeState(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    // console.log("Cancelling...");
    // props.updateEditModeState(false);
  };
  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        header="Cancel editing?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            {isEditMode && (
              <Button inverse onClick={cancelEditHandler}>
                YES
              </Button>
            )}
            {isAddMode && (
              <Button inverse onClick={cancelAddHandler}>
                YES
              </Button>
            )}
            <Button danger onClick={confirmDeleteHandler}>
              NO
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to cancel editing? Changes will not be saved.</p>
      </Modal>
      <div className="top-action">
        {!auth.isAdmin && (
          <ul>
            {props.inOverview && <li>Print</li>}
            {!isEditMode && props.inBasicInformation && (
              <li onClick={props.updateEditModeState}>Edit</li>
            )}
            {!isEditMode && props.inContactInformation && (
              <li onClick={props.updateEditModeState}>Edit</li>
            )}
            {!isEditMode && !isAddMode && props.inAccountInformation && (
              <li onClick={props.updateEditModeState}>Edit</li>
            )}
            {!isAddMode &&
              !isEditMode &&
              !props.inOverview &&
              !props.inBasicInformation &&
              !props.inContactInformation &&
              !props.inAccountInformation && (
                <li onClick={props.updateAddModeState}>Add</li>
              )}
            {isEditMode && !isAddMode && (
              <li onClick={showCancelEditHandler}>Cancel</li>
            )}
            {isAddMode && !isEditMode && (
              <li onClick={showCancelEditHandler}>Cancel</li>
            )}
          </ul>
        )}
      </div>
    </React.Fragment>
  );
};

export default TopActionBar;
