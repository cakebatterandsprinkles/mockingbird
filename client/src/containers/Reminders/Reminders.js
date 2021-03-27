import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { ReactComponent as ClosingButton } from "../../assets/closeButton.svg";
import { ReactComponent as AddButton } from "../../assets/pluscircle.svg";
import Dots from "../../components/Dots/Dots.jsx";
import quotes from "../../data/quotes.json";
import classes from "./Reminders.module.css";

const Reminders = (props) => {
  const methods = useForm();
  const { register, handleSubmit } = methods;
  const [footerText, setFooterText] = useState("");
  const [author, setAuthor] = useState("");
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [label, setLabel] = useState("");
  const [text, setText] = useState("");
  const [timeInterval, setTimeInterval] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    return new Promise((resolve) => {
      setShowModal(false);
      setTimeout(resolve, 1000);
    });
  };

  const inputCleanup = () => {
    setLabel("");
    setText("");
    setTimeInterval("");
    setStartTime("");
    setFinishTime("");
  };

  const requestPermission = () => {
    if (window.Notification) {
      Notification.requestPermission();
    }
  };

  const findNotificationTimes = (reminder) => {
    const [startHour, startMinutes] = reminder.startTime
      .split(":")
      .map((num) => parseInt(num));

    let [endHour, endMinutes] = reminder.finishTime
      .split(":")
      .map((num) => parseInt(num));

    const interval = parseInt(reminder.timeInterval);

    const notificationTimes = [];

    let hour = startHour;
    let minutes = startMinutes;

    // goes to next day
    if (
      startHour > endHour ||
      (startHour === endHour && startMinutes > endMinutes)
    ) {
      while (hour < 24) {
        notificationTimes.push({ hour, minutes });

        minutes += interval;

        hour += Math.floor(minutes / 60);
        minutes = minutes % 60;
      }
      hour -= 24;
      while (hour < endHour || (hour === endHour && minutes <= endMinutes)) {
        notificationTimes.push({ hour, minutes });

        minutes += interval;

        hour += Math.floor(minutes / 60);
        minutes = minutes % 60;
      }
    }
    // same day notification
    else {
      while (hour < endHour || (hour === endHour && minutes <= endMinutes)) {
        notificationTimes.push({ hour, minutes });

        minutes += interval;

        hour += Math.floor(minutes / 60);
        minutes = minutes % 60;
      }
    }

    return notificationTimes;
  };

  const setupNotifications = useCallback((reminder) => {
    const notificationTimes = findNotificationTimes(reminder);

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();

    const timeoutHandles = [];

    notificationTimes.forEach(({ hour, minutes }) => {
      let timeout;
      if (
        hour < currentHour ||
        (hour === currentHour && minutes <= currentMinutes)
      ) {
        timeout =
          (hour - currentHour + 24) * 60 * 60 * 1000 +
          (minutes - currentMinutes) * 60 * 1000 -
          currentSeconds * 1000;
      } else {
        timeout =
          (hour - currentHour) * 60 * 60 * 1000 +
          (minutes - currentMinutes) * 60 * 1000 -
          currentSeconds * 1000;
      }

      const handle = setTimeout(() => {
        new Notification(reminder.label, { body: reminder.text });
      }, timeout);

      timeoutHandles.push(handle);
    });

    return timeoutHandles;
  }, []);

  useEffect(() => {
    let allHandles = [];

    reminders.forEach((reminder) => {
      const reminderHandles = setupNotifications(reminder);
      allHandles = [...allHandles, ...reminderHandles];
    });

    return () => {
      allHandles.forEach((handle) => clearTimeout(handle));
    };
  }, [reminders, setupNotifications]);

  const selectFooterText = (array) => {
    const randomNum = Math.floor(Math.random() * array.length);
    setFooterText(array[randomNum].quote);
    setAuthor(array[randomNum].author);
  };

  const fetchReminders = () => {
    axios
      .get("/api/reminders")
      .then((res) => {
        if (res.status === 200) {
          setReminders([...res.data]);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteReminder = (label) => {
    axios
      .delete("/reminders", { data: { label: label } })
      .then((res) => {
        if (res.status === 200) {
          toast.warn("You have successfully deleted your reminder.");
          fetchReminders();
        }
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (reminderData, event) => {
    event.preventDefault();
    axios
      .post("/reminders", reminderData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Awesome! Your new reminder is set.");
          fetchReminders();
          handleCloseModal().then(() => inputCleanup());
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
  };

  useEffect(() => {
    requestPermission();
    selectFooterText(quotes);
    fetchReminders();
    const fetchHandle = setInterval(() => {
      fetchReminders();
    }, 60 * 60 * 1000);

    return () => {
      clearInterval(fetchHandle);
    };
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

            {window.Notification ? null : (
              <div className={classes.information}>
                Unfortunately, your browser does not support notifications,
                which this feature of Mockingbird depends on. If you want to use
                reminders, please open this page in Chrome or Safari on a
                computer.
              </div>
            )}

            {reminders.length ? (
              reminders.map((r, index) => (
                <div
                  key={`${r.label}-${index}`}
                  className={classes.reminderWrapper}
                >
                  <div className={classes.labelWrapper}>
                    <p className={classes.label}>{r.label}</p>
                    <p className={classes.text}>"{r.text}"</p>
                  </div>
                  <div className={classes.timeWrapper}>
                    <div className={classes.timeDataContainer}>
                      <div>
                        <span className={classes.bold}>From: </span>{" "}
                        {r.startTime}
                      </div>
                      <div>
                        <span className={classes.bold}>To: </span>{" "}
                        {r.finishTime}
                      </div>
                      <div>
                        <span className={classes.bold}>Time Interval: </span>{" "}
                        {r.timeInterval} minutes
                      </div>
                    </div>
                    <ClosingButton
                      className={classes.closingButton}
                      onClick={() => deleteReminder(r.label)}
                    />
                  </div>
                </div>
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
                  <span className={classes.bold}>Note:</span> For this
                  technology to work, you need to keep this app open in one of
                  your tabs and allow this app to show you notifications when
                  you're prompted.
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
              <FormProvider {...methods}>
                <form
                  className={classes.loginForm}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className={classes.formGroupContainer}>
                    <label htmlFor="label">Label:</label>
                    <input
                      type="text"
                      name="label"
                      id="label"
                      placeholder="e.g. Posture Check 🔥"
                      value={label}
                      onChange={(e) => {
                        setLabel(e.target.value);
                      }}
                      ref={register({ required: true })}
                      required
                    ></input>
                  </div>
                  <div className={classes.formGroupContainer}>
                    <label htmlFor="text">Reminder Message:</label>
                    <p className={classes.explanation}>
                      The app will use this message to notify you.
                    </p>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      placeholder="e.g. Fix your posture & get up and walk for a couple of minutes!"
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                      ref={register({ required: true })}
                      required
                    ></input>
                  </div>
                  <div className={classes.formGroupContainer}>
                    <label htmlFor="timeInterval">Time Interval:</label>
                    <p className={classes.explanation}>
                      Time interval should be given as minutes.
                    </p>
                    <input
                      type="number"
                      name="timeInterval"
                      id="timeInterval"
                      placeholder="60"
                      value={timeInterval}
                      onChange={(e) => {
                        setTimeInterval(e.target.value);
                      }}
                      ref={register({ required: true, max: 720, min: 1 })}
                      min="1"
                      max="720"
                      required
                    ></input>
                  </div>
                  <div className={classes.formGroupContainer}>
                    <label htmlFor="startTime">Starting at:</label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={startTime}
                      placeholder="08:30 AM"
                      onChange={(e) => {
                        setStartTime(e.target.value);
                      }}
                      ref={register({ required: true })}
                      required
                    ></input>
                  </div>
                  <div className={classes.formGroupContainer}>
                    <label htmlFor="finishTime">Finishing at:</label>
                    <input
                      type="time"
                      id="finishTime"
                      name="finishTime"
                      value={finishTime}
                      placeholder="05:30 PM"
                      onChange={(e) => {
                        setFinishTime(e.target.value);
                      }}
                      ref={register({ required: true })}
                      required
                    ></input>
                  </div>
                  <div className={classes.btnWrapper}>
                    <button type="submit" className={classes.btn}>
                      Add
                    </button>
                  </div>
                </form>
              </FormProvider>
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
