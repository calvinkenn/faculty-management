import React, { useEffect, useState } from "react";

import Modal from "../shared/components/UIElements/Modal";
import Button from "../shared/components/FormElements/Button";
import Filter from "../shared/components/Filter/Filter";
import Sort from "../shared/components/Sort/Sort";
import "./TopActionBarAdmin.css";

const TopActionBarAdmin = (props) => {
  const [isPrintMode, setIsPrintMode] = useState(props.isPrintMode);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const printHandle = () => {
    props.printMode();
    setShowConfirmModal(false);
  };

  const showCancelPrintHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelPrintHandler = () => {
    setShowConfirmModal(false);
    props.updatePrintModeState(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        header="Cancel editing?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={printHandle}>
              YES
            </Button>
            <Button onClick={cancelPrintHandler}>NO</Button>
          </React.Fragment>
        }
      >
        <p>Do you want to cancel printing?</p>
      </Modal>
      <div className="top-action">
        {!props.inOverview && (
          <form>
            <input
              type="text"
              placeholder="Search..."
              value={props.searchValue}
              onChange={props.onSearchChange}
            />
          </form>
        )}
        {props.inOverview && (
          <ul>
            {props.inOverview && !props.isPrintMode && (
              <li onClick={printHandle}>Print</li>
            )}
            {props.inOverview && props.isPrintMode && (
              <li onClick={showCancelPrintHandler}>Cancel</li>
            )}
          </ul>
        )}
        {!props.inOverview && !props.inPending && !props.inRejected && (
          <Filter onChange={props.onFilterChange} value={props.filterValue} />
        )}
        {!props.inOverview && (
          <Sort
            label={"Sort By"}
            onChange={props.onSortChange}
            value={props.sortValue}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default TopActionBarAdmin;
