import React from "react";

import RejectedList from "./RejectedList";

const Rejected = (props) => {
  return (
    <RejectedList
      list={props.rejectedUserData}
      updateRejectedUsers={props.updateRejectedUsers}
    />
  );
};

export default Rejected;
