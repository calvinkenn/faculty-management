import React, { useState, useEffect } from "react";

import Pagination from "../../../shared/components/Pagination/Pagination";
import Sort from "../../../shared/components/Sort/Sort";
import Filter from "../../../shared/components/Filter/Filter";
import FacultyList from "./FacultyList";
import noData from "../../../assets/Image/no-data-found.png";

const Faculty = (props) => {
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [selectedFilterDisplay, setSelectedFilterDisplay] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  console.log(props.filterValue);
  console.log(props.sortValue);

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

  const filterDisplayHandler = (event) => {
    setSelectedFilterDisplay(event.target.value);
  };

  const filteredDataToDisplay = props.activeUserData
    ?.sort((a, b) => (a[sortedDataToShow()] > b[sortedDataToShow()] ? 1 : -1))
    .filter((activeUser) => {
      if (props.filterValue === 2) {
        return activeUser.faculty.includes("BSIT");
      } else if (props.filterValue === 3) {
        return activeUser.faculty.includes("BLIS");
      } else if (props.filterValue === 4) {
        return activeUser.faculty.includes("ALLIED");
      } else {
        return activeUser;
      }
    });
  console.log("WEW");
  let displayPerPage = 5;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + displayPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(
      sortedDataToShow() === "employeeNum" ||
        sortedDataToShow() === "registrationDate"
        ? filteredDataToDisplay
            ?.sort((a, b) =>
              a[sortedDataToShow()] > b[sortedDataToShow()] ? 1 : -1
            )
            .slice(itemOffset, endOffset)
        : filteredDataToDisplay
            ?.sort((a, b) =>
              a[sortedDataToShow()].toLowerCase() >
              b[sortedDataToShow()].toLowerCase()
                ? 1
                : -1
            )
            .slice(itemOffset, endOffset)
    );
    setPageCount(Math.ceil(filteredDataToDisplay?.length / displayPerPage));
  }, [itemOffset, 5, filteredDataToDisplay?.length, props.sortValue]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * displayPerPage) % filteredDataToDisplay?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="sort-filter-cont">
      <React.Fragment>
        {/* {currentItems?.length > 0 && (
          <Sort
            label={"Sort By"}
            onChange={handleChange}
            value={selectedFilter}
          />
        )} */}
        {/* <Filter onChange={filterDisplayHandler} value={selectedFilterDisplay} /> */}
        {currentItems?.length > 0 ? (
          <div className="faculty-list-cont">
            <React.Fragment>
              <FacultyList
                list={currentItems}
                updateActiveUsers={props.updateActiveUsers}
                sortedData={sortedDataToShow()}
              />
              <Pagination
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
              />
            </React.Fragment>
          </div>
        ) : (
          <div className="no-data-found">
            <img src={noData} />
            <h1>No Data to Display</h1>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export default Faculty;
