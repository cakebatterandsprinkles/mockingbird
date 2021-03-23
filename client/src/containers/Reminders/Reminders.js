import React, { useEffect, useState } from "react";
import quotes from "../../data/quotes.json";
import classes from "./Reminders.module.css";

const Reminders = () => {
  const [footerText, setFooterText] = useState("");
  const [author, setAuthor] = useState("");

  const selectFooterText = (array) => {
    const randomNum = Math.floor(Math.random() * array.length);
    setFooterText(array[randomNum].quote);
    setAuthor(array[randomNum].author);
  };

  useEffect(() => {
    selectFooterText(quotes);
  }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainWrapper}>
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
