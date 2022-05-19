import React, { useRef, useState, useEffect } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import ProfileUploadModal from "../UIElements/ProfileUploadModal";
import IconButton from "@mui/material/IconButton";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import "./LogoUpload.css";

const LogoUpload = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [isUploading, setIsUploading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filePickerRef = useRef();

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
    console.log("clicked");
    event.preventDefault();
    // console.log(previewUrl);
    // console.log(file);
    try {
      const formData = new FormData();
      formData.append("id", props.id);
      formData.append("headerImage", file);

      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/editLogo", //Change to account
        "PATCH",
        formData
      );
      props.updateLogo(responseData.message);
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
    <div className={`image-upload ${props.center && "center"}`}>
      <div className="image-upload__preview">
        {previewUrl && !isUploading && (
          <img src={`http://localhost:5000/${previewUrl}`} alt="Preview" />
        )}
        {previewUrl && isUploading && <img src={previewUrl} alt="Preview" />}
      </div>
      {!isValid && <p>File type must be png/jpg/jpeg</p>}
      {!isValid && <p>Make sure the file is less than 5mb</p>}
    </div>
  );

  return (
    <div className="form-control">
      {showUploadModal && (
        <ProfileUploadModal
          upload={!file && pickImageHandler}
          buttonType={file ? "submit" : "button"}
          buttonName={file ? "Upload" : "Choose Image"}
          submit={file && submitHandler}
          cancel={cancelUploadHandler}
          display={displayData}
        />
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
          <InsertPhotoIcon fontSize="small" />
        </IconButton>
      </muiBtn>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default LogoUpload;
