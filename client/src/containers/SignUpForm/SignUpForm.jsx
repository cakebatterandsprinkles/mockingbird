import axios from "axios";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import classes from "./SignUpForm.module.css";

const SignUpForm = (props) => {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data, e) => {
    axios
      .post("/signup", {
        email: data.email,
        password: data.password,
        repeatPassword: data.repeatPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          e.target.reset();
          setTimeout(() => {
            history.push({
              pathname: "/login",
            });
          }, 1000);
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
        <div className={classes.flexContainerRow}>
          <div className={`${classes.dot} ${classes.yellow}`}></div>
          <div className={`${classes.dot} ${classes.orange}`}></div>
          <div className={`${classes.dot} ${classes.red}`}></div>
          <div className={`${classes.dot} ${classes.green}`}></div>
          <div className={`${classes.dot} ${classes.blue}`}></div>
          <div className={`${classes.dot} ${classes.purple}`}></div>
        </div>
        <div className={classes.headingContainer}>
          <p className={classes.heading}>Sign Up</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label>Email:</label>
            <input
              type="email"
              name="email"
              ref={register({ required: true })}
            ></input>
            <div className={classes.subTextContainer}>
              <p className={classes.subText}>
                Note: You will need to verify this. Make it real.
              </p>
            </div>
            {errors.email && (
              <span className={classes.error}>Email is required.</span>
            )}
          </div>
          <div className={classes.formGroupContainer}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              ref={register({ required: true, minLength: 8 })}
            ></input>
            {errors.password && errors.password.type === "required" && (
              <span className={classes.error}>Password field is required.</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className={classes.error}>
                The password has to be at least 8 characters long.
              </span>
            )}
          </div>
          <div className={classes.formGroupContainer}>
            <label>Repeat Password:</label>
            <input
              type="password"
              name="repeatPassword"
              ref={register({
                required: true,
                minLength: 8,
                validate: (value) => value === watch("password"),
              })}
            ></input>
            {errors.repeatPassword &&
              errors.repeatPassword.type === "required" && (
                <span className={classes.error}>
                  Repeat password field is required.
                </span>
              )}
            {errors.repeatPassword &&
              errors.repeatPassword.type === "minLength" && (
                <span className={classes.error}>
                  The password has to be at least 8 characters long.
                </span>
              )}
            {errors.repeatPassword &&
              errors.repeatPassword.type === "validate" && (
                <span className={classes.error}>The passwords must match.</span>
              )}
          </div>
          <div className={classes.btnWrapper}>
            <input
              type="submit"
              className={classes.link}
              value="٩(◕‿◕｡)۶ Sign Me Up"
            ></input>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUpForm;
