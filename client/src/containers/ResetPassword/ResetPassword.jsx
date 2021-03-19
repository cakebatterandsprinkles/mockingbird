import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as EyeSlash } from "../../assets/eyeSlash.svg";
import Dots from "../../components/Dots/Dots";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm();
  const [inputType, setInputType] = useState("password");
  const [inputTypeRepeat, setInputTypeRepeat] = useState("password");
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const handleShowPassword = () => {
    if (passwordRef.current.type === "password") {
      setInputType("text");
    } else if (passwordRef.current.type === "text") {
      setInputType("password");
    }
  };

  const handleShowPasswordRepeat = () => {
    if (repeatPasswordRef.current.type === "password") {
      setInputTypeRepeat("text");
    } else if (repeatPasswordRef.current.type === "text") {
      setInputTypeRepeat("password");
    }
  };

  const onSubmit = (data, e) => {
    axios
      .post("/reset-password", {
        password: data.password,
        repeatPassword: data.repeatPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          e.target.reset();
          history.push({
            pathname: "/login",
          });
          toast.success("You have successfully changed your password.");
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
  };

  return (
    <Fragment>
      <div className={classes.mainContainer}>
        <Dots />
        <div className={classes.headingContainer}>
          <p className={classes.heading}>Reset Password</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="password">New Password:</label>
            <div className={classes.inputWrapper}>
              <input
                type={inputType}
                name="password"
                id="password"
                ref={(ref) => {
                  passwordRef.current = ref;
                  register(ref, { required: true, minLength: 8 });
                }}
              ></input>
              {errors.password && errors.password.type === "required" && (
                <div className={classes.error}>Password field is required.</div>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <div className={classes.error}>
                  The password has to be at least 8 characters long.
                </div>
              )}
              {passwordRef.current?.type === "password" ? (
                <EyeSlash
                  className={classes.eyeslash}
                  onClick={handleShowPassword}
                />
              ) : (
                <Eye className={classes.eye} onClick={handleShowPassword} />
              )}
            </div>
            <div className={classes.formGroupContainer}>
              <label htmlFor="repeatPassword">Repeat Password:</label>
              <div className={classes.inputWrapper}>
                <input
                  type={inputTypeRepeat}
                  name="repeatPassword"
                  ref={(ref) => {
                    repeatPasswordRef.current = ref;
                    register(ref, {
                      required: true,
                      minLength: 8,
                      validate: (value) => value === watch("password"),
                    });
                  }}
                ></input>
                {errors.repeatPassword &&
                  errors.repeatPassword.type === "required" && (
                    <div className={classes.error}>
                      Repeat password field is required.
                    </div>
                  )}
                {errors.repeatPassword &&
                  errors.repeatPassword.type === "minLength" && (
                    <div className={classes.error}>
                      The password has to be at least 8 characters long.
                    </div>
                  )}
                {errors.repeatPassword &&
                  errors.repeatPassword.type === "validate" && (
                    <div className={classes.error}>
                      The passwords must match.
                    </div>
                  )}
                {repeatPasswordRef.current?.type === "password" ? (
                  <EyeSlash
                    className={classes.eyeslash}
                    onClick={handleShowPasswordRepeat}
                  />
                ) : (
                  <Eye
                    className={classes.eye}
                    onClick={handleShowPasswordRepeat}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={classes.btnWrapper}>
            <button className={classes.button} type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
