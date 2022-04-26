import React from "react";

import TrainingItem from "./TrainingItem";
import "./TrainingList.css";

const TrainingList = (props) => {
  return (
    <div className="training-list">
      {props.list.map((training) => (
        <TrainingItem
          setIsEditModeHandler={props.setIsEditModeHandler}
          title={training.title}
          type={training.type}
          from={training.from}
          to={training.to}
          certificate={training.certificate}
          hours={training.hours}
          typeOfLD={training.typeOfLD}
          conducted={training.conducted}
        />
      ))}
    </div>
  );
};

export default TrainingList;
