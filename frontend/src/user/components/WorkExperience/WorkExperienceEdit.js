import React, { useState, useEffect } from "react";
import Button from "../../../shared/components/FormElements/Button";

import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

const WorkExperienceEdit = (props) => {
  const [salaryGradeList, setSalaryGradeList] = useState([]);
  const [salaryStepList, setSalaryStepList] = useState([]);
  const { isLoading, error, success, sendRequest, clearError, clearSuccess} = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      company: {
        value: props.editData ? props.editData.company : "",
        isValid: false,
      },
      position: {
        value: props.editData ? props.editData.position : "",
        isValid: false,
      },
      department: {
        value: props.editData ? props.editData.department : "",
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
      monthlySalary: {
        value: props.editData ? props.editData.monthlySalary : "",
        isValid: false,
      },
      salaryGrade: {
        value: props.editData ? props.editData.salaryGrade : "",
        isValid: false,
      },
      salaryStep: {
        value: props.editData ? props.editData.salaryStep : "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
      government: {
        value: props.editData ? props.editData.government : "",
        isValid: false,
      },
    },
    false
  );

  let sGrade = [];
  let sStep = [];
  useEffect(() => {
    for (let i = 1; i < 34; i++) {
      if (i < 10) {
        sGrade.push("0" + i);
      } else {
        sGrade.push(i);
      }
    }
    setSalaryGradeList(sGrade);
  }, []);

  useEffect(() => {
    for (let i = 1; i < 9; i++) {
      sStep.push(i);
    }
    setSalaryStepList(sStep);
  }, []);

  const submitAddHandler = async (event) => {
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/addWorkExperience",
        "POST",
        JSON.stringify({
          company : formState.inputs.company.value,
          position : formState.inputs.position.value,
          department  : formState.inputs.department.value,
          fromDate : formState.inputs.fromDate.value,
          toDate : formState.inputs.toDate.value,
          monthlySalary : formState.inputs.monthlySalary.value,
          salaryGrade : formState.inputs.salaryGrade.value,
          salaryStep : formState.inputs.salaryStep.value,
          government : formState.inputs.government.value,
          userId: storedData.userId,
          token: storedData.token
        }),
        { "Content-Type": "application/json" },
    );
    props.setUserData(responseData.WorkExperience, responseData.message);
    props.updateAddModeState();
  };

  const submitEditHandler = async (event) => {
    //For Editing Data
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/editWorkExperience",
        "PATCH",
        
        JSON.stringify({
          company : formState.inputs.company.value,
          position : formState.inputs.position.value,
          department  : formState.inputs.department.value,
          fromDate : formState.inputs.fromDate.value,
          toDate : formState.inputs.toDate.value,
          monthlySalary : formState.inputs.monthlySalary.value,
          salaryGrade : formState.inputs.salaryGrade.value,
          salaryStep : formState.inputs.salaryStep.value,
          government : formState.inputs.government.value,
          userId: storedData.userId,
          token: storedData.token,
          workId : props.editData._id
        }),
        { "Content-Type": "application/json" },
    );
    props.setUserData(responseData.userWork, responseData.message);
    props.updateAddModeState();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={props.addingItem ? submitAddHandler : submitEditHandler}>
        <Input
          element="input"
          id="company"
          type="text"
          label="Company"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.company.value}
          initialValid={formState.inputs.company.isValid}
        />
        <Input
          element="input"
          id="position"
          type="text"
          label="Position"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.position.value}
          initialValid={formState.inputs.position.isValid}
        />
        <Input
          element="input"
          id="department"
          type="text"
          label="Department"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.department.value}
          initialValid={formState.inputs.department.isValid}
        />
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
          id="monthlySalary"
          type="text"
          label="Monthly Salary"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.monthlySalary.value}
          initialValid={formState.inputs.monthlySalary.isValid}
        />
        <Input
          element="select"
          id="salaryGrade"
          type="text"
          label="Salary Grade"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          items={salaryGradeList}
          onInput={inputHandler}
          initialValue={formState.inputs.salaryGrade.value}
          initialValid={formState.inputs.salaryGrade.isValid}
        />
        <Input
          element="select"
          id="salaryStep"
          type="text"
          label="Salary Step"
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          items={salaryStepList}
          onInput={inputHandler}
          initialValue={formState.inputs.salaryStep.value}
          initialValid={formState.inputs.salaryStep.isValid}
        />
        <Input
          element="select"
          id="government"
          type="text"
          label="Government"
          items={['YES', 'NO']}
          validators={[VALIDATOR_OPTIONAL()]}
          errorText="Invalid Email"
          onInput={inputHandler}
          initialValue={formState.inputs.government.value}
          initialValid={formState.inputs.government.isValid}
        />
        <Button inverse type="submit">
          {props.addingItem ? "Add" : "Save"}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default WorkExperienceEdit;
