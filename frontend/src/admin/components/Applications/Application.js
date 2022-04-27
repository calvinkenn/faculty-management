import React from "react";

import ApplicationList from "./ApplicationList";

const Application = (props) => {

  return <ApplicationList list={props.pendingUserData} updatePendingUsers  = {props.updatePendingUsers}/>;
};

export default Application;
