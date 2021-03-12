import axios from "axios";
import React, { Component } from "react";
import { toast } from "react-toastify";
import PasswordInput from "../PasswordInput/PasswordInput";
import classes from "./Settings.module.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    };
    this.submitForm = this.submitForm.bind(this);
  }

  handleCurrentPassword = (newValue) => {
    this.setState({ currentPassword: newValue });
  };

  handleNewPassword = (newValue) => {
    this.setState({ newPassword: newValue });
  };

  handleNewPasswordRepeat = (newValue) => {
    this.setState({ repeatNewPassword: newValue });
  };

  submitForm = (event) => {
    event.preventDefault();
    axios
      .post(
        "/settings",
        {
          currentPassword: this.state.currentPassword,
          newPassword: this.state.newPassword,
          repeatNewPassword: this.state.repeatNewPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
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

  render() {
    return (
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
          <p className={classes.heading}>Settings</p>
        </div>
        <form onSubmit={this.submitForm}>
          <div className={classes.inputWrapper}>
            <PasswordInput
              label="Current Password"
              handleChange={this.handleCurrentPassword}
            />
            <PasswordInput
              label="New Password"
              handleChange={this.handleNewPassword}
            />
            <PasswordInput
              label="Repeat New Password"
              handleChange={this.handleNewPasswordRepeat}
            />
          </div>
          <div className={classes.btnWrapper}>
            <button className={classes.button} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Settings;
