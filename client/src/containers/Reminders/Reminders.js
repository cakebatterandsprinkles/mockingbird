import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import quotes from "../../data/quotes.json";
import classes from "./Reminders.module.css";

const Reminders = () => {
  const [footerText, setFooterText] = useState("");
  const [author, setAuthor] = useState("");
  const [reminders, setReminders] = useState([]);

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

  const postReminder = (reminderData) => {
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
    <div className={classes.mainContainer}>
      <div className={classes.mainWrapper}>
        <div className={classes.contentWrapper}>
          <div className={classes.header}>Reminders: {reminders.length}</div>
          {reminders.length ? (
            <div className={classes.information}></div>
          ) : (
            reminders.map((r) => <div>{r.label}</div>)
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
  );
};

export default Reminders;
