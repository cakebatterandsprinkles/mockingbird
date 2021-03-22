import axios from "axios";
import React, { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Dots from "../../components/Dots/Dots";
import PasswordInput from "../PasswordInput/PasswordInput";
import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  const history = useHistory();
  const methods = useForm();
  const { register, handleSubmit, errors } = methods;

  const onSubmit = (data, e) => {
    console.log(data);
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.formGroupContainer}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                ref={register({ required: true })}
              ></input>
              <div className={classes.subTextContainer}>
                Note: You will need to verify this. Make it real.
              </div>
              {errors.email && (
                <div className={classes.error}>Email is required.</div>
              )}
            </div>
            <PasswordInput
              label="Password:"
              errorRequired={true}
              errorMinLength={true}
              errorValidate={false}
              name="password"
            />
            <PasswordInput
              label="Repeat Password:"
              errorRequired={true}
              errorMinLength={true}
              errorValidate={true}
              name="repeatPassword"
            />
            <div className={classes.btnWrapper}>
              <button className={classes.button} type="submit">
                ٩(◕‿◕｡)۶ Sign Me Up
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Fragment>
  );
};

export default SignUpForm;
