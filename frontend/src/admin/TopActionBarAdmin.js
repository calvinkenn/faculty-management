import React, { useEffect, useState } from "react";

import "./TopActionBarAdmin.css";

const TopActionBarAdmin = (props) => {
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
      {props.inOverview && <ul>{props.inOverview && <li>Print</li>}</ul>}
    </div>
  );
};

export default TopActionBarAdmin;
