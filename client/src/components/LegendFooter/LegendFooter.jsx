import React, { Component } from "react";
import Circle from "../../assets/circle.png";
import Star from "../../assets/star.png";
import Triangle from "../../assets/triangle.png";
import Rectangle from "../../assets/rectangle.png";
import Pentagon from "../../assets/pentagon.png";
import Plus from "../../assets/plus.png";
import classes from "./LegendFooter.module.css";

class LegendFooter extends Component {
  state = {
    currentPath: "",
  };

  getCurrentPath = () => {
    this.setState({ currentPath: window.location.pathname });
  };

  componentDidMount() {
    this.getCurrentPath();
  }

  render() {
    return (
      <div className={classes.footer}>
        <div className={classes.legendItem}>
          <img src={Circle} alt="circle" className={classes.icon}/>
          <p className={classes.footerText}>Said</p>
        </div>
        <div className={classes.legendItem}>
          <img src={Triangle} alt="triangle" className={classes.icon}/>
          <p className={classes.footerText}>Heard</p>
        </div>
        <div className={classes.legendItem}>
          <img src={Star} alt="star" className={classes.icon}/>
          <p className={classes.footerText}>Thought</p>
        </div>
        <div className={classes.legendItem}>
          <img src={Rectangle} alt="rectangle" className={classes.icon}/>
          <p className={classes.footerText}>Words</p>
        </div>
        <div className={classes.legendItem}>
          <img src={Pentagon} alt="pentagon" className={classes.icon}/>
          <p className={classes.footerText}>First Time</p>
        </div>
        <div className={classes.legendItem}>
          <img src={Plus} alt="plus shape" className={classes.icon}/>
          <p className={classes.footerText}>Add</p>
        </div>
      </div>
    );
  }
}

export default LegendFooter;
