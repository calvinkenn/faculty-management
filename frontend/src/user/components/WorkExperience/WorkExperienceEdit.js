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

const WorkExperienceEdit = (props) => {
  const [salaryGradeList, setSalaryGradeList] = useState([]);
  const [salaryStepList, setSalaryStepList] = useState([]);
  const [formState, inputHandler, setFormData] = useForm(
    {
      company: {
        value: "",
        isValid: false,
      },
      position: {
        value: "",
        isValid: false,
      },
      department: {
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
      monthlySalary: {
        value: "",
        isValid: false,
      },
      salaryGrade: {
        value: "",
        isValid: false,
      },
      salaryStep: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
      government: {
        value: "",
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

  const submitAddHandler = (event) => {
    //For Adding Data
    console.log("clicked");
    event.preventDefault();
  };

  const submitEditHandler = (event) => {
    //For Editing Data
    console.log("clicked");
    event.preventDefault();
  };

  return (
    <React.Fragment>
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
          element="input"
          id="government"
          type="text"
          label="Government"
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
