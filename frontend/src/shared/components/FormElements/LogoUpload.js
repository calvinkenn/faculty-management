import React, { useRef, useState, useEffect } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import "./LogoUpload.css";
import LogoUploadModal from "../UIElements/LogoUploadModal";
import Input from "./Input";
import { VALIDATOR_OPTIONAL } from "../../utils/validators";
import { useForm } from "../../hooks/form-hook";

const LogoUpload = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  //File 1
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [isUploading, setIsUploading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filePickerRef = useRef();

  const [formState, inputHandler, setFormData] = useForm(
    {
      headerText: {
        value: props.headerText ? props.headerText : "CICT",
        isValid: true,
      },
    },
    false
  );

  useEffect(() => {
    if (props.previewUrl) {
      setPreviewUrl(props.previewUrl);
      setIsUploading(false);
    }
  }, [showUploadModal]);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setIsUploading(true);
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    // props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const showModal = () => {
    setShowUploadModal(true);
  };

  const submitHandler = async (event) => {
    console.log("clicked save");
    event.preventDefault();

    console.log(file !== null ? true : false);

    try {
      if (file !== null) {
        const formData = new FormData();
        formData.append("id", props.id);
        formData.append("headerText", formState.inputs.headerText.value);
        formData.append("headerImage", file);

        const responseData = await sendRequest(
          "http://localhost:5000/api/admin/editLogo", //Change to account
          "PATCH",
          formData
        );
        props.update(responseData.message);
      } else {
        const responseData = await sendRequest(
          "http://localhost:5000/api/admin/editHeaderText", //Change to account
          "PATCH",
          JSON.stringify({
            id: props.id,
            headerText: formState.inputs.headerText.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        props.update(responseData.message);
      }
    } catch (err) {
      console.log(err);
    }

    filePickerRef.current.value = "";
    setFile(null);
    setIsValid(false);
    setIsUploading(false);
    setPreviewUrl("");

    setShowUploadModal(false);
  };

  const cancelUploadHandler = () => {
    filePickerRef.current.value = "";
    setFile(null);
    setIsValid(false);
    setIsUploading(false);
    setPreviewUrl("");

    setShowUploadModal(false);
  };

  let displayData = (
    <div className={`logo-upload ${props.center && "center"}`}>
      <div className="logo-upload__preview">
        <div>
          {previewUrl && !isUploading && (
            <img src={`http://localhost:5000/${previewUrl}`} alt="Preview" />
          )}
          {previewUrl && isUploading && <img src={previewUrl} alt="Preview" />}
        </div>
      </div>
      {!isValid && <p>File type must be png/jpg/jpeg</p>}
      {!isValid && <p>Make sure the file is less than 5mb</p>}
    </div>
  );

  let inputData = (
    <Input
      element="textarea"
      id="headerText"
      type="text"
      label="Header Text"
      validators={[VALIDATOR_OPTIONAL()]}
      helperText="Please input header"
      onInput={inputHandler}
      initialValue={props.headerText ? props.headerText : ""}
      initialValid={formState.inputs.headerText.isValid}
      required
      width={450}
      minRows={2}
    />
  );

  return (
    <div className="form-control">
      {showUploadModal && (
        <React.Fragment>
          <LogoUploadModal
            upload={pickImageHandler}
            buttonType={"button"}
            buttonName={"Choose Logo"}
            submit={submitHandler}
            cancel={cancelUploadHandler}
            display={displayData}
            inputData={inputData}
          />
        </React.Fragment>
      )}
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      {/* <Button type="button" onClick={showModal}>
        Pick Image
      </Button> */}
      <muiBtn type="button" onClick={showModal}>
        <IconButton aria-label="photo" size="small">
          <EditIcon fontSize="medium" />
        </IconButton>
      </muiBtn>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default LogoUpload;
