import React from "react";

import ApplicationList from "./ApplicationList";

const DUMMY_DATA = [
  //REPLACE WITH DATABASE
  {
    employeeNum: "2020123",
    firstName: "Name 1",
    lastName: "Last Name 1",
    date: "2021-02-05"
  },
  {
    employeeNum: "2020456",
    firstName: "Name 2",
    lastName: "Last Name 2",
    date: "2021-02-05"
  },
  {
    employeeNum: "2020789",
    firstName: "Name 3",
    lastName: "Last Name 3",
    date: "2021-02-05"
  },
];

const Application = (props) => {
  return <ApplicationList list={DUMMY_DATA} />;
};

export default Application;
