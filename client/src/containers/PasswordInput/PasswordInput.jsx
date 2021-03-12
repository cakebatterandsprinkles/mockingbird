import React, { useRef, useState } from "react";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as EyeSlash } from "../../assets/eyeSlash.svg";
import classes from "./PasswordInput.module.css";

const PasswordInput = (props) => {
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const showPasswordRef = useRef(null);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
    props.handleChange(event.target.value);
  };

  const handleShowPassword = () => {
    if (showPasswordRef.current.type === "password") {
      setInputType("text");
    } else if (showPasswordRef.current.type === "text") {
      setInputType("password");
    }
  };

  return (
    <div className={classes.formGroupContainer}>
      <label htmlFor="currentPassword">{props.label}</label>
      <div className={classes.inputWrapper}>
        <input
          type={inputType}
          name="currentPassword"
          ref={showPasswordRef}
          onChange={handleInputChange}
          value={password}
        ></input>
        <div onClick={handleShowPassword} className={classes.iconWrapper}>
          {showPasswordRef.current?.type === "password" ? (
            <EyeSlash
              className={classes.eyeslash}
              onClick={handleShowPassword}
            />
          ) : (
            <Eye className={classes.eye} onClick={handleShowPassword} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
