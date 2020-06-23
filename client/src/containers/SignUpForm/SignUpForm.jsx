import React, { Component, Fragment } from "react";
import axios from "axios";
import Modal from "react-modal";
import ClosingButton from "../../assets/closeButton.png";
import classes from "./SignUpForm.module.css";
import Button from "../../components/Button/Button";


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      showModal: false,
      isSubmitted: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderModalContent = this.renderModalContent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  renderModalContent() { 
    if (this.state.isSubmitted) {
      return (
        <div className={classes.submitModalContainer}>
          <p>Congrats, you've got an email! Check your inbox.</p>
        </div>
      );
    }
    return <p>Oops something is wrong!</p>;
  }

  handleFormSubmit = () => {
    this.setState({ isSubmitted: true });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = () => {
    this.handleOpenModal();
  };

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
            <p className={classes.heading}>Sign Up</p>
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
            <div className={classes.subTextContainer}>
              <p className={classes.subText}>
                Note: You will need to verify this. Make it real.
              </p>
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
              <Button link="/login" name="٩(◕‿◕｡)۶ Sign Me Up" buttonStyle={classes.link} />
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

export default SignUpForm;
