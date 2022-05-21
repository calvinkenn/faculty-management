import React from "react";

import TrainingItem from "./TrainingItem";
import "./TrainingList.css";
import noData from "../../../assets/Image/no-data-found.png";

const TrainingList = (props) => {
  if (props.list?.length === 0) {
    return <div className="no-data-found">
      <img src={noData} />
      <h1>No Trainings and Seminars Found</h1>
    </div>;
  }
  return (
    <div className="training-list">
      {props.list
        ?.sort((a, b) => (a.fromDate < b.fromDate ? 1 : -1))
        .map((training) => (
          <TrainingItem
            setUserData={props.setUserData}
            setIsEditModeHandler={props.setIsEditModeHandler}
            title={training.title}
            type={training.type}
            from={training.fromDate}
            to={training.toDate}
            certificatePic={training.certificatePic}
            hours={training.hours}
            typeOfLD={training.typeOfLearning}
            conducted={training.conducted}
            trainingId={training._id}
          />
        ))}
    </div>
  );
};

export default TrainingList;
