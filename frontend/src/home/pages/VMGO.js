import React, { useState, useEffect } from "react";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import SuccessModal from "../../shared/components/UIElements/SuccessModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Goals from "../components/Goals/Goals";
import Mission from "../components/Mission/Mission";
import Objectives from "../components/Objective/Objectives";
import Vision from "../components/Vision/Vision";
import Banner from "../../../src/assets/Image/Banner.png";
import "./VMGO.css";

const VMGO = (props) => {
  const [missionEditMode, setMissionEditMode] = useState(false);
  const [visionEditMode, setVisionEditMode] = useState(false);
  const [goalsEditMode, setGoalsEditMode] = useState(false);
  const [objectivesEditMode, setObjecivesEditMode] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [message, setMessage] = useState("");
  const [vmgoData, setVMGOData] = useState({});

  const missionEditModeHandler = () => {
    setMissionEditMode((prevState) => !prevState);
    setVisionEditMode(false);
    setGoalsEditMode(false);
    setObjecivesEditMode(false);
  };

  const visionEditModeHandler = () => {
    setVisionEditMode((prevState) => !prevState);
    setMissionEditMode(false);
    setGoalsEditMode(false);
    setObjecivesEditMode(false);
  };

  const goalsEditModeHandler = () => {
    setGoalsEditMode((prevState) => !prevState);
    setMissionEditMode(false);
    setVisionEditMode(false);
    setObjecivesEditMode(false);
  };

  const objectivesEditModeHandler = () => {
    setObjecivesEditMode((prevState) => !prevState);
    setMissionEditMode(false);
    setGoalsEditMode(false);
    setVisionEditMode(false);
  };

  const messageHandler = (message) => {
    setMessage(message);
    setMissionEditMode(false);
    setGoalsEditMode(false);
    setVisionEditMode(false);
    setObjecivesEditMode(false);
  };

  useEffect(() => {
    const getVMGOData = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/vmgo/getVMGOData"
        );
        setVMGOData(responseData.vmgo[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getVMGOData();
  }, [message]);

  const clearSuccess = () => {
    setMessage("");
  };

  return (
    <React.Fragment>
      <SuccessModal success={message} onClear={clearSuccess} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="vmgo-main">
        <div className="vmgo-main-container">
          <MainNavigation inVMGO={true} />
          <div className="cict-banner">
            <img src={Banner} />
          </div>
          <div className="vmgo-container">
            <Mission
              isEditMode={missionEditMode}
              updateEditModeState={missionEditModeHandler}
              vmgo={vmgoData}
              messageHandler={messageHandler}
            />
            <Vision
              isEditMode={visionEditMode}
              updateEditModeState={visionEditModeHandler}
              vmgo={vmgoData}
              messageHandler={messageHandler}
            />
            <Goals
              isEditMode={goalsEditMode}
              updateEditModeState={goalsEditModeHandler}
              vmgo={vmgoData}
              messageHandler={messageHandler}
            />
            <Objectives
              isEditMode={objectivesEditMode}
              updateEditModeState={objectivesEditModeHandler}
              vmgo={vmgoData}
              messageHandler={messageHandler}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VMGO;
