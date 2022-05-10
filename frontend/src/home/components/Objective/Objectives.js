import React from "react";

import "./Objectives.css";
import ObjectivesEdit from "./ObjectivesEdit";
import ObjectivesItem from "./ObjectivesItem";

const DUMMY_DATA_BLIS = {
  o1: "Provide students with creative works and skills in gathering, organizing, and coordinating access to information sources for the knowledge-based organization and implementing ethical standards through the use of effective communication.",
  o2: "Identify library users’ needs through the use of library automation systems, online collaboration tools, and information technology solutions for sustainable national development.",
  o3: "Participate in continuing education and life-long learning in local, national, and global context through research projects, innovative information systems, and extension services through networking/linkages in response to the needs of the communities and organizations.",
  o4: "Exercise leadership by harnessing a range of historical/cultural documents, and online tools to support instruction, research, and extension services for sustainable development goals.",
};

const DUMMY_DATA_BSIT = {
  o1: "Apply knowledge and technical competencies in various specialization tracks of Information Technology aligned to the responsive region’s specific development needs.",
  o2: "Prepare graduates to address various user needs involved in the selection, development, application, integration, and management of computing technologies within an organization through critical thinking and problem solving, being creative, collaborating, and communication effectively.",
  o3: "Design, implement, and evaluate the local, regional, national, and global impact of information and communications technology through logical writing, making presentations, conducting collaborative research, performing innovative production, rendering extension services, establishing international linkages and partnerships.",
  o4: "Immerse and expose in an actual environment in industry, engage in planning self-learning, and understand professional, ethical, legal, security and social issues and responsibilities in the utilization of information technology towards the realization of sustainable development goals.",
};

const Objectives = (props) => {
  if (props.isEditMode) {
    return <ObjectivesEdit editModeHandler={props.updateEditModeState} />;
  } else {
    return (
      <ObjectivesItem
        item_IT={DUMMY_DATA_BSIT}
        item_BLIS={DUMMY_DATA_BLIS}
        editModeHandler={props.updateEditModeState}
      />
    );
  }
};

export default Objectives;
