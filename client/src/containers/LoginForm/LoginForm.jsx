import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as EyeSlash } from "../../assets/eyeSlash.svg";
import { useUserContext } from "../../context/authContext";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [inputType, setInputType] = useState("password");
  const { setUserData } = useUserContext();

  const passwordRef = useRef(null);

  const handleShowPassword = () => {
    if (passwordRef.current.type === "password") {
      setInputType("text");
    } else if (passwordRef.current.type === "text") {
      setInputType("password");
    }
  };

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
          history.push({ pathname: "/today" });
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
                <span className={classes.error}>
                  Password field is required.
                </span>
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
          </div>
          <div className={classes.resetPasswordLink}>
            <p>Forgot password?</p>
          </div>
          <div className={classes.loginButton}>
            <button className={classes.button} type="submit">
              ʕ•́ᴥ•̀ʔっ Login
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginForm;
