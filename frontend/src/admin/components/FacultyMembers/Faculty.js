import React, { useState } from "react";

import Sort from "../../../shared/components/Sort/Sort";
import Filter from "../../../shared/components/Filter/Filter";
import FacultyList from "./FacultyList";

const Faculty = (props) => {
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [selectedFilterDisplay, setSelectedFilterDisplay] = useState(1);

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const sortedDataToShow = () => {
    if (selectedFilter === 2) {
      return "firstName";
    }
    if (selectedFilter === 3) {
      return "lastName";
    } else {
      return "employeeNum";
    }
  };

  const filterDisplayHandler = (event) => {
    setSelectedFilterDisplay(event.target.value);
  };

  const filteredDataToDisplay = props.activeUserData?.filter((activeUser) => {
    if (selectedFilterDisplay === 2) {
      return activeUser.faculty.includes("BSIT");
    } else if (selectedFilterDisplay === 3) {
      return activeUser.faculty.includes("BLIS");
    } else if (selectedFilterDisplay === 4) {
      return activeUser.faculty.includes("ALLIED");
    } else {
      return activeUser;
    }
  });

  return (
    <React.Fragment>
      <Sort label={"Sort By"} onChange={handleChange} value={selectedFilter} />
      <Filter onChange={filterDisplayHandler} value={selectedFilterDisplay} />
      {filteredDataToDisplay?.length > 0 ? (
        <FacultyList
          list={filteredDataToDisplay}
          updateActiveUsers={props.updateActiveUsers}
          sortedData={sortedDataToShow()}
        />
      ) : (
        <h1>No Data to Display</h1>
      )}
    </React.Fragment>
  );
};

export default Faculty;
