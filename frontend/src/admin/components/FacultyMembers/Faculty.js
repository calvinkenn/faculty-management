import React from "react";

import FacultyList from "./FacultyList";

const Faculty = (props) => {
  return <FacultyList list={props.activeUserData} updateActiveUsers={props.updateActiveUsers}/>;
};

export default Faculty;
