import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/mockingbird-logo.png";
import Button from "../Button/Button";
import classes from "./NavbarLanding.module.css";

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
        <Link to="/" className={classes.flexContainerRow}>
          <img src={Logo} alt="mockingbird logo" className={classes.bird} />
          <p className={classes.logoText}>Mockingbird</p>
        </Link>
        <div className={classes.flexContainerRowRight}>
          <Button name="Sign Up" link="/signup" buttonStyle={classes.link} />
          <Button name="Login" link="/login" buttonStyle={classes.link} />
          <div className={classes.changeColorBtn} onClick={this.reverseColor}>
            <p>◐</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarLanding;
