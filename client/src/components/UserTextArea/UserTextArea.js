import React from "react";
import classes from "./UserTextArea.module.css";

const UserTextArea = (props) => {
  return (
    <div className={classes.formGroupContainer}>
      <label htmlFor={props.name}>{props.content} </label>
      <textarea
        name={props.name}
        id={props.name}
        onChange={props.onInputChange}
        rows={props.rows}
        cols={props.cols}
        className={props.style}
        value={props.value}
      ></textarea>
    </div>
  );
};
export default UserTextArea;
