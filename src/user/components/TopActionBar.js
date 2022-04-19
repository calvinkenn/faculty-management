import React, { useEffect, useState } from "react";

import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import "./TopActionBar.css";

const TopActionBar = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(props.isEditMode);

  useEffect(() => {
    setIsEditMode(props.isEditMode);
  }, [props.isEditMode]);

  const showCancelEditHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
    props.updateEditModeState(false);
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
        onCancel={cancelDeleteHandler}
        header="Cancel editing?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              YES
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              NO
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to cancel editing? Changes will not be saved.</p>
      </Modal>
      <div className="top-action">
        <ul>
          {props.inOverview && <li>Print</li>}
          {!isEditMode && !props.inOverview && (
            <li onClick={props.onClick}>
              {props.inBasicInformation || props.inContactInformation
                ? "Edit"
                : "Add"}
            </li>
          )}
          {isEditMode && <li onClick={showCancelEditHandler}>Cancel</li>}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default TopActionBar;
