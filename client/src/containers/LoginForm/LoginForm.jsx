import axios from "axios";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/authContext";
import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const { setUserData } = useUserContext();

  const onSubmit = (data, e) => {
    axios
      .post(
        "/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          setUserData({ id: data.id, email: data.email });
          history.push({ pathname: "/user" });
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
          <p className={classes.heading}>Login</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.formGroupContainer}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={register({ required: true })}
            ></input>
            {errors.email && (
              <span className={classes.error}>Email is required.</span>
            )}
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={register({ required: true, minLength: 8 })}
            ></input>
            {errors.password && errors.password.type === "required" && (
              <span className={classes.error}>Password field is required.</span>
            )}
          </div>
          <div className={classes.resetPasswordLink}>
            <p>Forgot password?</p>
          </div>
          <div className={classes.btnWrapper}>
            <input
              type="submit"
              className={classes.link}
              value="(≧◡≦) Login"
            ></input>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginForm;
