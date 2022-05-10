import React from "react";

import "./Vision.css";
import VisionEdit from "./VisionEdit";
import VisionItem from "./VisionItem";

const DUMMY_DATA = {
  vision:
    "Bulacan State University exists to provide highly competent, ethical and service-oriented professionals that contribute to the sustainable socio-economic growth and development of the nation.",
};

const Vision = (props) => {
  if (props.isEditMode) {
    return <VisionEdit editModeHandler={props.updateEditModeState} />;
  } else {
    return (
      <VisionItem
        item={DUMMY_DATA.vision}
        editModeHandler={props.updateEditModeState}
      />
    );
  }
};

export default Vision;
