import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControlLabel, Checkbox, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AbcIcon from "@mui/icons-material/Abc";
import NumbersIcon from "@mui/icons-material/Numbers";
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';

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

//Mikko is here
import WorkIcon from "@mui/icons-material/Work";
//end

const WorkExperienceEdit = (props) => {
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();
  const [yearError, setYearError] = useState();
  const [fromDateVal, setFromDateVal] = useState(new Date());
  const [toDateVal, setToDateVal] = useState(new Date());
  const [inPresent, setInPresent] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      company: {
        value: props.editData ? props.editData.company : "",
        isValid: props.editData && props.editData.company ? true : false,
      },
      position: {
        value: props.editData ? props.editData.position : "",
        isValid: props.editData && props.editData.position ? true : false,
      },
      department: {
        value: props.editData ? props.editData.department : "",
        isValid: props.editData && props.editData.department ? true : false,
      },
      statusOfAppointment: {
        value: props.editData ? props.editData.statusOfAppointment : "",
        isValid:
          props.editData && props.editData.statusOfAppointment ? true : false,
      },
      monthlySalary: {
        value: props.editData ? props.editData.monthlySalary : "",
        isValid: props.editData && props.editData.monthlySalary ? true : false,
      },
      salaryGrade: {
        value: props.editData ? props.editData.salaryGrade : "",
        isValid: true,
      },
      salaryStep: {
        value: props.editData ? props.editData.salaryStep : "",
        isValid: true,
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

    if (
      fromDateVal.getFullYear() > toDateVal.getFullYear() &&
      inPresent === false
    ) {
      setYearError("Please input a valid time period. From - To period");
      return;
    }

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/addWorkExperience",
      "POST",
      JSON.stringify({
        company: formState.inputs.company.value,
        position: formState.inputs.position.value,
        department: formState.inputs.department.value,
        fromDate: fromDateVal,
        toDate: inPresent ? "Present" : toDateVal,
        monthlySalary: formState.inputs.monthlySalary.value,
        salaryGrade: formState.inputs.salaryGrade.value,
        salaryStep: formState.inputs.salaryStep.value,
        government: formState.inputs.government.value,
        statusOfAppointment: formState.inputs.statusOfAppointment.value,
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

    let fromChecker = fromDateVal;
    let toChecker = toDateVal;
    if (fromDateVal instanceof Date) {
      fromChecker = fromDateVal.getFullYear();
    }
    if (toDateVal instanceof Date) {
      toChecker = toDateVal.getFullYear();
    }
    if (fromChecker > toChecker && inPresent === false) {
      setYearError(
        "Please input a valid time period. Year started to Year ended"
      );
      return;
    }

    const responseData = await sendRequest(
      "http://localhost:5000/api/users/editWorkExperience",
      "PATCH",

      JSON.stringify({
        company: formState.inputs.company.value,
        position: formState.inputs.position.value,
        department: formState.inputs.department.value,
        fromDate: fromDateVal,
        toDate: inPresent ? "Present" : toDateVal,
        monthlySalary: formState.inputs.monthlySalary.value,
        salaryGrade: formState.inputs.salaryGrade.value,
        salaryStep: formState.inputs.salaryStep.value,
        government: formState.inputs.government.value,
        statusOfAppointment: formState.inputs.statusOfAppointment.value,
        userId: storedData.userId,
        token: storedData.token,
        workId: props.editData._id,
      }),
      { "Content-Type": "application/json" }
    );
    props.setUserData(responseData.userWork, responseData.message);
    // props.updateAddModeState();
  };

  const clearYearError = () => {
    setYearError("");
  };

  useEffect(() => {
    if (props.editData) {
      setFromDateVal(props.editData.fromDate);
      setToDateVal(
        props.editData.toDate.toString() === "Present"
          ? new Date()
          : props.editData.toDate
      );
      setInPresent(
        props.editData.toDate.toString() === "Present" ? true : false
      );
    }
  }, []);

  const sameAsResidentHandler = (event) => {
    setInPresent(event.target.checked);
  };

  return (
    <React.Fragment>
      <ErrorModal
        error={yearError ? yearError : error}
        onClear={yearError ? clearYearError : clearError}
      />
      <form onSubmit={props.addingItem ? submitAddHandler : submitEditHandler}>
        <div className="work-exp-edit-cont">
          <div className="name-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <WorkIcon sx={{ fontSize: "30px" }} />
              <h1 className="MarginLang">Work Experience</h1>
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
                InputProps={{
                  startAdornment: (
                    <p>
                      <InputAdornment position="start">
                        <AbcIcon sx={{ fontSize: "30px" }}/>
                      </InputAdornment>
                    </p>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <p>
                      <InputAdornment position="start">
                        <AbcIcon sx={{ fontSize: "30px" }}/>
                      </InputAdornment>
                    </p>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <p>
                      <InputAdornment position="start">
                        <AbcIcon sx={{ fontSize: "30px" }} />
                      </InputAdornment>
                    </p>
                  ),
                }}
              />
            </div>
            <div className="status-of-apt">
              <Input
                element="select"
                id="statusOfAppointment"
                type="text"
                label="Status of Appointment"
                items={[
                  "Permanent",
                  "Temporary",
                  "Coterminous",
                  "Fixed term",
                  "Contractual",
                  "Substitute",
                  "Provisional",
                ]}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please input your status of appointment"
                onInput={inputHandler}
                initialValue={formState.inputs.statusOfAppointment.value}
                initialValid={formState.inputs.statusOfAppointment.isValid}
                required
              />
              <span />
              <Input
                element="select"
                id="government"
                type="text"
                label="Government"
                items={["Yes", "No"]}
                validators={[VALIDATOR_OPTIONAL()]}
                errorText="Invalid Email"
                onInput={inputHandler}
                initialValue={formState.inputs.government.value}
                initialValid={formState.inputs.government.isValid}
                required
              />
            </div>
            <div className="from-to-govt">
              <DatePicker
                views={["year", "month"]}
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
                views={["year", "month"]}
                label="Select Year Ended"
                value={toDateVal}
                onChange={(newValue) => {
                  setToDateVal(newValue);
                }}
                disabled={inPresent}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required={!inPresent}
                    helperText={null}
                  />
                )}
              />
              <span />
              <FormControlLabel
                label="Present"
                control={
                  <Checkbox
                    checked={inPresent}
                    onChange={sameAsResidentHandler}
                  />
                }
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
                InputProps={{
                  startAdornment: (
                    <p>
                      <InputAdornment position="start">
                        <LocalAtmRoundedIcon sx={{ fontSize: "25px" }} />
                      </InputAdornment>
                    </p>
                  ),
                }}
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
