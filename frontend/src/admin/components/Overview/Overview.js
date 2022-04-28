import React, { useEffect } from "react";

import OverviewList from "./OverviewList";

const Overview = (props) => {
  return (
    <OverviewList
      activeUserData={props.activeUserData}
      pendingUserData={props.pendingUserData}
      deactivatedUserData={props.deactivatedUserData}
      rejectedUserData={props.rejectedUserData}
    />
  );
};

export default Overview;
