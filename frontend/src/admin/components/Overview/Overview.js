import React, { useEffect } from "react";
import PrintData, { ComponentToPrint } from "../PrintData/PrintData";

import OverviewList from "./OverviewList";

const Overview = (props) => {
  if (props.isPrintMode) {
    return (
      <div>
        <PrintData activeUserData={props.activeUserData} />
      </div>
    );
  } else {
    return (
      <OverviewList
        activeUserData={props.activeUserData}
        pendingUserData={props.pendingUserData}
        deactivatedUserData={props.deactivatedUserData}
        rejectedUserData={props.rejectedUserData}
      />
    );
  }
};

export default Overview;
