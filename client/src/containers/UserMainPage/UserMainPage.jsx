import React, { Component } from "react";
import Circle from "../../assets/circle.png";
import Star from "../../assets/star.png";
import Triangle from "../../assets/triangle.png";
import Rectangle from "../../assets/rectangle.png";
import Pentagon from "../../assets/pentagon.png";
import Plus from "../../assets/plus.png";
import classes from "./UserMainPage.module.css";

class UserMainPage extends Component {
  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.mainWrapper}>
          <div className={classes.flexContainerRow}>
            <div className={classes.box} id={classes.yellow}>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Circle} alt="circle icon" className={classes.icon}/>
                  <div className={classes.headerContainer}>
                    <p>3 of the interesting / weird things you heard somebody say:</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.box} id={classes.orange}>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Triangle} alt="triangle icon" className={classes.icon}/>
                  <div className={classes.headerContainer}>
                    <p>3 of the interesting / weird things you saw:</p>
                  </div>
                </div>
                <div
                  className={`${classes.formGroupContainer} ${classes.marginBottom}`}
                >
                  <label htmlFor="seen1">1. </label>
                  <input
                    type="text"
                    name="seen1"
                    id="seen1"
                    onChange={this.handleInputChange}
                  ></input>
                </div>
                <div
                  className={`${classes.formGroupContainer} ${classes.marginBottom}`}
                >
                  <label htmlFor="seen2">2. </label>
                  <input
                    type="text"
                    name="seen2"
                    id="seen2"
                    onChange={this.handleInputChange}
                  ></input>
                </div>
                <div
                  className={`${classes.formGroupContainer} ${classes.marginBottom}`}
                >
                  <label htmlFor="seen3">3. </label>
                  <input
                    type="text"
                    name="seen3"
                    id="seen3"
                    onChange={this.handleInputChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className={classes.box} id={classes.red}>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Star} alt="star icon" className={classes.icon}/>
                  <div className={classes.headerContainer}>
                    <p>3 of the interesting / weird things you thought about:</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.flexContainerRow}>
            <div className={classes.box} id={classes.darkgreen}>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Rectangle} alt="rectangle icon" className={classes.icon}/>
                  <div className={classes.headerContainer}>
                    <p>3 words to describe today:</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.box} id={classes.blue}>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Pentagon} alt="pentagon icon" className={classes.icon}/>
                  <div className={classes.headerContainer}>
                    <p>1 new thing you learned or tried for the first time:</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.box} id={classes.purple}>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Plus} alt="plus icon" className={classes.icon}/>
                  <div className={classes.headerContainer}>
                    <p>1 thing you want to add:</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerText}>
            <p>Source code: </p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserMainPage;
