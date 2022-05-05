import React, { useState } from "react";
import Sort from "../../../shared/components/Sort/Sort";

import FacultyList from "./FacultyList";

const Faculty = (props) => {
  const [selectedFilter, setSelectedFilter] = useState(1);

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

  return (
    <React.Fragment>
      <Sort label={"Sort By"} onChange={handleChange} value={selectedFilter} />
      <FacultyList
        list={props.activeUserData}
        updateActiveUsers={props.updateActiveUsers}
        sortedData={sortedDataToShow()}
      />
    </React.Fragment>
  );
};

export default Faculty;
