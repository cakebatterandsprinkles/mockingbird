import axios from "axios";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Dots from "../../components/Dots/Dots";
import PasswordInput from "../PasswordInput/PasswordInput";
import classes from "./Settings.module.css";

const Settings = () => {
  const history = useHistory();
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data, event) => {
    event.preventDefault();
    axios
      .post(
        "/settings",
        {
          currentPassword: data.currentPassword,
          newPassword: data.password,
          repeatNewPassword: data.repeatPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          event.target.reset();
          history.push({
            pathname: "/today",
          });
          toast.success("Password change was successful.");
        }
      })
      .catch((err) => {
        err.response
          ? toast.error(err.response.data)
          : toast.error("Can't save new settings at the moment.");
        console.log(err);
      });
  };

  return (
    <div className={classes.mainContainer}>
      <Dots />
      <div className={classes.headingContainer}>
        <p className={classes.heading}>Settings</p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.inputWrapper}>
            <PasswordInput
              label="Current password:"
              errorRequired={true}
              errorMinLength={true}
              errorValidate={false}
              name="currentPassword"
            />
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
          </div>
          <div className={classes.btnWrapper}>
            <button className={classes.button} type="submit">
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Settings;
