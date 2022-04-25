import { TextField } from "@mui/material";
import React, { useState } from "react";
import Button from "../../../shared/components/FormElements/Button";

import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";

const EducationalEdit = (props) => {
  const [inputList, setInputList] = useState([{ awards: "" }]);
  const [formState, inputHandler, setFormData] = useForm(
    {
      level: {
        value: "",
        isValid: false,
      },
      school: {
        value: "",
        isValid: false,
      },
      degree: {
        value: "",
        isValid: false,
      },
      fromDate: {
        value: "",
        isValid: false,
      },
      toDate: {
        value: "",
        isValid: false,
      },
      yearGraduated: {
        value: "",
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
    console.log(formState.inputs.awards.value);
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

  const submitHandler = (event) => {
    console.log(inputList);
    console.log("clicked");
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
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
            "Vocational",
          ]}
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.level.value}
          initialValid={formState.inputs.level.isValid}
        />
        <Input
          element="input"
          id="school"
          type="text"
          label="School"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.school.value}
          initialValid={formState.inputs.school.isValid}
        />
        {formState.inputs.level.value === "College" && (
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
          />
        )}
        <Input
          element="input"
          id="fromDate"
          type="text"
          label="From"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.fromDate.value}
          initialValid={formState.inputs.fromDate.isValid}
        />
        <Input
          element="input"
          id="toDate"
          type="text"
          label="To"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.toDate.value}
          initialValid={formState.inputs.toDate.isValid}
        />
        <Input
          element="input"
          id="yearGraduated"
          type="text"
          label="Year Graduated"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.yearGraduated.value}
          initialValid={formState.inputs.yearGraduated.isValid}
        />
        <br />
        {inputList.map((x, i) => {
          return (
            <div className="box">
              <TextField
                name="awards"
                type="text"
                placeholder="Awards"
                value={x.awards}
                onChange={(e) => handleInputChange(e, i)}
              />
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <button className="mr10" onClick={() => handleRemoveClick(i)}>
                    Remove
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button onClick={handleAddClick}>Add</button>
                )}
              </div>
            </div>
          );
        })}
        <Button inverse type="submit">
          {props.isEditMode ? "Save" : "Add"}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default EducationalEdit;
