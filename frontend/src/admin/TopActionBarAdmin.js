import React, { useEffect, useState } from "react";

import "./TopActionBarAdmin.css";

const TopActionBarAdmin = (props) => {
  const [isPrintMode, setIsPrintMode] = useState(props.isPrintMode);

  const printHandle = () => {
    props.printMode();
  };

  return (
    <div className="top-action">
      {!props.inOverview && (
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={props.searchValue}
            onChange={props.onSearchChange}
          />
        </form>
      )}
      {props.inOverview && (
        <ul>
          {props.inOverview && !props.isPrintMode && <li onClick={printHandle}>Print</li>}
          {props.inOverview && props.isPrintMode && (
            <li onClick={printHandle}>Cancel</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TopActionBarAdmin;
