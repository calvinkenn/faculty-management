import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useReducer, useEffect } from "react";

import { validate } from "../../utils/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
      error: props.validators,
    });
  };

  const blurHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  let element;

  if (props.element === "input") {
    element = (
      <TextField
        id={props.id}
        helperText={
          !inputState.isValid && inputState.isTouched ? props.helperText : ""
        }
        onChange={changeHandler}
        onBlur={blurHandler}
        type={props.type}
        label={props.label}
        variant={props.variant}
        error={!inputState.isValid && inputState.isTouched}
        value={inputState.value}
        disabled={props.disabled ? props.disabled : false}
        required={props.required}
        inputProps={props.inputProps}
      />
    );
  } else if (props.element === "textarea") {
    element = (
      <TextField
        id={props.id}
        helperText={
          !inputState.isValid && inputState.isTouched ? props.helperText : ""
        }
        multiline
        minRows={props.minRows}
        maxRows={Infinity}
        style={{ width: props.width }}
        onChange={changeHandler}
        onBlur={blurHandler}
        type={props.type}
        label={props.label}
        variant={props.variant}
        error={!inputState.isValid && inputState.isTouched}
        value={inputState.value}
        disabled={props.disabled ? props.disabled : false}
        required={props.required}
        inputProps={props.inputProps}
      />
    );
  } else if (props.element === "year") {
    element = (
      <TextField
        id={props.id}
        helperText={
          !inputState.isValid && inputState.isTouched ? props.helperText : ""
        }
        onChange={changeHandler}
        onBlur={blurHandler}
        type={props.type}
        label={props.label}
        variant={props.variant}
        error={!inputState.isValid && inputState.isTouched}
        value={Math.max(0, parseInt(inputState.value)).toString().slice(0, 4)}
        disabled={props.disabled ? props.disabled : false}
        required={props.required}
        inputProps={props.inputProps}
      />
    );
  } else if (props.element === "select") {
    element = (
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="select">{props.label}</InputLabel>
        <Select
          defaultValue={props.defaultValue}
          // labelId={props.label}
          id={props.id}
          value={inputState.value}
          label={props.label}
          onChange={changeHandler}
          selectValue={[props.selectValue]}
          items={props.items}
          required={props.required}
        >
          <MenuItem disabled value="">
            <em>Please Select</em>
          </MenuItem>
          {props.items.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    // <div
    //   className={`form-control ${
    //     !inputState.isValid && inputState.isTouched && "form-control--invalid"
    //   }`}
    // >
    //   <label htmlFor={props.id}>{props.label}</label>
    //   {element}
    //   {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    // </div>
    element
  );
};

export default Input;
