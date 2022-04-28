import React, { useEffect, useCallback } from "react";

import OverviewItem from "./OverviewItem";
import "../list.css";

const OverviewList = (props) => {
  let totalBSIT = 0;
  let totalBLIS = 0;
  let totalALLIED = 0;

  props.activeUserData?.map((active) =>
    active.faculty === "BSIT" ? (totalBSIT += 1) : totalBSIT
  );

  props.activeUserData?.map((active) =>
    active.faculty === "BLIS" ? (totalBLIS += 1) : totalBLIS
  );

  props.activeUserData?.map((active) =>
    active.faculty === "ALLIED" ? (totalALLIED += 1) : totalALLIED
  );

  return (
    <div className="list">
      <OverviewItem
        totalActiveAccounts={props.activeUserData?.length}
        totalDeactivatedAccounts={props.deactivatedUserData?.length}
        totalPendingAccounts={props.pendingUserData?.length}
        totalRejectedAccounts={props.rejectedUserData?.length}
        totalBSIT={totalBSIT}
        totalBLIS={totalBLIS}
        totalALLIED={totalALLIED}
      />
    </div>
  );
};

export default OverviewList;
