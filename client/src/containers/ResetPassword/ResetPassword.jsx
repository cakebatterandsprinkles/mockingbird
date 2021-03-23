import axios from "axios";
import React, { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import Dots from "../../components/Dots/Dots";
import PasswordInput from "../PasswordInput/PasswordInput";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const history = useHistory();
  const methods = useForm();
  const { handleSubmit } = methods;
  let location = new URLSearchParams(useLocation().search);

  const onSubmit = (data, e) => {
    axios
      .post("/reset-password", {
        password: data.password,
        repeatPassword: data.repeatPassword,
        email: location.get("email"),
        token: location.get("token"),
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`${classes.formGroupContainer} ${classes.marginBottom}`}
            >
              <div className={classes.inputWrapper}>
                <PasswordInput
                  label="New Password:"
                  errorRequired={true}
                  errorMinLength={true}
                  errorValidate={false}
                  name="password"
                />
                <PasswordInput
                  label="Repeat New Password:"
                  errorRequired={true}
                  errorMinLength={true}
                  errorValidate={true}
                  name="repeatPassword"
                />
              </div>
            </div>
            <div className={classes.btnWrapper}>
              <button className={classes.button} type="submit">
                Reset Password
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
