import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/mockingbird-logo.png";
import { ReactComponent as Moon } from "../../assets/moon.svg";
import { ReactComponent as Sun } from "../../assets/sun.svg";
import Button from "../Button/Button";
import classes from "./NavbarLanding.module.css";

class NavbarLanding extends Component {
  constructor(props) {
    super();
    this.state = {
      lightMode: true,
    };
  }

  reverseColor = () => {
    this.state.lightMode
      ? this.setState({ lightMode: false })
      : this.setState({ lightMode: true });
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
            {this.state.lightMode ? (
              <Moon className={classes.modeIcon} />
            ) : (
              <Sun className={classes.modeIcon} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarLanding;
