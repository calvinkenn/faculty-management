import React from "react";

import DeactivatedList from "./DeactivatedList";

const Deactivated = (props) => {
  return (
    <DeactivatedList
      list={props.deactivatedUserData}
      updateDeactivatedUsers={props.updateDeactivatedUsers}
    />
  );
};

export default Deactivated;
