import React, { Component, Fragment } from "react";
import classes from "./ResetPassword.module.css";
import Button from "../../components/Button/Button";

class ResetPassword extends Component {
  render() {
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
              <Button link="/login" name="Reset Password" buttonStyle={classes.link} />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default ResetPassword;
