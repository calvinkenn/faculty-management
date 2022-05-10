import React, { useState } from "react";

import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Goals from "../components/Goals/Goals";
import Mission from "../components/Mission/Mission";
import Objectives from "../components/Objective/Objectives";
import Vision from "../components/Vision/Vision";
import "./VMGO.css";

const VMGO = (props) => {
  const [missionEditMode, setMissionEditMode] = useState(false);
  const [visionEditMode, setVisionEditMode] = useState(false);
  const [goalsEditMode, setGoalsEditMode] = useState(false);
  const [objectivesEditMode, setObjecivesEditMode] = useState(false);

  const missionEditModeHandler = () => {
    setMissionEditMode((prevState) => !prevState);
  };

  const visionEditModeHandler = () => {
    setVisionEditMode((prevState) => !prevState);
  };

  const goalsEditModeHandler = () => {
    setGoalsEditMode((prevState) => !prevState);
  };

  const objectivesEditModeHandler = () => {
    setObjecivesEditMode((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <div className="vmgo-main">
        <div className="vmgo-main-container">
          <MainNavigation inVMGO={true} />
          <div className="vmgo-container">
            <Mission
              isEditMode={missionEditMode}
              updateEditModeState={missionEditModeHandler}
            />
            <Vision
              isEditMode={visionEditMode}
              updateEditModeState={visionEditModeHandler}
            />
            <Goals
              isEditMode={goalsEditMode}
              updateEditModeState={goalsEditModeHandler}
            />
            <Objectives
              isEditMode={objectivesEditMode}
              updateEditModeState={objectivesEditModeHandler}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VMGO;
