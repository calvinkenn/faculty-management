import React from "react";

const InputType = (props) => {
  if (props.element === "input") {
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      onBlur={blurHandler}
      value={inputState.value}
    />;
  } else if (props.element === "textarea") {
    <textarea
      id={props.id}
      rows={props.rows || 3}
      onChange={changeHandler}
      onBlur={blurHandler}
      value={inputState.value}
    />;
  } else if (props.element === "checkbox") {
    <textarea
      id={props.id}
      onChange={changeHandler}
      onBlur={blurHandler}
      value={inputState.value}
    />;
  }
};

export default InputType;
