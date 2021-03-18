import React, { Component, Fragment } from "react";
import Button from "../../components/Button/Button";
import Dots from "../../components/Dots/Dots";
import classes from "./ResetPassword.module.css";

class ResetPassword extends Component {
  render() {
    return (
      <Fragment>
        <div className={classes.mainContainer}>
          <Dots />
          <div className={classes.headingContainer}>
            <p className={classes.heading}>Reset Password</p>
          </div>
          <form onSubmit={this.submitForm}>
            <div
              className={`${classes.formGroupContainer} ${classes.marginBottom}`}
            >
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.handleInputChange}
              ></input>
            </div>
            <div
              className={`${classes.formGroupContainer} ${classes.marginBottom}`}
            >
              <label htmlFor="repeat-password">Repeat Password:</label>
              <input
                type="password"
                name="repeatPassword"
                id="repeat-password"
                onChange={this.handleInputChange}
              ></input>
            </div>
            <div className={classes.btnWrapper}>
              <Button
                link="/login"
                name="Reset Password"
                buttonStyle={classes.link}
              />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default ResetPassword;
