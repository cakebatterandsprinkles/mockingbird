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
      selectedHeard: [],
      selectedSaw: [],
      selectedThought: [],
      selectedToday: [],
      selectedNewExperience: "",
      selectedExtra: "",
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.getPrevMonth = this.getPrevMonth.bind(this);
    this.getNextMonth = this.getNextMonth.bind(this);
    this.renderDailyEntryIcons = this.renderDailyEntryIcons.bind(this);
  }

  fetchMonthlyEntries() {
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

  componentDidMount() {
    this.fetchMonthlyEntries();
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
    this.setState({
      drawerOpen: false,
      selectedHeard: [],
      selectedSaw: [],
      selectedThought: [],
      selectedToday: [],
      selectedNewExperience: "",
      selectedExtra: "",
    });
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
    this.setState(
      {
        month: newMonth,
        year: newYear,
        monthName: getMonthName(newMonth),
        monthlyEntries: [],
        selectedHeard: [],
        selectedSaw: [],
        selectedThought: [],
        selectedToday: [],
        selectedNewExperience: "",
        selectedExtra: "",
      },
      this.fetchMonthlyEntries
    );
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
    this.setState(
      {
        month: newMonth,
        year: newYear,
        monthName: getMonthName(newMonth),
        monthlyEntries: [],
        selectedHeard: [],
        selectedSaw: [],
        selectedThought: [],
        selectedToday: [],
        selectedNewExperience: "",
        selectedExtra: "",
      },
      this.fetchMonthlyEntries
    );
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
      dateArray.push({
        date: day,
        month: this.state.month,
        year: this.state.year,
      });
    }

    return (
      <Fragment>
        {dateArray.map(({ date, month, year }) => {
          return (
            <div
              className={
                date === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear()
                  ? classes.today
                  : classes.days
              }
              onClick={(e) => {
                this.toggleDrawer(e);
                this.renderDrawerContent(date);
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

  renderDrawerContent = (date) => {
    let entry = this.state.monthlyEntries.find((entry) => {
      return entry.date.substring(8, 10) === date.toString().padStart(2, "0");
    });
    if (entry) {
      this.setState({
        selectedHeard: entry.heard,
        selectedSaw: entry.saw,
        selectedThought: entry.thought,
        selectedToday: entry.words,
        selectedNewExperience: entry.newExperience,
        selectedExtra: entry.extra,
      });
    }
  };

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
      if (
        entry &&
        entry[title].length &&
        (typeof entry[title] === "string" || entry[title].some((item) => item))
      ) {
        return (
          <img
            src={icon}
            alt={`${title} icon`}
            className={classes.entryIcons}
            key={`${title}-${icon}`}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    const titles = [
      {
        title: "heard",
        subtitle: "3 of the interesting / weird things you heard somebody say:",
        icon: Circle,
        data: this.state.selectedHeard,
      },
      {
        title: "saw",
        subtitle: "3 of the interesting / weird things you saw:",
        icon: Triangle,
        data: this.state.selectedSaw,
      },
      {
        title: "thought",
        subtitle: "3 of the interesting / weird things you thought about:",
        icon: Star,
        data: this.state.selectedThought,
      },
      {
        title: "words",
        subtitle: "3 words to describe today:",
        icon: Rectangle,
        data: this.state.selectedToday,
      },
      {
        title: "newExperience",
        subtitle: "1 new thing you learned or tried for the first time:",
        icon: Pentagon,
        data: this.state.selectedNewExperience,
      },
      {
        title: "extra",
        subtitle: "1 thing you want to add:",
        icon: Plus,
        data: this.state.selectedExtra,
      },
    ];
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
              {titles.map((title, index) => {
                return (
                  <div
                    className={classes.sectionContainer}
                    key={`${title}-${index}`}
                  >
                    <div className={classes.wrapper}>
                      <img
                        src={title.icon}
                        alt={`${title.title} icon`}
                        className={classes.icon}
                      />
                      <div className={classes.headerContainer}>
                        <p>{title.subtitle}</p>
                      </div>
                    </div>
                    <div className={classes.entryContainer}>
                      {typeof title.data === "string" && !title.data ? (
                        <div className={classes.entry}>—</div>
                      ) : null}
                      {typeof title.data === "object" &&
                      [...new Set(title.data)].length <= 1 ? (
                        <div className={classes.entry}>—</div>
                      ) : null}
                      {typeof title.data === "string" || title.data == null
                        ? title.data
                        : Array.from(title.data)
                            .filter((item) => item)
                            .map((item, index) => (
                              <div
                                className={classes.entry}
                                key={`${item}-${index}`}
                              >{`𐡸 ${item}`}</div>
                            ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Drawer>
        </div>
      </Fragment>
    );
  }
}

export default Calendar;
