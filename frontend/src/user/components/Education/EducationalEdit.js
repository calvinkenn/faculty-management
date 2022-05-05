import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
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

const EducationalEdit = (props) => {
  const [inputList, setInputList] = useState([{ awards: "" }]);
  const [yearError, setYearError] = useState();
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
        isValid: false,
      },
      school: {
        value: props.editData ? props.editData.school : "",
        isValid: false,
      },
      degree: {
        value: props.editData ? props.editData.degree : "",
        isValid: false,
      },
      fromDate: {
        value: props.editData ? props.editData.fromDate : "",
        isValid: false,
      },
      toDate: {
        value: props.editData ? props.editData.toDate : "",
        isValid: false,
      },
      highestLevel: {
        value: props.editData ? props.editData.highestLevel : "",
        isValid: false,
      },
      yearGraduated: {
        value: props.editData ? props.editData.yearGraduated : "",
        isValid: false,
      },
      awards: {
        value: inputList.length > 1 ? inputList : "",
        isValid: false,
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

  console.log(sortLevel());

  const submitAddHandler = async (event) => {
    //For Adding Data
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    event.preventDefault();

    if (formState.inputs.fromDate.value > formState.inputs.toDate.value) {
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
        fromDate: formState.inputs.fromDate.value,
        toDate: formState.inputs.toDate.value,
        awards: inputList,
        yearGraduated: formState.inputs.yearGraduated.value,
        highestLevel: formState.inputs.highestLevel.value,
        userId: storedData.userId,
        token: storedData.token,
      }),
      { "Content-Type": "application/json" }
    );
    props.setUserData(responseData.userEducation, responseData.message);
    props.updateAddModeState();
  };

  const submitEditHandler = async (event) => {
    //For Editing Data
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    if (formState.inputs.fromDate.value > formState.inputs.toDate.value) {
      setYearError("Please input a valid time period. From - To period");
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
        fromDate: formState.inputs.fromDate.value,
        toDate: formState.inputs.toDate.value,
        awards: inputList,
        yearGraduated: formState.inputs.yearGraduated.value,
        highestLevel: formState.inputs.highestLevel.value,
        educId: props.editData._id,
        userId: storedData.userId,
        token: storedData.token,
      }),
      { "Content-Type": "application/json" }
    );
    props.setUserData(responseData.userEducation, responseData.message);
    props.updateAddModeState();
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
              <h1>Educational Attainment</h1>
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
                  />
                )}
              </div>
            </div>
            <div className="from-to-graduatedyear">
              <Input
                element="year"
                id="fromDate"
                type="number"
                label="From - year"
                validators={[VALIDATOR_MINLENGTH(4)]}
                helperText="Please input the year it started"
                onInput={inputHandler}
                initialValue={formState.inputs.fromDate.value}
                initialValid={formState.inputs.fromDate.isValid}
                required
              />
              <span />
              <Input
                element="year"
                id="toDate"
                type="number"
                label="To - year"
                validators={[VALIDATOR_MINLENGTH(4)]}
                helperText="Please input the year it ended"
                onInput={inputHandler}
                initialValue={formState.inputs.toDate.value}
                initialValid={formState.inputs.toDate.isValid}
                required
              />
              <span />
              <Input
                element="year"
                id="yearGraduated"
                type="number"
                label="Year Graduated"
                validators={[VALIDATOR_MINLENGTH(4)]}
                helperText="Please input the year graduated"
                onInput={inputHandler}
                initialValue={formState.inputs.yearGraduated.value}
                initialValid={formState.inputs.yearGraduated.isValid}
                required
              />
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
                      />
                      <div className="btn-box">
                        {inputList.length !== 1 && (
                          <button
                            className="mr10"
                            onClick={() => handleRemoveClick(i)}
                          >
                            Remove
                          </button>
                        )}
                        {inputList.length - 1 === i && (
                          <button onClick={handleAddClick}>Add</button>
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
