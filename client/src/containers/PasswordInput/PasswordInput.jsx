import React, { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as EyeSlash } from "../../assets/eyeSlash.svg";
import classes from "./PasswordInput.module.css";

const PasswordInput = ({
  label,
  errorRequired,
  errorMinLength,
  errorValidate,
  name,
}) => {
  const [inputType, setInputType] = useState("password");

  const { errors, register, watch } = useFormContext();

  const handleShowPassword = () => {
    setInputType((currentState) =>
      currentState === "text" ? "password" : "text"
    );
  };

  let registerRules = useMemo(() => {
    const rules = {};
    if (errorMinLength) {
      rules.minLength = 9;
    }
    if (errorRequired) {
      rules.required = true;
    }
    if (errorValidate) {
      rules.validate = (value) => value === watch("password");
    }

    return rules;
  }, [watch, errorMinLength, errorValidate, errorRequired]);

  return (
    <div className={classes.formGroupContainer}>
      <label htmlFor="currentPassword">{label}</label>
      <div className={classes.inputWrapper}>
        <input
          type={inputType}
          name={name}
          ref={register(registerRules)}
        ></input>
        <div className={classes.iconWrapper}>
          {inputType === "text" ? (
            <EyeSlash
              className={classes.eyeslash}
              onClick={handleShowPassword}
            />
          ) : (
            <Eye className={classes.eye} onClick={handleShowPassword} />
          )}
        </div>
      </div>
      {errorRequired ? (
        <span>
          {errors[name] && errors[name].type === "required" && (
            <div className={classes.error}>Password field is required.</div>
          )}{" "}
        </span>
      ) : null}
      {errorMinLength ? (
        <span>
          {errors[name] && errors[name].type === "minLength" && (
            <div className={classes.error}>
              The password has to be at least 8 characters long.
            </div>
          )}
        </span>
      ) : null}
      {errorValidate ? (
        <span>
          {errors[name] && errors[name].type === "validate" && (
            <div className={classes.error}>The passwords must match.</div>
          )}
        </span>
      ) : null}
    </div>
  );
};

export default PasswordInput;
