import React from "react";
import classes from "./LandingMain.module.css";
import Mockingbird from "../../assets/mockingbird-landing.jpg";

const LandingMain = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainWrapper}>
        <img src= {Mockingbird} alt="mockingbird image" className={classes.birdImg}/>
        <div className={classes.contentWrapper}>
          <p className={classes.mainHeader}>Welcome to Mockingbird!</p>
          <div className={classes.questions}>
            <p className={classes.heading}>What does this website do?</p>
            <div className={classes.flexContainerColumn}>
              <p className={classes.paragraph}>
                This is a 10 minute journaling app that makes journaling fun and easy.
              </p>
            </div>
          </div>
          <div className={classes.questions}>
            <p className={classes.heading}>Why should you keep a journal?</p>
            <div className={classes.flexContainerColumn}>
              <p className={classes.paragraph}>
                The chaos of the outside world can become an inner one as we grow. 
              </p>
              <p className={classes.paragraph}>
                Journaling helps us remember that even though sh*t happens from time to time, it's never permenant.
              </p>
              <p className={classes.paragraph}>
                It helps us deal with our anxiety, depressive thoughts and helps us understand ourselves better.
              </p>
              <p className={classes.paragraph}>
                There are good days, meeh days, bad days, and that's life. 
              </p>
            </div>
          </div>
          <div className={classes.questions}>
            <p className={classes.heading}>`I have tried journaling and I just can't do it.`</p>
            <div className={classes.flexContainerColumn}>
              <p className={classes.paragraph}>
                This app is an attempt to make journaling easier.
              </p>
              <p className={classes.paragraph}>
                And even if you can't do it, it's totally okay. You are still awesome, and you should keep on rocking it!
              </p>
            </div>
          </div>
          <div className={classes.questions}>
            <p className={classes.heading}>How does it work?</p>
            <div className={classes.flexContainerColumn}>
              <p className={classes.paragraph}>
                You are given 6 questions, you can always choose not to fill any of them in any day.
              </p>
              <p className={classes.paragraph}>
                -  3 of the interesting / weird things you heard somebody say
              </p>
              <p className={classes.paragraph}>
                -  3 of the interesting / weird things you saw
              </p>
              <p className={classes.paragraph}>
                -  3 of the interesting / weird things you thought about
              </p>
              <p className={classes.paragraph}>
                -  3 words to describe today
              </p>
              <p className={classes.paragraph}>
                -  1 new thing you learned or tried for the first time
              </p>
              <p className={classes.paragraph}>
                -  1 thing you want to add (a dream / a good quote / note to future self)
              </p>
               <p className={classes.paragraph}>
                You can also see all your previous entries from the calendar page!
              </p>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerText}>
            <p>Reach me from: </p>
            <a
              href="mailto:yagmurcetin@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              yagmurcetin@gmail.com
            </a>
          </div>
          <div className={classes.footerText}>
            <p>Source code: </p>
            <a
              href="https://github.com/cakebatterandsprinkles/mockingbird"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              https://github.com/cakebatterandsprinkles
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingMain;
