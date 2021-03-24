import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { ReactComponent as ClosingButton } from "../../assets/closeButton.svg";
import { ReactComponent as AddButton } from "../../assets/pluscircle.svg";
import Dots from "../../components/Dots/Dots.jsx";
import quotes from "../../data/quotes.json";
import classes from "./Reminders.module.css";

const Reminders = () => {
  const [footerText, setFooterText] = useState("");
  const [author, setAuthor] = useState("");
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [label, setLabel] = useState("");
  const [text, setText] = useState("");
  const [timeInterval, setTimeInterval] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const selectFooterText = (array) => {
    const randomNum = Math.floor(Math.random() * array.length);
    setFooterText(array[randomNum].quote);
    setAuthor(array[randomNum].author);
  };

  const fetchReminders = () => {
    axios
      .get("/reminders")
      .then((res) => {
        if (res.status === 200) {
          setReminders([...res.data]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (reminderData, event) => {
    event.preventDefault();
    axios
      .post("/reminder", reminderData)
      .then((response) => {
        if (response.status === 200) {
          toast.warn("Awesome! Your new reminder is set.");
          fetchReminders();
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
  };

  useEffect(() => {
    selectFooterText(quotes);
    fetchReminders();
  }, []);

  return (
    <Fragment>
      <div className={classes.mainContainer}>
        <div className={classes.mainWrapper}>
          <Dots />
          <div className={classes.contentWrapper}>
            <div className={classes.headerContainer}>
              <p className={classes.header}>Reminders: {reminders.length}</p>
              <AddButton
                className={classes.addIcon}
                onClick={handleOpenModal}
              />
            </div>
            {reminders.length ? (
              reminders.map((r) => (
                <Fragment>
                  <div>{r.label}</div>
                </Fragment>
              ))
            ) : (
              <Fragment>
                <div className={classes.information}>
                  This section of the app exists for you to build healthier
                  habits. If you need to drink more water, check your posture,
                  or get up and walk around every hour, and you need a friendly
                  reminder to do so, you can set a reminder for yourself from
                  here.
                </div>
                <div className={classes.information}>
                  Click on the plus icon to add a reminder.
                </div>
                <div className={classes.information}>
                  Note: For this technology to work, you need to keep this app
                  open in one of your tabs.
                </div>
              </Fragment>
            )}
          </div>
          <div className={classes.footer}>
            <div className={classes.footerText}>
              <p>
                {footerText}
                <span className={classes.footerAuthor}> - {author}</span>
              </p>
            </div>
          </div>
        </div>
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
                <p className={classes.modalHeading}>Add a reminder:</p>
              </div>
              <form className={classes.loginForm} onSubmit={handleSubmit}>
                <div className={classes.formGroupContainer}>
                  <label htmlFor="reminder-label">Label:</label>
                  <input
                    type="text"
                    name="reminder-label"
                    id="reminder-label"
                    placeholder="e.g. Posture Check 🔥"
                    value={label}
                    onChange={(e) => {
                      setLabel(e.target.value);
                    }}
                    required
                  ></input>
                </div>
                <div className={classes.formGroupContainer}>
                  <label htmlFor="reminder-text">Reminder Message:</label>
                  <p className={classes.explanation}>
                    The app will use this message to notify you.
                  </p>
                  <input
                    type="text"
                    name="reminder-text"
                    id="reminder-text"
                    placeholder="e.g. Fix your posture & get up and walk for a couple of minutes!"
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    required
                  ></input>
                </div>
                <div className={classes.formGroupContainer}>
                  <label htmlFor="reminder-time-interval">Time Interval:</label>
                  <p className={classes.explanation}>
                    Time interval should be given as minutes.
                  </p>
                  <input
                    type="number"
                    name="reminder-time-interval"
                    id="reminder-time-interval"
                    placeholder="60"
                    value={timeInterval}
                    onChange={(e) => {
                      setTimeInterval(e.target.value);
                    }}
                    min="1"
                    max="720"
                    required
                  ></input>
                </div>
                <div className={classes.formGroupContainer}>
                  <label htmlFor="start-time">Starting at:</label>
                  <input
                    type="time"
                    id="start-time"
                    name="start-time"
                    value={startTime}
                    placeholder="08:30 AM"
                    onChange={(e) => {
                      setStartTime(e.target.value);
                    }}
                    required
                  ></input>
                </div>
                <div className={classes.formGroupContainer}>
                  <label htmlFor="finish-time">Finishing at:</label>
                  <input
                    type="time"
                    id="finish-time"
                    name="finish-time"
                    value={finishTime}
                    placeholder="05:30 PM"
                    onChange={(e) => {
                      setFinishTime(e.target.value);
                    }}
                    required
                  ></input>
                </div>
                <div className={classes.btnWrapper}>
                  <button type="submit" className={classes.btn}>
                    Add
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

export default Reminders;
