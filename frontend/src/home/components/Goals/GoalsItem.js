import React, { useState, useContext } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/FormElements/Button";
import GoalIcon from "../../../assets/Image/goal.png"

const GoalsItem = (props) => {
  const auth = useContext(AuthContext);

  const editModeHandler = () => {
    props.editModeHandler();
  };

  return (
    <div className="goals-container">
      <img src={GoalIcon} />
      <h1>Our Goal</h1>
      <div className="goal-desc-cont">
        To realize the vision and mission of the University, the College commits
        itself to:
      </div>
      {props.item?.map((item, index) => (
        
          <span>{index + 1}.{" "} {item.goals}<br/></span>
      
      ))}
      <div className="goals-edit">
      {auth.isAdmin && <Button onClick={editModeHandler}>Edit</Button>}
      </div>
    </div>
  );
};

export default GoalsItem;
