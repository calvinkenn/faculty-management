import React, { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import AnnouncementList from "./AnnouncementList";
import Pagination from "../../../shared/components/Pagination/Pagination";
import AnnouncementEdit from "./AnnouncementEdit";
import Button from "../../../shared/components/FormElements/Button";
import "./Announcement.css";
import FilterAnnouncement from "../../../shared/components/Filter/FilterAnnouncement";

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

  const filteredData = props.announcementData?.filter((announcement) => {
    const newDate = new Date(announcement.date);
    return (
      newDate.getFullYear() == props.filterValue.getFullYear() &&
      newDate.getMonth() == props.filterValue.getMonth()
    );
  });

  let displayPerPage = 5;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + displayPerPage;
    //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(
      props.displayFilterValue == 2
        ? filteredData
            ?.sort((a, b) => (a.date < b.date ? 1 : -1))
            .slice(itemOffset, endOffset)
        : props.announcementData
            ?.sort((a, b) => (a.date < b.date ? 1 : -1))
            .slice(itemOffset, endOffset)
    );
    setPageCount(
      Math.ceil(
        props.displayFilterValue == 2
          ? filteredData?.length / displayPerPage
          : props.announcementData?.length / displayPerPage
      )
    );
  }, [
    itemOffset,
    5,
    filteredData?.length,
    props.filterValue,
    props.displayFilterValue,
    props.announcementData.length,
  ]);

  const handlePageClick = (event) => {
    const newOffset =
      props.displayFilterValue == 2
        ? (event.selected * displayPerPage) % filteredData?.length
        : (event.selected * displayPerPage) % props.announcementData?.length;
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
        <div className="ann-search-filter">
          <FilterAnnouncement
            onSearchChange={props.onSearchChange}
            filterValue={props.filterValue}
            onFilterChange={props.onFilterChange}
            onDisplayFilterChange={props.onDisplayFilterChange}
            displayFilterValue={props.displayFilterValue}
          />
        </div>
        <AnnouncementList
          items={currentItems ? currentItems : props.announcementData}
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
