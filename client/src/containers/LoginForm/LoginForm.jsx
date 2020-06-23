import React, { Component, Fragment } from "react";
import classes from "./LoginForm.module.css";
import Modal from "react-modal";
import ClosingButton from "../../assets/closeButton.png";
import axios from "axios";
import Button from "../../components/Button/Button";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      isSubmitting: false,
      isSubmitted: false,
      email: "",
      password: "",
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleForgotPasswordSubmit = this.handleForgotPasswordSubmit.bind(
      this
    );
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleForgotPasswordSubmit() {
    this.setState({ isSubmitting: true });
    setTimeout(() => {
      this.setState({
        isSubmitting: false,
        isSubmitted: true,
      });
      setTimeout(() => {
        this.handleCloseModal();
        this.setState({
          isSubmitted: false,
        });
      }, 2000);
    }, 2000);
  }

  handleLoginSubmit() {

  }

  renderModalContent() {
    if (!this.state.isSubmitting && !this.state.isSubmitted) {
      return (
        <Fragment>
          <div className={classes.modalMainContainer}>
            <div>
              <div className={classes.modalHeadingContainer}>
                <p className={classes.modalHeading}>Reset Password</p>
              </div>
              <form className={classes.modalText} action="/login" method="POST">
                <div className={classes.formGroupContainer}>
                  <label htmlFor="reset-password-email">E-mail address:</label>
                  <input
                    type="email"
                    name="reset-password-email"
                    id="reset-password-email"
                  ></input>
                </div>
              </form>
              <div className={`${classes.btnWrapper} ${classes.resetButton}`}>
                <Button
                  link="/login" 
                  name="Reset" 
                  buttonStyle={classes.link} 
                  onClick={this.handleForgotPasswordSubmit}
                >
                </Button>
              </div>
            </div>
            <div className={classes.closingButtonContainer}>
              <img
                src={ClosingButton}
                alt="closing button"
                className={classes.closingButton}
                onClick={this.handleCloseModal}
              />
            </div>
          </div>
        </Fragment>
      );
    } else if (!this.state.isSubmitting && this.state.isSubmitted) {
      return (
        <div className={classes.submitModalContainer}>
          <p>Congrats, you've got an email! Check your inbox.</p>
        </div>
      );
    }
    return <p>Oops something is wrong!</p>;
  }

  render() {
    let currentModal = this.renderModalContent();
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
          <form onSubmit={this.submitForm}>
            <div
              className={classes.formGroupContainer}
            >
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={this.handleInputChange}
              ></input>
            </div>
            <div
              className={`${classes.formGroupContainer} ${classes.marginBottom}`}
            >
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.handleInputChange}
              ></input>
            </div>
            <div className={classes.resetPasswordLink}>
              <p onClick={this.handleOpenModal}>
                Forgot password?
              </p>
            </div>
            <div className={classes.btnWrapper}>
              <Button link="/today" name="(≧◡≦) Login" buttonStyle={classes.link} />
            </div>
          </form>
        </div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          className={classes.modal}
          overlayClassName={classes.overlay}
          ariaHideApp={false}
        >
          {currentModal}
        </Modal>
      </Fragment>
    );
  }
}

export default LoginForm;
