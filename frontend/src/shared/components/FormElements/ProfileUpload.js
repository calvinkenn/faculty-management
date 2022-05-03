import React, { useRef, useState, useEffect } from "react";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import ProfileUploadModal from "../UIElements/ProfileUploadModal";
import Button from "./Button";
import "./ProfileUpload.css";

const ProfileUpload = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [isUploading, setIsUploading] = useState(true);

  const filePickerRef = useRef();

  useEffect(() => {
    if (props.previewUrl) {
      setPreviewUrl(props.previewUrl);
      setIsUploading(false);
    }
  }, []);

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

  const submitHandler = async (event) => {
    console.log("clicked");
    event.preventDefault();
    // console.log(previewUrl);
    // console.log(file);
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const formData = new FormData();
      formData.append("userId", storedData.userId);
      formData.append("token", storedData.token);
      formData.append("profilePic", file);

      const responseData = await sendRequest(
        "http://localhost:5000/api/users/changeProfilePhoto", //Change to account
        "PATCH",
        formData
      );
      props.updateProfile(responseData.updatedUser, responseData.message);
    } catch (err) {
      console.log(err);
    }
    filePickerRef.current.value = "";
    setFile(null);
    setIsValid(false);
    setIsUploading(false);
    setPreviewUrl("");
  };

  const cancelUploadHandler = () => {
    filePickerRef.current.value = "";
    setFile(null);
    setIsValid(false);
    setIsUploading(false);
    setPreviewUrl("");
  };

  let displayData = (
    <div className={`image-upload ${props.center && "center"}`}>
      <div className="image-upload__preview">
        {previewUrl && isUploading && <img src={previewUrl} alt="Preview" />}
        {!isValid && <p>Make sure the file is less than 5mb</p>}
        {!isValid && <p>File type must be png/jpg/jpeg</p>}
      </div>
    </div>
  );

  return (
    <div className="form-control">
      {file && (
        <ProfileUploadModal
          submit={submitHandler}
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
      {/* <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && !isUploading && (
            <img src={`http://localhost:5000/${previewUrl}`} alt="Preview" />
          )}
          {previewUrl && isUploading && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an Image</p>}
        </div>
      </div> */}
      <Button type="button" onClick={pickImageHandler}>
        Pick Image
      </Button>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ProfileUpload;
