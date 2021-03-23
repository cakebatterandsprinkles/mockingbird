import axios from "axios";
import React, { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Modal from "react-modal";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as ClosingButton } from "../../assets/closeButton.svg";
import Dots from "../../components/Dots/Dots";
import { useUserContext } from "../../context/authContext";
import PasswordInput from "../PasswordInput/PasswordInput";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const history = useHistory();
  const methods = useForm();
  const { register, handleSubmit, errors } = methods;
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const { setUserData } = useUserContext();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/reset-request", {
        email: email,
      })
      .then((response) => {
        handleCloseModal();
        if (response.status === 200) {
          toast.success("Please check your email for further instructions.");
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
  };

  const onSubmit = (data, e) => {
    axios
      .post(
        "/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          setUserData({ id: data.id, email: data.email });
          history.push({ pathname: "/today" });
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
          <p className={classes.heading}>Login</p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.formGroupContainer}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                ref={register({ required: true })}
              ></input>
              {errors.email && (
                <span className={classes.error}>Email is required.</span>
              )}
            </div>
            <PasswordInput
              label="Password:"
              errorRequired={true}
              errorMinLength={true}
              errorValidate={false}
              name="password"
            />
            <div
              className={classes.resetPasswordLink}
              onClick={handleOpenModal}
            >
              <p>Forgot password?</p>
            </div>
            <div className={classes.loginButton}>
              <button className={classes.button} type="submit">
                ʕ•́ᴥ•̀ʔっ Login
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className={classes.modal}
        overlayClassName={classes.overlay}
        ariaHideApp={false}
      >
        {
          <div className={classes.modalMainContainer}>
            <div className={classes.modalContentWrapper}>
              <div className={classes.modalHeadingContainer}>
                <p className={classes.modalHeading}>Reset Password</p>
              </div>
              <form
                className={classes.loginForm}
                onSubmit={handleForgotPasswordSubmit}
              >
                <div className={classes.formGroupContainer}>
                  <label htmlFor="reset-password-email">Email:</label>
                  <input
                    type="email"
                    name="reset-password-email"
                    id="reset-password-email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                </div>
                <div className={classes.btnWrapper}>
                  <button type="submit" className={classes.btn}>
                    Reset
                  </button>
                </div>
              </form>
            </div>
            <div className={classes.closingButtonContainer}>
              <ClosingButton
                className={classes.closingButton}
                onClick={handleCloseModal}
              />
            </div>
          </div>
        }
      </Modal>
    </Fragment>
  );
};

export default LoginForm;
