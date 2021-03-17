import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as EyeSlash } from "../../assets/eyeSlash.svg";
import Dots from "../../components/Dots/Dots";
import classes from "./SignUpForm.module.css";

const SignUpForm = (props) => {
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
      .post("/signup", {
        email: data.email,
        password: data.password,
        repeatPassword: data.repeatPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          e.target.reset();
          history.push({
            pathname: "/login",
          });
          toast.warn(
            "You need to confirm your email before you login. Check your inbox."
          );
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
              {errors.password && errors.password.type === "minLength" && (
                <span className={classes.error}>
                  The password has to be at least 8 characters long.
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
                  <span className={classes.error}>
                    The passwords must match.
                  </span>
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
          <div className={classes.btnWrapper}>
            <button className={classes.button} type="submit">
              ٩(◕‿◕｡)۶ Sign Me Up
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUpForm;
