import axios from "axios";
import React, { Component, Fragment } from "react";
import Circle from "../../assets/circle.png";
import CloseButton from "../../assets/closeButton.png";
import Pentagon from "../../assets/pentagon.png";
import Plus from "../../assets/plus.png";
import Rectangle from "../../assets/rectangle.png";
import Star from "../../assets/star.png";
import Triangle from "../../assets/triangle.png";
import LegendFooter from "../../components/LegendFooter/LegendFooter";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getMonthName,
  setCurrentDay,
} from "../../util/date";
import Drawer from "../Drawer/Drawer";
import classes from "./Calendar.module.css";

class Calendar extends Component {
  constructor() {
    super();

    const today = new Date();
    const year = today.getFullYear();
    const month = getMonthName(today.getMonth());
    const day = new Date().getDate();

    this.state = {
      entered: true,
      drawerOpen: false,
      monthName: month,
      day: day,
      month: today.getMonth(),
      year: year,
      date: `${month} ${day}, ${year}`,
      monthlyEntries: [],
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.getPrevMonth = this.getPrevMonth.bind(this);
    this.getNextMonth = this.getNextMonth.bind(this);
    this.renderDailyEntryIcons = this.renderDailyEntryIcons.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `/calendar?year=${this.state.year}&month=${
          this.state.month + 1
        }&daysInMonth=${getDaysInMonth(this.state.month, this.state.year)}`
      )
      .then((res) => {
        this.setState({ monthlyEntries: [...res.data] });
      })
      .catch((err) => console.log(err));
  }

  toggleDrawer(e) {
    const day = e.target.innerText;
    this.setState({
      drawerOpen: !this.state.drawerOpen,
      date: `${this.state.monthName} ${day}, ${this.state.year}`,
      entered: !this.state.entered,
    });
  }
  closeDrawer() {
    this.setState({ drawerOpen: false });
  }

  getPrevMonth() {
    let newMonth = this.state.month - 1;
    let newYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear = this.state.year - 1;
    } else {
      newYear = this.state.year;
    }
    this.setState({
      month: newMonth,
      year: newYear,
      monthName: getMonthName(newMonth),
    });
  }

  getNextMonth() {
    let newMonth = this.state.month + 1;
    let newYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear = this.state.year + 1;
    } else {
      newYear = this.state.year;
    }
    this.setState({
      month: newMonth,
      year: newYear,
      monthName: getMonthName(newMonth),
    });
  }

  renderPadding() {
    const paddingArr = [];
    const paddingNum = getFirstDayOfMonth(this.state.month, this.state.year);
    for (let i = 0; i < paddingNum; i++) {
      paddingArr.push(i);
    }

    return (
      <Fragment>
        {paddingArr.map((padding) => {
          return <div key={padding}></div>;
        })}
      </Fragment>
    );
  }

  setStateCurrentDay = (date) => {
    this.setState({ currentDay: setCurrentDay(date) });
  };

  renderDays() {
    const daysInCurrentMonth = getDaysInMonth(
      this.state.month,
      this.state.year
    );

    const dateArray = [];

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      dateArray.push(day);
    }

    return (
      <Fragment>
        {dateArray.map((date) => {
          return (
            <div
              className={
                date !== new Date().getDate() ? classes.days : classes.today
              }
              onClick={(e) => {
                this.toggleDrawer(e);
              }}
              key={date}
            >
              <div className={classes.dateContainer}>{date}</div>
              <div className={classes.calendarIconsContainer}>
                {this.renderDailyEntryIcons(date)}
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  }

  renderCalendar() {
    return (
      <Fragment>
        {this.renderPadding()}
        {this.renderDays()}
      </Fragment>
    );
  }

  renderDailyEntryIcons = (date) => {
    const entry = this.state.monthlyEntries.find((item) => {
      return item.date.substring(8, 10) === date.toString().padStart(2, "0");
    });

    const titles = [
      { title: "heard", icon: Circle },
      { title: "saw", icon: Triangle },
      { title: "thought", icon: Star },
      { title: "words", icon: Rectangle },
      { title: "newExperience", icon: Pentagon },
      { title: "extra", icon: Plus },
    ];

    return titles.map(({ title, icon }) => {
      if (entry && entry[title].length) {
        return (
          <img
            src={icon}
            alt={`${title} icon`}
            className={classes.entryIcons}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <Fragment>
        <div className={classes.mainContainer}>
          <div className={classes.month}>
            <h2>
              <span onClick={this.getPrevMonth} className={classes.arrow}>
                ◀
              </span>{" "}
              {this.state.monthName}{" "}
              <span onClick={this.getNextMonth} className={classes.arrow}>
                ▶
              </span>
            </h2>
          </div>
          <h2 className={classes.year}>{this.state.year}</h2>
          <div className={classes.calendarContainer}>
            <div className={classes.weekday} id={classes.monday}>
              Monday
            </div>
            <div className={classes.weekday}>Tuesday</div>
            <div className={classes.weekday}>Wednesday</div>
            <div className={classes.weekday}>Thursday</div>
            <div className={classes.weekday}>Friday</div>
            <div className={`${classes.weekday} ${classes.saturday}`}>
              Saturday
            </div>
            <div className={`${classes.weekday} ${classes.sunday}`}>Sunday</div>
            {this.renderCalendar()}
          </div>
          <LegendFooter />
          <Drawer closeDrawer={this.closeDrawer} in={this.state.drawerOpen}>
            <img
              src={CloseButton}
              alt="closing button"
              className={classes.closebtn}
              onClick={this.closeDrawer}
            />
            <div className={classes.drawerContent}>
              <div className={classes.heading}>{this.state.date}</div>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img
                    src={Circle}
                    alt="circle icon"
                    className={classes.icon}
                  />
                  <div className={classes.headerContainer}>
                    <p>
                      3 of the interesting / weird things you heard somebody
                      say:
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img
                    src={Triangle}
                    alt="triangle icon"
                    className={classes.icon}
                  />
                  <div className={classes.headerContainer}>
                    <p>3 of the interesting / weird things you saw:</p>
                  </div>
                </div>
              </div>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Star} alt="star icon" className={classes.icon} />
                  <div className={classes.headerContainer}>
                    <p>
                      3 of the interesting / weird things you thought about:
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img
                    src={Rectangle}
                    alt="rectangle icon"
                    className={classes.icon}
                  />
                  <div className={classes.headerContainer}>
                    <p>3 words to describe today:</p>
                  </div>
                </div>
              </div>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img
                    src={Pentagon}
                    alt="pentagon icon"
                    className={classes.icon}
                  />
                  <div className={classes.headerContainer}>
                    <p>1 new thing you learned or tried for the first time:</p>
                  </div>
                </div>
              </div>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Plus} alt="plus icon" className={classes.icon} />
                  <div className={classes.headerContainer}>
                    <p>1 thing you want to add:</p>
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </Fragment>
    );
  }
}

export default Calendar;
