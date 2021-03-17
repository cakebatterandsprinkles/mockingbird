import React from "react";
import classes from "./Dots.module.css";

const Dots = () => {
  return (
    <div className={classes.flexContainerRow}>
      <div className={`${classes.dot} ${classes.yellow}`}></div>
      <div className={`${classes.dot} ${classes.orange}`}></div>
      <div className={`${classes.dot} ${classes.red}`}></div>
      <div className={`${classes.dot} ${classes.green}`}></div>
      <div className={`${classes.dot} ${classes.blue}`}></div>
      <div className={`${classes.dot} ${classes.purple}`}></div>
    </div>
  );
};

export default Dots;
