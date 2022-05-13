import React, { useState, useEffect } from "react";

import Pagination from "../../../shared/components/Pagination/Pagination";
import CivilServiceEdit from "./CivilServiceEdit";
import CivilServiceList from "./CivilServiceList";

const CivilService = (props) => {
  const [editData, setEditData] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const setId = (editData) => {
    setEditData(editData);
  };

  const editModeHandler = (editData) => {
    props.updateEditModeState(true);
    setId(editData);
  };

  let displayPerPage = 5;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + displayPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(props.civilServiceData?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.civilServiceData?.length / displayPerPage));
  }, [itemOffset, 5, props.civilServiceData]);
console.log("WEW")
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * displayPerPage) % props.civilServiceData?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  if (props.isAddMode) {
    return (
      <CivilServiceEdit
        addingItem={true}
        updateAddModeState={props.updateAddModeState}
        setUserData={props.userUpdate}
      />
    );
  } else if (props.isEditMode) {
    return (
      <CivilServiceEdit
        addingItem={false}
        editData={editData}
        // updateAddModeState={props.updateEditModeState}
        setUserData={props.userUpdate}
      />
    );
  } else {
    return (
      <React.Fragment>
        {/* <SuccessModal success={success} onClear={clearSuccess} /> */}
        <CivilServiceList
          setIsEditModeHandler={editModeHandler}
          items={currentItems}
          setUserData={props.userUpdate}
        />
        {currentItems?.length > 0 && (
          <Pagination
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
          />
        )}
      </React.Fragment>
    );
  }
};

export default CivilService;
