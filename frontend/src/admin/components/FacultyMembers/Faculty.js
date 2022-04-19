import React from "react";

import FacultyList from "./FacultyList";

const DUMMY_DATA = [
  //REPLACE WITH DATABASE
  {
    employeeNum: "2020123",
    firstName: "Name 1",
    lastName: "Last Name 1",
    profilePic:
      "https://robohash.org/1.png",
  },
  {
    employeeNum: "2020456",
    firstName: "Name 2",
    lastName: "Last Name 2",
    profilePic:
      "https://robohash.org/2.png",
  },
  {
    employeeNum: "2020789",
    firstName: "Name 3",
    lastName: "Last Name 3",
    profilePic:
      "https://robohash.org/3.png",
  },
];

const Faculty = (props) => {
  return <FacultyList list={DUMMY_DATA} />;
};

export default Faculty;
