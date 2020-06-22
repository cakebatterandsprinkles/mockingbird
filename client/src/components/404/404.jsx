import React from "react";
import classes from "./Lost.module.css";
import Sign from "../../assets/lost.jpg";

const Lost = (props) => {
  return (
    <div className={classes.mainContainer}>
      <img src={Sign} alt="empty sign" className={classes.img} />
      <div className={classes.textContainer}>
        <p className={classes.emphasis}>404: The mockingbird you are looking for is at another tree.</p>
        <p className={classes.funText}> ⋋(◍’◊’◍)⋌  But Cosmic Owl says hi.</p>
        <p className={classes.footnote}>
          (Maybe try another path? There is more than one way to be happy anyway.)
        </p>
      </div>
    </div>
  );
};

export default Lost;
