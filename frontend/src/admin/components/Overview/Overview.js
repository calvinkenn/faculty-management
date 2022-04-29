import React, { useState } from "react";
import PrintModal from "../../../shared/components/UIElements/PrintModal";
import PrintData, { ComponentToPrint } from "../PrintData/PrintData";

import OverviewList from "./OverviewList";

const Overview = (props) => {
  // const [errorM, setErrorM] = useState(null);
  // const clearError = () => {
  //   setErrorM(null);
  // };

  if (props.isPrintMode) {
    return (
      <div>
        <PrintData activeUserData={props.activeUserData} />
      </div>
    );
  } else {
    return (
      <React.Fragment>
        {/* {props.isPrintMode && (
        <PrintModal activeUserData={props.activeUserData} onClear={props.printModeHandler} />
      )} */}
        <OverviewList
          activeUserData={props.activeUserData}
          pendingUserData={props.pendingUserData}
          deactivatedUserData={props.deactivatedUserData}
          rejectedUserData={props.rejectedUserData}
        />
      </React.Fragment>
    );
  }
};

export default Overview;
