import React, { useState } from "react";

import Sort from "../../../shared/components/Sort/Sort";
import Filter from "../../../shared/components/Filter/Filter";
import DeactivatedList from "./DeactivatedList";

const Deactivated = (props) => {
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

  const filteredDataToDisplay = props.deactivatedUserData?.filter((user) => {
    if (selectedFilterDisplay === 2) {
      return user.faculty.includes("BSIT");
    } else if (selectedFilterDisplay === 3) {
      return user.faculty.includes("BLIS");
    } else if (selectedFilterDisplay === 4) {
      return user.faculty.includes("ALLIED");
    } else {
      return user;
    }
  });

  return (
    <React.Fragment>
      {filteredDataToDisplay?.length > 0 && (
        <Sort
          label={"Sort By"}
          onChange={handleChange}
          value={selectedFilter}
        />
      )}
      {filteredDataToDisplay?.length > 0 && (
        <Filter onChange={filterDisplayHandler} value={selectedFilterDisplay} />
      )}
      {filteredDataToDisplay?.length > 0 ? (
        <DeactivatedList
          list={filteredDataToDisplay}
          updateDeactivatedUsers={props.updateDeactivatedUsers}
          sortedData={sortedDataToShow()}
        />
      ) : (
        <h1>No Data to Display</h1>
      )}
    </React.Fragment>
  );
};

export default Deactivated;
