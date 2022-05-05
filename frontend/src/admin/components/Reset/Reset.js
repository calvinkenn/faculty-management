import React, { useState } from "react";
import Sort from "../../../shared/components/Sort/Sort";

import ResetList from "./ResetList";

const Reset = (props) => {
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
      <ResetList
        list={props.resetUserData}
        updateResetUsers={props.updateResetUsers}
        sortedData={sortedDataToShow()}
      />
    </React.Fragment>
  );
};

export default Reset;
