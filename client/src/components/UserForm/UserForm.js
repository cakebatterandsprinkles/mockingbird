import React from "react";
import classes from "./UserForm.module.css";

const UserForm = (props) => {
  return (
    <div className={classes.formGroupContainer}>
      <label htmlFor={props.name}>{props.content} </label>
      <input
        type="text"
        name={props.name}
        id={props.name}
        onChange={props.onInputChange}
        value={props.value}
      ></input>
    </div>
  );
};
export default UserForm;
