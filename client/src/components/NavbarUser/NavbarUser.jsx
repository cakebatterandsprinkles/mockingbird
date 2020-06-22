import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./NavbarUser.module.css";
import SettingsIcon from "../../assets/settingsicon.png";
import Logo from "../../assets/mockingbird-logo.png";

class NavbarUser extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div className={classes.mainFlexContainer}>
        <div className={classes.flexContainerRow}>
         <Link 
          to="/"
          exact 
          className={classes.flexContainerRow}>
            <img src={Logo} alt="mockingbird logo" className={classes.bird} />
            <p className={classes.logoText}>Mockingbird</p>
        </Link>
        </div>
        <div className={classes.flexContainerRow}>
          <NavLink 
            className={classes.navbarLink} 
            to="/today" 
            activeStyle={{
              backgroundColor: '#e7e7e7',
              borderRadius: '5px',
              borderBottom: '1px solid #aa82fe'
            }}>
            <p>Today</p>
          </NavLink>
          <NavLink 
            className={classes.navbarLink} 
            to="/calendar"
            activeStyle={{
              backgroundColor: '#e7e7e7',
              borderRadius: '5px',
              borderBottom: '1px solid #aa82fe'
            }}>
            <p>Calendar</p>
          </NavLink>
          <div className={classes.dropdown}>
            <img
              src={SettingsIcon}
              alt="settings icon"
              className={`${classes.settingsIcon} ${classes.dropbtn}`}
            />
            <div className={classes.dropdownContent}>
              <div className={classes.linkContainer}>
                <Link
                  to="/settings"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Settings
                </Link>
              </div>
              <div
                className={classes.linkContainer}
                onClick={this.reverseColor}
              >
                <p>Change Mode</p>
              </div>
              <div className={classes.linkContainerBottom}>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={this.logout}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarUser;
