import React from "react";

import AccountInfoEdit from "./AccountInfoEdit";
import AccountInfoItem from "./AccountInfoItem";
import PasswordEdit from "./PasswordEdit";

const AccountInfo = (props) => {
  const changePasswordHandler = () => {
    props.changePasswordHandler(true);
  };

  if (props.isEditMode) {
    return (
      <AccountInfoEdit
        userEdit={props.userData}
        setEditMode={props.setEditMode}
      />
    );
  } else if (props.changePassMode) {
    return <PasswordEdit setEditMode={props.setEditMode} />;
  } else {
    return (
      <AccountInfoItem
        changePasswordHandler={changePasswordHandler}
        isEditMode={props.isEditMode}
        profilePic={props.userData.profilePic}
        employeeNum={props.userData.employeeNum}
        faculty={props.userData.faculty}
        employmentType={props.userData.employmentType}
        email={props.userData.email}
        id={props.userData._id}
      />
    );
  }
};

export default AccountInfo;
