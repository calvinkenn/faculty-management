import React from "react";

import TrainingList from "./TrainingList";

const DUMMY_DATA = [
  //REPLACE WITH DATABASE
  {
    title: "TEST TITLE 1",
    type: "TEST TYPE 1",
    from: "2020 1",
    to: "2021 1",
    certificate:
      "https://templatelab.com/wp-content/uploads/2018/11/Certificateofcompletion-3-e1542503155589.jpg",
    hours: "5",
    typeOfLD: "Test",
    conducted: "Test",
  },
  {
    title: "TEST TITLE 2",
    type: "TEST TYPE 2",
    from: "2020 2",
    to: "2021 2",
    certificate:
      "https://templatelab.com/wp-content/uploads/2018/11/Certificateofcompletion-3-e1542503155589.jpg",
    hours: "5",
    typeOfLD: "Test",
    conducted: "Test",
  },
];

const Training = (props) => {
  if (props.isEditMode) {
    return <h1>Edit form</h1>;
  } else {
    return <TrainingList list={DUMMY_DATA} />;
  }
};

export default Training;
