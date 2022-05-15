import React, { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import AnnouncementList from "./AnnouncementList";
import Pagination from "../../../shared/components/Pagination/Pagination";
import AnnouncementEdit from "./AnnouncementEdit";
import Button from "../../../shared/components/FormElements/Button";
import "./Announcement.css";

const Announcement = (props) => {
  const auth = useContext(AuthContext);
  const [editID, setEditID] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const editModeHandler = (editID) => {
    props.updateEditModeState(true);
    setEditID(editID);
  };

  const addModeHandler = () => {
    props.updateAddModeState(true);
  };

  const editData = props.announcementData?.filter((announcement) => {
    return announcement._id?.includes(editID);
  });

  let displayPerPage = 5;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + displayPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(props.announcementData?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.announcementData?.length / displayPerPage));
  }, [itemOffset, 5, props.announcementData]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * displayPerPage) % props.announcementData?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  if (props.isEditMode) {
    return (
      <AnnouncementEdit
        setIsEditModeHandler={editModeHandler}
        isEditMode={true}
        item={editData}
        messageHandler={props.messageHandler}
      />
    );
  } else if (props.isAddMode) {
    return (
      <AnnouncementEdit
        setIsAddModeHandler={addModeHandler}
        isEditMode={false}
        messageHandler={props.messageHandler}
      />
    );
  } else {
    return (
      <React.Fragment>
        <div className="announcment-header">
          <h1>Announcement</h1>
          {auth.isAdmin && <Button onClick={addModeHandler}>Add New</Button>}
        </div>
        <AnnouncementList
          items={currentItems}
          setIsEditModeHandler={editModeHandler}
          messageHandler={props.messageHandler}
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

export default Announcement;
