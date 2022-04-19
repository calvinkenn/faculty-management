import React, { useEffect, useState } from "react";

import "./TopActionBarAdmin.css";

const TopActionBarAdmin = (props) => {
  return (
    <div className="top-action">
      <form>
        <input type="text" placeholder="Search..."/>
        {/* <input type="submit" value="Search" /> */}
      </form>
    </div>
  );
};

export default TopActionBarAdmin;
