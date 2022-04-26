import React from "react";

import AccountInfoEdit from "./AccountInfoEdit";
import AccountInfoItem from "./AccountInfoItem";

const AccountInfo = (props) => {
  if (props.isEditMode) {
    return (
      <AccountInfoEdit
        userEdit={props.userData}
        setEditMode={props.setEditMode}
      />
    );
  } else {
    return (
      <AccountInfoItem
        isEditMode={props.isEditMode}
        employeeNum={props.userData.employeeNum}
        faculty={props.userData.faculty}
        employmentType={props.userData.employmentType}
        email={props.userData.email}
      />
    );
  }
};

export default AccountInfo;
