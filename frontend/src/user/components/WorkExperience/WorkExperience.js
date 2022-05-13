import React, { useState, useEffect } from "react";

import Pagination from "../../../shared/components/Pagination/Pagination";
import SuccessModal from "../../../shared/components/UIElements/SuccessModal";
import WorkExperienceEdit from "./WorkExperienceEdit";
import WorkExperienceList from "./WorkExperienceList";

const WorkExperience = (props) => {
  const [userData, setUserData] = useState([]);
  const [success, setSuccess] = useState();
  const [editData, setEditData] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const clearSuccess = () => {
    setSuccess(null);
  };
  const setAddedData = (userData, success) => {
    setUserData(userData);
    setSuccess(success);
  };
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
    setCurrentItems(props.workData?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.workData?.length / displayPerPage));
  }, [itemOffset, 5, props.workData]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * displayPerPage) % props.workData?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  if (props.isAddMode) {
    return (
      <WorkExperienceEdit
        addingItem={true}
        // updateAddModeState={props.updateAddModeState}
        setUserData={props.userUpdate}
      />
    );
  } else if (props.isEditMode) {
    return (
      <WorkExperienceEdit
        addingItem={false}
        editData={editData}
        setUserData={props.userUpdate}
        // updateAddModeState={props.updateEditModeState}
      />
    );
  } else {
    return (
      <React.Fragment>
        <SuccessModal success={success} onClear={clearSuccess} />
        <WorkExperienceList
          setUserData={props.userUpdate}
          setIsEditModeHandler={editModeHandler}
          items={currentItems}
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

export default WorkExperience;
