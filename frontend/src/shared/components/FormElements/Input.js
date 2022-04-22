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

  // const element =
  //   props.element === "input" ? (
  //     <input
  //       id={props.id}
  //       type={props.type}
  //       placeholder={props.placeholder}
  //       onChange={changeHandler}
  //       onBlur={blurHandler}
  //       value={inputState.value}
  //       // helperText={props.error}
  //       // onChange={changeHandler}
  //       // onBlur={blurHandler}
  //       // type={props.type}
  //       // label={props.label}
  //       // variant={props.variant}
  //     />
  //   ) : (
  //     <input //Checkbox TEST
  //       id={props.id}
  //       type={props.type}
  //       onChange={changeHandler}
  //       onBlur={blurHandler}
  //       value={props.value}
  //     />
  //   );
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
