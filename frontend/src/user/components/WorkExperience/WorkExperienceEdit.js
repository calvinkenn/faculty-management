import React, { useState, useEffect } from "react";
import Button from "../../../shared/components/FormElements/Button";

import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_OPTIONAL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH
} from "../../../shared/utils/validators";
import "../../components/EditForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

const WorkExperienceEdit = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();
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
        isValid: true,
      },
      salaryStep: {
        value: props.editData ? props.editData.salaryStep : "",
        isValid: true,
      },
      status: {
        value: "",
        isValid: false,
      },
      government: {
        value: props.editData ? props.editData.government : "",
        isValid: true,
      },
    },
    false
  );

  const submitAddHandler = async (event) => {
    event.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/addWorkExperience",
      "POST",
      JSON.stringify({
        company: formState.inputs.company.value,
        position: formState.inputs.position.value,
        department: formState.inputs.department.value,
        fromDate: formState.inputs.fromDate.value,
        toDate: formState.inputs.toDate.value,
        monthlySalary: formState.inputs.monthlySalary.value,
        salaryGrade: formState.inputs.salaryGrade.value,
        salaryStep: formState.inputs.salaryStep.value,
        government: formState.inputs.government.value,
        userId: storedData.userId,
        token: storedData.token,
      }),
      { "Content-Type": "application/json" }
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
        company: formState.inputs.company.value,
        position: formState.inputs.position.value,
        department: formState.inputs.department.value,
        fromDate: formState.inputs.fromDate.value,
        toDate: formState.inputs.toDate.value,
        monthlySalary: formState.inputs.monthlySalary.value,
        salaryGrade: formState.inputs.salaryGrade.value,
        salaryStep: formState.inputs.salaryStep.value,
        government: formState.inputs.government.value,
        userId: storedData.userId,
        token: storedData.token,
        workId: props.editData._id,
      }),
      { "Content-Type": "application/json" }
    );
    props.setUserData(responseData.userWork, responseData.message);
    props.updateAddModeState();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={props.addingItem ? submitAddHandler : submitEditHandler}>
        <div className="work-exp-edit-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <h1>Work Experience</h1>
            </div>
          </div>
          <div className="work-exp-cont">
            <div className="position-cont">
              <Input
                element="input"
                id="position"
                type="text"
                label="Position"
                validators={[VALIDATOR_REQUIRE()]}
                helperText="Please input your position"
                onInput={inputHandler}
                initialValue={formState.inputs.position.value}
                initialValid={formState.inputs.position.isValid}
                required
              />
            </div>
            <div className="company-dept-cont">
              <Input
                element="input"
                id="company"
                type="text"
                label="Company"
                validators={[VALIDATOR_REQUIRE()]}
                helperText="Please input your company"
                onInput={inputHandler}
                initialValue={formState.inputs.company.value}
                initialValid={formState.inputs.company.isValid}
                required
              />
              <span />
              <Input
                element="input"
                id="department"
                type="text"
                label="Department"
                validators={[VALIDATOR_REQUIRE()]}
                helperText="Please input your department"
                onInput={inputHandler}
                initialValue={formState.inputs.department.value}
                initialValid={formState.inputs.department.isValid}
                required
              />
            </div>
            <div className="from-to-govt">
              <Input
                element="input"
                id="fromDate"
                type="number"
                label="From - year"
                validators={[VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(4)]}
                helperText="Please input valid year"
                onInput={inputHandler}
                initialValue={formState.inputs.fromDate.value}
                initialValid={formState.inputs.fromDate.isValid}
                required
              />
              <span />
              <Input
                element="input"
                id="toDate"
                type="number"
                label="To - year"
                validators={[VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(4)]}
                helperText="Please input valid year"
                onInput={inputHandler}
                initialValue={formState.inputs.toDate.value}
                initialValid={formState.inputs.toDate.isValid}
                required
              />
              <span />
              <Input
                element="select"
                id="government"
                type="text"
                label="Government"
                items={["YES", "NO"]}
                validators={[VALIDATOR_OPTIONAL()]}
                errorText="Invalid Email"
                onInput={inputHandler}
                initialValue={formState.inputs.government.value}
                initialValid={formState.inputs.government.isValid}
              />
            </div>
            <div className="salary">
              <Input
                element="input"
                id="monthlySalary"
                type="number"
                label="Monthly Salary"
                validators={[VALIDATOR_REQUIRE()]}
                helperText="Please input valid amount"
                onInput={inputHandler}
                initialValue={formState.inputs.monthlySalary.value}
                initialValid={formState.inputs.monthlySalary.isValid}
                required
              />
              <span />
              <Input
                element="select"
                id="salaryGrade"
                type="text"
                label="Salary Grade"
                validators={[VALIDATOR_OPTIONAL()]}
                errorText="Invalid Email"
                items={Array.from({ length: 33 }, (v, k) => k + 1)}
                onInput={inputHandler}
                initialValue={formState.inputs.salaryGrade.value}
                initialValid={formState.inputs.salaryGrade.isValid}
              />
              <span />
              <Input
                element="select"
                id="salaryStep"
                type="text"
                label="Salary Step"
                validators={[VALIDATOR_OPTIONAL()]}
                errorText="Invalid Email"
                items={Array.from({ length: 8 }, (v, k) => k + 1)}
                onInput={inputHandler}
                initialValue={formState.inputs.salaryStep.value}
                initialValid={formState.inputs.salaryStep.isValid}
              />
            </div>
          </div>
          <div className="work-exp-btn">
            <Button inverse type="submit">
              {props.addingItem ? "Add" : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default WorkExperienceEdit;
