import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
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
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && !isUploading && (
            <img src={`http://localhost:5000/${previewUrl}`} alt="Preview" />
          )}
          {previewUrl && isUploading && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an Image</p>}
        </div>
        {!props.isEditMode && (
          <Button type="button" onClick={pickImageHandler}>
            Pick Image
          </Button>
        )}
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
