import React from "react";

import ModalUpload from "./ModalUpload";
import Button from "../FormElements/Button";

const LogoUploadModal = (props) => {
  return (
    <ModalUpload
      onCancel={props.onClear}
      header={"Edit Header"}
      show={!!props.display}
      onSubmit={props.submit}
      upload={
        <Button type={props.buttonType} onClick={props.upload}>
          {props.buttonName}
        </Button>
      }
      save={<Button type="submit">Save</Button>}
      cancel={
        <Button type="button" danger onClick={props.cancel}>
          Cancel
        </Button>
      }
      logo={true}
    >
      <div>
        <center>{props.inputData}</center>
      </div>
      <br />
      <div>{props.display}</div>
    </ModalUpload>
  );
};

export default LogoUploadModal;
