import React from "react";

import ModalUpload from "./ModalUpload";
import Button from "../FormElements/Button";

const ProfileUploadModal = (props) => {
  return (
    <ModalUpload
      onCancel={props.onClear}
      header="Change Profile"
      show={!!props.display}
      onSubmit={props.submit}
      upload={<Button type="submit">Upload</Button>}
      cancel={
        <Button type="button" onClick={props.cancel}>
          Cancel
        </Button>
      }
    >
      <div>{props.display}</div>
    </ModalUpload>
  );
};

export default ProfileUploadModal;
