import React from "react";

import ResetList from "./ResetList";

const Reset = (props) => {
  return <ResetList list={props.resetUserData} updateResetUsers={props.updateResetUsers}/>;
};

export default Reset;
