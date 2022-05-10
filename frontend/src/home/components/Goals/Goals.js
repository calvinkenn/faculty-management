import React from "react";

import "./Goals.css";
import GoalsEdit from "./GoalsEdit";
import GoalsItem from "./GoalsItem";

const DUMMY_DATA = {
  goal: "To realize the vision and mission of the University, the College commits itself to:",
  g1: "Produce globally competent, innovative, and ethically responsible computing and Library and Information Science professionals responsive to the challenges of society’s changing needs;",
  g2: "Prepare students with quality education in information service, historical and cultural access including current and emerging technologies through excellent instruction, collaborative research, innovative production, and community partnerships;",
  g3: "Engage in responsive research programs and quality technology-based extension services delivery with the industry-partners, government organizations, private sectors, educational institutions and other collaborators to foster strong international linkages and partnerships; and",
  g4: "Provide faculty and staff development programs to capacitate and create an avenue to contribute to the emerging social, economic and environmental issues of the region and encourage students towards innovation, entrepreneurship, and networking.",
};

const Goals = (props) => {
  if (props.isEditMode) {
    return <GoalsEdit editModeHandler={props.updateEditModeState} />;
  } else {
    return (
      <GoalsItem
        item={DUMMY_DATA}
        editModeHandler={props.updateEditModeState}
      />
    );
  }
};

export default Goals;
