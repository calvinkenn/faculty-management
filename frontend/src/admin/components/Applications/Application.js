import React, { useState, useEffect } from "react";

import Pagination from "../../../shared/components/Pagination/Pagination";
import Sort from "../../../shared/components/Sort/Sort";
import ApplicationList from "./ApplicationList";

const Application = (props) => {
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  let displayPerPage = 5;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + displayPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(props.pendingUserData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.pendingUserData?.length / displayPerPage));
  }, [itemOffset, 5, props.pendingUserData, props.sortValue]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * displayPerPage) % props.pendingUserData?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const sortedDataToShow = () => {
    if (props.sortValue === 2) {
      return "firstName";
    } else if (props.sortValue === 3) {
      return "lastName";
    } else if (props.sortValue === 4) {
      return "registrationDate";
    } else {
      return "employeeNum";
    }
  };

  return (
    <React.Fragment>
      {/* {currentItems?.length > 0 && (
        <Sort
          label={"Sort By"}
          onChange={handleChange}
          value={selectedFilter}
        />
      )} */}
      <div className="faculty-list-cont">
        <ApplicationList
          list={currentItems}
          updatePendingUsers={props.updatePendingUsers}
          sortedData={sortedDataToShow()}
        />
        <Pagination
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
        />
      </div>
    </React.Fragment>
  );
};

export default Application;
