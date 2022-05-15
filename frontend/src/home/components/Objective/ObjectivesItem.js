import React, { useState, useContext } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/FormElements/Button";
import ObjectivesIcon from "../../../assets/Image/objectives.png";
import ObjectivesIcon1 from "../../../assets/Image/objective.png";

const ObjectivesItem = (props) => {
  const auth = useContext(AuthContext);

  const editModeBSITHandler = () => {
    props.editModeHandler(true);
  };

  const editModeBLISHandler = () => {
    props.editModeHandler(false);
  };

  return (
    <div className="objectives-container">
      <div className="bsit-blis-obj">
        <div className="bsit-obj">
          <div className="obj-img">
            <img src={ObjectivesIcon} />
          </div>
          <h1 className="course">
            Bachelor of Science in Information Technology Program Objectives
          </h1>
          <div>The following are the objectives of the BSIT program:</div>
          <div className="enumeration-cont">
            {props.item_IT?.map((item, index) => (
              <span>
                {" "}
                {index + 1}. {item.bsitObjectives}
                <br />
              </span>
            ))}
          </div>
        </div>
        <div className="blis-obj">
          <div className="obj-img">
            <img src={ObjectivesIcon1} />
          </div>
          <h1 className="course">
            Bachelor of Library and Information Science Program Objectives
          </h1>
          <div>The following are the objectives of the BLIS program:</div>
          <div className="enumeration-cont">
            {props.item_BLIS?.map((item, index) => (
              <span>
                {" "}
                {index + 1}. {item.blisObjectives}
                <br />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="obj-edit">
        {auth.isAdmin && <Button onClick={editModeBSITHandler}>Edit BSIT Objectives</Button>}
        {auth.isAdmin && <Button onClick={editModeBLISHandler}>Edit BLIS Objectives</Button>}
      </div>
    </div>
  );
};

export default ObjectivesItem;
