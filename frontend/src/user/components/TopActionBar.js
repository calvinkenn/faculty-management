import React, { useEffect, useState, useContext } from "react";

import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import PrintIcon from "@mui/icons-material/Print";
import "./TopActionBar.css";

const TopActionBar = (props) => {
  const auth = useContext(AuthContext);
  const [isPrintMode, setIsPrintMode] = useState(props.isPrintMode);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(props.isEditMode);
  const [isAddMode, setIsAddMode] = useState(props.isAddMode);

  const printHandle = () => {
    props.updatePrintModeState();
  };

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

  const cancelPrintHandler = () => {
    setShowConfirmModal(false);
    props.updatePrintModeState(false);
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
            {props.isPrintMode && (
              <Button inverse onClick={cancelPrintHandler}>
                YES
              </Button>
            )}
            <Button danger onClick={confirmDeleteHandler}>
              NO
            </Button>
          </React.Fragment>
        }
      >
        {props.isEditMode && (
          <p>Do you want to cancel editing? Changes will not be saved.</p>
        )}
        {props.isAddMode && (
          <p>Do you want to cancel adding? Changes will not be saved.</p>
        )}
        {props.isPrintMode && <p>Do you want to cancel printing? </p>}
      </Modal>
      <div className="top-action">
        <ul>
          {props.inOverview && !props.isPrintMode && (
            <li onClick={printHandle}>
              <PrintIcon sx={{ fontSize: 20 }} />
              <span>Print</span>
            </li>
          )}
          {!auth.isAdmin && !isEditMode && props.inBasicInformation && (
            <li onClick={props.updateEditModeState}>Edit</li>
          )}
          {!auth.isAdmin && !isEditMode && props.inContactInformation && (
            <li onClick={props.updateEditModeState}>Edit</li>
          )}
          {!auth.isAdmin &&
            !isEditMode &&
            !isAddMode &&
            props.inAccountInformation && (
              <li onClick={props.updateEditModeState}>Edit</li>
            )}
          {!auth.isAdmin &&
            !isAddMode &&
            !isEditMode &&
            !props.inOverview &&
            !props.inBasicInformation &&
            !props.inContactInformation &&
            !props.inAccountInformation && (
              <li onClick={props.updateAddModeState}>Add</li>
            )}
          {!auth.isAdmin && isEditMode && !isAddMode && (
            <li onClick={showCancelEditHandler}>Cancel</li>
          )}
          {!auth.isAdmin && isAddMode && !isEditMode && (
            <li onClick={showCancelEditHandler}>Cancel</li>
          )}
          {props.isPrintMode && !isEditMode && !isAddMode && (
            <li onClick={showCancelEditHandler}>Cancel</li>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default TopActionBar;
