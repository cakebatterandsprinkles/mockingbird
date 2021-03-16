import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/mockingbird-logo.png";
import SettingsIcon from "../../assets/settingsicon.png";
import UserContext from "../../context/authContext.js";
import classes from "./NavbarUser.module.css";

class NavbarUser extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  reverseColor = () => {
    const page = document.body;
    const hc = document.querySelectorAll(".headingContainer");
    page.classList.toggle("dark-bg");
    const hcArray = Array.from(hc);
    hcArray.forEach((hc) => {
      hc.classList.toggle("light-border");
    });
  };

  logout = () => {
    return fetch("/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  render() {
    return (
      <div className={classes.mainFlexContainer}>
        <div className={classes.flexContainerRow}>
          <Link to="/today" className={classes.flexContainerRow}>
            <img src={Logo} alt="mockingbird logo" className={classes.bird} />
            <p className={classes.logoText}>Mockingbird</p>
          </Link>
        </div>
        <div className={classes.flexContainerRow}>
          <NavLink
            className={classes.navbarLink}
            to="/today"
            activeStyle={{
              borderBottom: "2px solid #aa82fe",
            }}
          >
            <p>Today</p>
          </NavLink>
          <NavLink
            className={classes.navbarLink}
            to="/calendar"
            activeStyle={{
              borderBottom: "2px solid #aa82fe",
            }}
          >
            <p>Calendar</p>
          </NavLink>
          <div className={classes.dropdown}>
            <img
              src={SettingsIcon}
              alt="settings icon"
              className={`${classes.settingsIcon} ${classes.dropbtn}`}
            />
            <div className={classes.dropdownContent}>
              <Link
                to="/settings"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <div
                  className={`${classes.linkContainer} ${classes.borderBottom}`}
                >
                  Settings
                </div>
              </Link>
              <div
                className={`${classes.linkContainer} ${classes.borderBottom}`}
                onClick={this.reverseColor}
              >
                <p>Change Mode</p>
              </div>
              <UserContext.Consumer>
                {(context) => (
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    onClick={() => {
                      this.logout();
                      context.setUserData(null);
                    }}
                  >
                    <div className={classes.linkContainer}>Logout</div>
                  </Link>
                )}
              </UserContext.Consumer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarUser;
