import axios from "axios";
import React, { Component } from "react";
import { toast } from "react-toastify";
import classes from "./Settings.module.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = () => {
    this.setState({
      userConfirmationMessage: "Setting changes were successful.",
    });
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
        <form>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="repeatNewPassword">Repeat New Password:</label>
            <input
              type="password"
              name="repeatNewPassword"
              id="repeatNewPassword"
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className={classes.btnWrapper}>
            <button
              className={classes.button}
              type="submit"
              onClick={this.submitForm}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Settings;
