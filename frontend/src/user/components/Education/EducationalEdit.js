import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import AbcIcon from "@mui/icons-material/Abc";
import NumbersIcon from "@mui/icons-material/Numbers";
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../../../shared/components/FormElements/Button";
import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

//mikko is here
import SchoolIcon from "@mui/icons-material/School";
//

const EducationalEdit = (props) => {
  const [inputList, setInputList] = useState([{ awards: "" }]);
  const [yearError, setYearError] = useState();
  const [fromDateVal, setFromDateVal] = useState(new Date());
  const [toDateVal, setToDateVal] = useState(new Date());
  const [yearGraduated, setYearGraduated] = useState(new Date());
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();
  let degree;

  useEffect(() => {
    if (props.editData) {
      setInputList(props.editData.awards); //Set inputList to awards data
    }
  }, []);

  const [formState, inputHandler, setFormData] = useForm(
    {
      level: {
        value: props.editData ? props.editData.level : "",
        isValid: props.editData && props.editData.level ? true : false,
      },
      school: {
        value: props.editData ? props.editData.school : "",
        isValid: props.editData && props.editData.school ? true : false,
      },
      degree: {
        value: props.editData ? props.editData.degree : "",
        isValid: props.editData && props.editData.degree ? true : false,
      },
      highestLevel: {
        value: props.editData ? props.editData.highestLevel : "",
        isValid: props.editData && props.editData.highestLevel ? true : false,
      },
      awards: {
        value: inputList.length > 1 ? inputList : "",
        isValid: inputList.length > 1 ? true : false,
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
    formState.inputs.awards.value = "";
    setInputList([...inputList, { awards: "" }]);
  };

  const sortLevel = () => {
    if (formState.inputs.level.value === "Elementary") {
      return "a";
    } else if (formState.inputs.level.value === "Junior Highschool") {
      return "b";
    } else if (formState.inputs.level.value === "Senior HighSchool") {
      return "c";
    } else if (formState.inputs.level.value === "College") {
      return "d";
    } else if (formState.inputs.level.value === "Graduate Study") {
      return "e";
    }
    return "f";
  };

  const submitAddHandler = async (event) => {
    //For Adding Data
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    event.preventDefault();

    if (fromDateVal.getFullYear() > toDateVal.getFullYear()) {
      setYearError("Please input a valid time period. From - To period");
      return;
    }

    let degreeValue;
    if (!degree) {
      degreeValue = "N/A";
    } else {
      degreeValue = formState.inputs.degree.value;
    }
    const responseData = await sendRequest(
      "http://localhost:5000/api/users/addEducation",
      "POST",

      JSON.stringify({
        sorting: sortLevel(),
        level: formState.inputs.level.value,
        school: formState.inputs.school.value,
        degree: degreeValue,
        fromDate: fromDateVal.getFullYear(),
        toDate: toDateVal.getFullYear(),
        awards: inputList,
        yearGraduated: toDateVal.getFullYear(),
        highestLevel: formState.inputs.highestLevel.value,
        userId: storedData.userId,
        token: storedData.token,
      }),
      { "Content-Type": "application/json" }
    );
    props.setUserData(responseData.userEducation, responseData.message);
    // props.updateAddModeState();
  };

  const submitEditHandler = async (event) => {
    //For Editing Data
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    let fromChecker = fromDateVal;
    let toChecker = toDateVal;
    if (fromDateVal instanceof Date) {
      fromChecker = fromDateVal.getFullYear();
    }
    if (toDateVal instanceof Date) {
      toChecker = toDateVal.getFullYear();
    }
    if (fromChecker > toChecker) {
      setYearError(
        "Please input a valid time period. Year started to Year ended"
      );
      return;
    }

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/updateEducation",
      "PATCH",

      JSON.stringify({
        sorting: sortLevel(),
        level: formState.inputs.level.value,
        school: formState.inputs.school.value,
        degree: formState.inputs.degree.value,
        fromDate:
          fromDateVal instanceof Date ? fromDateVal.getFullYear() : fromDateVal,
        toDate: toDateVal instanceof Date ? toDateVal.getFullYear() : toDateVal,
        awards: inputList,
        yearGraduated:
          toDateVal instanceof Date ? toDateVal.getFullYear() : toDateVal,
        highestLevel: formState.inputs.highestLevel.value,
        educId: props.editData._id,
        userId: storedData.userId,
        token: storedData.token,
      }),
      { "Content-Type": "application/json" }
    );
    props.setUserData(responseData.userEducation, responseData.message);
    // props.updateAddModeState();
  };

  if (
    formState.inputs.level.value === "College" ||
    formState.inputs.level.value === "Vocational/Trade Course" ||
    formState.inputs.level.value === "Graduate Study"
  ) {
    degree = true;
  } else {
    degree = false;
  }

  const clearYearError = () => {
    setYearError("");
  };

  useEffect(() => {
    if (props.editData) {
      setFromDateVal(props.editData.fromDate);
      setToDateVal(props.editData.toDate);
      setYearGraduated(props.editData.yearGraduated);
    }
  }, []);

  return (
    <React.Fragment>
      <ErrorModal
        error={yearError ? yearError : error}
        onClear={yearError ? clearYearError : clearError}
      />
      <form onSubmit={props.addingItem ? submitAddHandler : submitEditHandler}>
        <div className="educ-add-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <SchoolIcon sx={{ fontSize: "30px" }} />
              <h1 className="MarginLang">Educational Attainment</h1>
            </div>
          </div>
          <div className="educ-add-details-cont">
            <div className="level-unit">
              <Input
                element="select"
                id="level"
                type="text"
                label="Level"
                items={[
                  "Elementary",
                  "Junior Highschool",
                  "Senior HighSchool",
                  "College",
                  "Vocational/Trade Course",
                  "Graduate Study",
                ]}
                validators={[VALIDATOR_REQUIRE()]}
                helperText="Please input your educational level"
                onInput={inputHandler}
                initialValue={formState.inputs.level.value}
                initialValid={formState.inputs.level.isValid}
                required
              />
              <span />
              <Input
                element="input"
                id="highestLevel"
                type="text"
                label="Highest Level/Unit Earned"
                validators={[VALIDATOR_REQUIRE()]}
                helperText="Please input your highest level/unit earned"
                onInput={inputHandler}
                initialValue={formState.inputs.highestLevel.value}
                initialValid={formState.inputs.highestLevel.isValid}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StarIcon sx={{ fontSize: "20px" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="school-degree">
              <div className="school">
                <Input
                  element="input"
                  id="school"
                  type="text"
                  label="School"
                  validators={[VALIDATOR_REQUIRE()]}
                  helperText="Please input your school name"
                  onInput={inputHandler}
                  initialValue={formState.inputs.school.value}
                  initialValid={formState.inputs.school.isValid}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon sx={{ fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="degree">
                {degree && (
                  <Input
                    element="input"
                    id="degree"
                    type="text"
                    label="Degree"
                    validators={[VALIDATOR_OPTIONAL()]}
                    errorText="Invalid Email"
                    onInput={inputHandler}
                    initialValue={formState.inputs.degree.value}
                    initialValid={formState.inputs.degree.isValid}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SchoolIcon sx={{ fontSize: "20px" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </div>
            </div>
            <div className="from-to-graduatedyear">
              <DatePicker
                views={["year"]}
                label="Select Year Started"
                value={fromDateVal}
                onChange={(newValue) => {
                  setFromDateVal(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} required helperText={null} />
                )}
              />
              <span />
              <DatePicker
                views={["year"]}
                label="Select Year Ended"
                value={toDateVal}
                onChange={(newValue) => {
                  setToDateVal(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} required helperText={null} />
                )}
              />
              <span />
              {/* <DatePicker
                views={["year"]}
                label="Select Year Graduated"
                value={yearGraduated}
                onChange={(newValue) => {
                  setYearGraduated(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} required helperText={null} />
                )}
              /> */}
            </div>
            <div className="acad-honor">
              {inputList.map((x, i) => {
                return (
                  <div className="awards">
                    <div className="box">
                      <TextField
                        name="awards"
                        id="awards"
                        type="text"
                        label="Academic Honors"
                        value={x.awards}
                        onChange={(e) => handleInputChange(e, i)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmojiEventsIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <div className="btn-box">
                        {inputList.length !== 1 && (
                          <muiBtn
                            type="button"
                            className="mr10"
                            onClick={() => handleRemoveClick(i)}
                          >
                            <IconButton aria-label="delete" size="small">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </muiBtn>
                        )}
                        {inputList.length - 1 === i && (
                          <muiBtn type="button" onClick={handleAddClick}>
                            <IconButton aria-label="add" size="small">
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </muiBtn>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="add-educ-btn">
              <Button inverse type="submit">
                {props.addingItem ? "Add" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EducationalEdit;
