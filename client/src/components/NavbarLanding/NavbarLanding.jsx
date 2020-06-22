import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./NavbarLanding.module.css";
import Logo from "../../assets/mockingbird-logo.png";
import Button from "../Button/Button";

class NavbarLanding extends Component {
  reverseColor = () => {
    const page = document.body;
    const hc = document.querySelectorAll(".headingContainer");
    page.classList.toggle("dark-bg");
    const hcArray = Array.from(hc);
    console.log(hc, hcArray);
    hcArray.forEach((hc) => {
      hc.classList.toggle("light-border");
    });
  };
  render() {
    return (
      <div className={classes.flexContainerRow}>
        <Link 
          to="/"
          exact 
          className={classes.flexContainerRow}>
            <img src={Logo} alt="mockingbird logo" className={classes.bird} />
            <p className={classes.logoText}>Mockingbird</p>
        </Link>
        <div className={classes.flexContainerRowRight}>
          <Button name="Sign Up" link="/signup" />
          <Button name="Login" link="/login" />
          <div className={classes.changeColorBtn} onClick={this.reverseColor}>
            <p>◐</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarLanding;
