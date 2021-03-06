import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AbcIcon from "@mui/icons-material/Abc";
import NumbersIcon from "@mui/icons-material/Numbers";
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import HeightIcon from '@mui/icons-material/Height';
import PlaceIcon from '@mui/icons-material/Place';

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";

//mikko is here
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
//end

const BasicInfoEdit = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [inputList, setInputList] = useState([{ extensionName: "" }]);

  useEffect(() => {
    if (props.userEdit) {
      if (props.userEdit.extensionName?.length > 0) {
        setInputList(props.userEdit.extensionName); //Set inputList to extension Name data
      }
    }
    console.log(props.userEdit.extensionName?.length);
  }, []);

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: props.userEdit.firstName,
        isValid: props.userEdit.firstName ? true : false,
      },
      middleName: {
        value: props.userEdit.middleName,
        isValid: true,
      },
      lastName: {
        value: props.userEdit.lastName,
        isValid: props.userEdit.lastName ? true : false,
      },
      suffixName: {
        value: props.userEdit.suffixName,
        isValid: true,
      },
      extensionName: {
        value: inputList.length > 1 ? inputList : "",
        isValid: inputList.length > 1 ? true : false,
      },
      bday: {
        value: props.userEdit.birthday
          ? props.userEdit.birthday.substring(0, 10)
          : "",
        isValid: props.userEdit.birthday ? true : false,
      },
      placeofBirth: {
        value: props.userEdit.placeofBirth,
        isValid: props.userEdit.placeofBirth ? true : false,
      },
      gender: {
        value: props.userEdit.gender,
        isValid: props.userEdit.gender ? true : false,
      },
      civilStatus: {
        value: props.userEdit.civilStatus,
        isValid: props.userEdit.civilStatus ? true : false,
      },
      height: {
        value: props.userEdit.height,
        isValid: true,
      },
      weight: {
        value: props.userEdit.weight,
        isValid: true,
      },
      bloodType: {
        value: props.userEdit.bloodType,
        isValid: true,
      },
      gssId: {
        value: props.userEdit.gssId,
        isValid: props.userEdit.pagibigId ? true : false,
      },
      pagibigId: {
        value: props.userEdit.pagibigId,
        isValid: props.userEdit.pagibigId ? true : false,
      },
      philHealthId: {
        value: props.userEdit.philHealthId,
        isValid: props.userEdit.philHealthId ? true : false,
      },
      sssNo: {
        value: props.userEdit.sssNo,
        isValid: props.userEdit.sssNo ? true : false,
      },
      tinNo: {
        value: props.userEdit.tinNo,
        isValid: props.userEdit.tinNo ? true : false,
      },
      citizenship: {
        value: props.userEdit.citizenship,
        isValid: true,
      },
    },
    false
  );

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    formState.inputs.extensionName.value = "";
    setInputList([...inputList, { extensionName: "" }]);
  };

  const submitHandler = async (event) => {
    console.log("clicked");
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/editBasicInfo",
        "PATCH",
        JSON.stringify({
          userId: storedData.userId,
          token: storedData.token,
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          middleName: formState.inputs.middleName.value,
          suffixName: formState.inputs.suffixName.value,
          extensionName: inputList,
          birthday: formState.inputs.bday.value,
          placeofBirth: formState.inputs.placeofBirth.value,
          gender: formState.inputs.gender.value,
          civilStatus: formState.inputs.civilStatus.value,
          height: formState.inputs.height.value,
          weight: formState.inputs.weight.value,
          bloodType: formState.inputs.bloodType.value,
          gssId: formState.inputs.gssId.value,
          pagibigId: formState.inputs.pagibigId.value,
          philHealthId: formState.inputs.philHealthId.value,
          sssNo: formState.inputs.sssNo.value,
          tinNo: formState.inputs.tinNo.value,
          citizenship: formState.inputs.citizenship.value,
          // email : formState.inputs.email.value
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.setEditMode(responseData.updatedUser, responseData.message);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="basic-info-cont">
        <form onSubmit={submitHandler}>
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <AccountCircleIcon sx={{ fontSize: "30px" }} />
              <h1 className="MarginLang">Employee Name</h1>
            </div>
          </div>
          <div className="name-detail-cont">
            <div className="name-edit-cont">
              <div className="first-mid-name-cont">
                <Input
                  element="input"
                  id="firstName"
                  type="text"
                  label="First Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input your first name"
                  onInput={inputHandler}
                  initialValue={formState.inputs.firstName.value}
                  initialValid={formState.inputs.firstName.isValid}
                  required
                />
                <span />
                <Input
                  element="input"
                  id="middleName"
                  type="text"
                  label="Middle Name"
                  validators={[VALIDATOR_OPTIONAL()]}
                  errorText="Invalid Email"
                  onInput={inputHandler}
                  initialValue={formState.inputs.middleName.value}
                  initialValid={formState.inputs.middleName.isValid}
                />
              </div>
              <div className="last-suffix-name-cont">
                <Input
                  element="input"
                  id="lastName"
                  type="text"
                  label="Last Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input your last name"
                  onInput={inputHandler}
                  initialValue={formState.inputs.lastName.value}
                  initialValid={formState.inputs.lastName.isValid}
                  required
                />
                <span />
                <Input
                  element="input"
                  id="suffixName"
                  type="text"
                  label="Suffix Name (Ex. Jr. Sr. III)"
                  validators={[VALIDATOR_OPTIONAL()]}
                  errorText="Invalid Email"
                  onInput={inputHandler}
                  initialValue={formState.inputs.suffixName.value}
                  initialValid={formState.inputs.suffixName.isValid}
                />
              </div>
            </div>
          </div>

          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <LibraryBooksIcon sx={{ fontSize: "30px" }} />
              <h1 className="MarginLang">Personal Information</h1>
            </div>
          </div>
          <div className="personal-info-detail-cont">
            <div className="personal-info-edit">
              <div className="bday-place-citizenship">
                <Input
                  element="input"
                  id="bday"
                  type="date"
                  label="Birthday"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input your birthday"
                  onInput={inputHandler}
                  initialValue={formState.inputs.bday.value}
                  initialValid={formState.inputs.bday.isValid}
                  required
                />
                <span />
                <Input
                  element="input"
                  id="placeofBirth"
                  type="text"
                  label="Place of Birth"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input your place of birth"
                  onInput={inputHandler}
                  initialValue={formState.inputs.placeofBirth.value}
                  initialValid={formState.inputs.placeofBirth.isValid}
                  required
                  InputProps={{
                    startAdornment: (
                      <p>
                        <InputAdornment className="WEW" position="start">
                          <PlaceIcon sx={{ fontSize: "20px" }}/>
                        </InputAdornment>
                      </p>
                    ),
                  }}
                />
                <span />
                <Input
                  element="select"
                  id="citizenship"
                  type="text"
                  label="Citizenship"
                  validators={[VALIDATOR_OPTIONAL()]}
                  errorText="Invalid Email"
                  items={["Filipino", "Other"]}
                  defaultValue="Filipino"
                  onInput={inputHandler}
                  initialValue={formState.inputs.citizenship.value}
                  initialValid={formState.inputs.citizenship.isValid}
                />
              </div>
              <div className="gender-civil">
                <Input
                  element="select"
                  id="gender"
                  type="text"
                  label="Gender"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input your gender"
                  items={["Male", "Female", "Other"]}
                  onInput={inputHandler}
                  initialValue={formState.inputs.gender.value}
                  initialValid={formState.inputs.gender.isValid}
                  required
                />
                <span />
                <Input
                  element="select"
                  id="civilStatus"
                  type="text"
                  label="Civil Status"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input your civil status"
                  items={[
                    "Single",
                    "Married",
                    "Widowed",
                    "Divorced",
                    "Separated",
                  ]}
                  onInput={inputHandler}
                  initialValue={formState.inputs.civilStatus.value}
                  initialValid={formState.inputs.civilStatus.isValid}
                  required
                />
              </div>
              <div className="height-weight-bloodtype">
                <Input
                  element="input"
                  id="height"
                  type="number"
                  label="Height - ft/inches"
                  validators={[VALIDATOR_OPTIONAL()]}
                  errorText="Invalid Email"
                  onInput={inputHandler}
                  initialValue={formState.inputs.height.value}
                  initialValid={formState.inputs.height.isValid}
                  InputProps={{
                    startAdornment: (
                      <p>
                        <InputAdornment className="WEW" position="start">
                          <HeightIcon sx={{ fontSize: "20px" }}/>
                        </InputAdornment>
                      </p>
                    ),
                  }}
                />
                <span />
                <Input
                  element="input"
                  id="weight"
                  type="number"
                  label="Weight - kg"
                  validators={[VALIDATOR_OPTIONAL()]}
                  errorText="Invalid Email"
                  onInput={inputHandler}
                  initialValue={formState.inputs.weight.value}
                  initialValid={formState.inputs.weight.isValid}
                  InputProps={{
                    startAdornment: (
                      <p>
                        <InputAdornment className="WEW" position="start">
                          <MonitorWeightIcon sx={{ fontSize: "20px" }}/>
                        </InputAdornment>
                      </p>
                    ),
                  }}
                />
                <span />
                <Input
                  element="select"
                  id="bloodType"
                  type="text"
                  label="Blood Type"
                  validators={[VALIDATOR_OPTIONAL()]}
                  errorText="Invalid Email"
                  items={[
                    "Type AB+",
                    "Type AB-",
                    "Type A+",
                    "Type A-",
                    "Type B+",
                    "Type B-",
                    "Type O+",
                    "Type O-",
                  ]}
                  onInput={inputHandler}
                  initialValue={formState.inputs.bloodType.value}
                  initialValid={formState.inputs.bloodType.isValid}
                />
              </div>
            </div>
          </div>

          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <FeaturedVideoIcon sx={{ fontSize: "30px" }} />
              <h1 className="MarginLang">Government Issued ID</h1>
            </div>
          </div>

          <div className="gov-id-detail-cont">
            <div className="gov-id-edit">
              <Input
                element="input"
                id="gssId"
                type="number"
                label="GSIS ID"
                validators={[VALIDATOR_MINLENGTH(11), VALIDATOR_MAXLENGTH(11)]}
                helperText="Please input a valid GSIS ID number"
                onInput={inputHandler}
                initialValue={formState.inputs.gssId.value}
                initialValid={formState.inputs.gssId.isValid}
                InputProps={{
                  startAdornment: (
                    <p>
                      <InputAdornment className="WEW" position="start">
                        <NumbersIcon sx={{ fontSize: "20px" }}/>
                      </InputAdornment>
                    </p>
                  ),
                }}
              />
              <span />
              <Input
                element="input"
                id="pagibigId"
                type="number"
                label="Pagibig ID"
                validators={[VALIDATOR_MINLENGTH(12), VALIDATOR_MAXLENGTH(12)]}
                helperText="Please input a valid Pag-Ibig ID number"
                onInput={inputHandler}
                initialValue={formState.inputs.pagibigId.value}
                initialValid={formState.inputs.pagibigId.isValid}
                InputProps={{
                  startAdornment: (
                    <p>
                      <InputAdornment className="WEW" position="start">
                        <NumbersIcon sx={{ fontSize: "20px" }} />
                      </InputAdornment>
                    </p>
                  ),
                }}
              />
              <span />
              <Input
                element="input"
                id="philHealthId"
                type="number"
                label="Philhealth"
                validators={[VALIDATOR_MINLENGTH(12), VALIDATOR_MAXLENGTH(12)]}
                helperText="Please input a valid Philhealth ID number"
                onInput={inputHandler}
                initialValue={formState.inputs.philHealthId.value}
                initialValid={formState.inputs.philHealthId.isValid}
                InputProps={{
                  startAdornment: (
                    <p>
                      <InputAdornment className="WEW" position="start">
                        <NumbersIcon sx={{ fontSize: "20px" }}/>
                      </InputAdornment>
                    </p>
                  ),
                }}
              />
              <span />
              <Input
                element="input"
                id="sssNo"
                type="number"
                label="SSS No."
                validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(10)]}
                helperText="Please input a valid SSS ID number"
                onInput={inputHandler}
                initialValue={formState.inputs.sssNo.value}
                initialValid={formState.inputs.sssNo.isValid}
                InputProps={{
                  startAdornment: (
                    <p>
                      <InputAdornment className="WEW" position="start">
                        <NumbersIcon sx={{ fontSize: "20px" }}/>
                      </InputAdornment>
                    </p>
                  ),
                }}
              />
              <span />
              <Input
                element="input"
                id="tinNo"
                type="number"
                label="TIN No."
                validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(10)]}
                helperText="Please input a valid TIN number"
                onInput={inputHandler}
                initialValue={formState.inputs.tinNo.value}
                initialValid={formState.inputs.tinNo.isValid}
                InputProps={{
                  startAdornment: (
                    <p>
                      <InputAdornment className="WEW" position="start">
                        <NumbersIcon sx={{ fontSize: "20px" }}/>
                      </InputAdornment>
                    </p>
                  ),
                }}
              />
            </div>
          </div>
          <div className="edit-submit-btn">
            <Button inverse type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default BasicInfoEdit;
