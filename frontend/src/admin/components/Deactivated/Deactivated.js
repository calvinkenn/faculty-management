import React, { useState, useEffect } from "react";

import Pagination from "../../../shared/components/Pagination/Pagination";
import Sort from "../../../shared/components/Sort/Sort";
import Filter from "../../../shared/components/Filter/Filter";
import DeactivatedList from "./DeactivatedList";

const Deactivated = (props) => {
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [selectedFilterDisplay, setSelectedFilterDisplay] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const sortedDataToShow = () => {
    if (props.sortValue === 2) {
      return "firstName";
    }
    if (props.sortValue === 3) {
      return "lastName";
    } else {
      return "employeeNum";
    }
  };

  const filterDisplayHandler = (event) => {
    setSelectedFilterDisplay(event.target.value);
  };

  const filteredDataToDisplay = props.deactivatedUserData?.filter((user) => {
    if (props.filterValue === 2) {
      return user.faculty.includes("BSIT");
    } else if (props.filterValue === 3) {
      return user.faculty.includes("BLIS");
    } else if (props.filterValue === 4) {
      return user.faculty.includes("ALLIED");
    } else {
      return user;
    }
  });

  let displayPerPage = 5;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + displayPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(filteredDataToDisplay?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredDataToDisplay?.length / displayPerPage));
  }, [itemOffset, 5, filteredDataToDisplay?.length]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * displayPerPage) % filteredDataToDisplay?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <React.Fragment>
      {/* {currentItems?.length > 0 && (
        <Sort
          label={"Sort By"}
          onChange={handleChange}
          value={selectedFilter}
        />
      )}
      <Filter onChange={filterDisplayHandler} value={selectedFilterDisplay} /> */}
      {currentItems?.length > 0 ? (
        <React.Fragment>
          <DeactivatedList
            list={currentItems}
            updateDeactivatedUsers={props.updateDeactivatedUsers}
            sortedData={sortedDataToShow()}
          />
          <Pagination
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
          />
        </React.Fragment>
      ) : (
        <h1>No Data to Display</h1>
      )}
    </React.Fragment>
  );
};

export default Deactivated;
