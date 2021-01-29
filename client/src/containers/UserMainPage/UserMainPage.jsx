import React, { Component } from "react";
import Circle from "../../assets/circle.png";
import Pentagon from "../../assets/pentagon.png";
import Plus from "../../assets/plus.png";
import Rectangle from "../../assets/rectangle.png";
import Star from "../../assets/star.png";
import Triangle from "../../assets/triangle.png";
import Button from "../../components/Button/Button";
import UserForm from "../../components/UserForm/UserForm";
import UserTextArea from "../../components/UserTextArea/UserTextArea";
import quotes from "../../data/quotes.json";
import classes from "./UserMainPage.module.css";

class UserMainPage extends Component {
  constructor() {
    super();
    this.state = {
      isBigScreen: true,
      isSmallScreen: false,
      footerText: "",
      author: "",
    };
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleFirstTextarea = this.handleFirstTextarea.bind(this);
  }

  handleWindowResize() {
    window.addEventListener("resize", (e) => {
      if (e.srcElement.outerWidth >= 1200) {
        this.setState({ isBigScreen: true });
      } else if (
        e.srcElement.outerWidth < 1200 &&
        e.srcElement.outerWidth > 600
      ) {
        this.setState({ isBigScreen: false });
      } else {
        this.setState({ isSmallScreen: true });
      }
    });
  }

  handleFirstTextarea() {
    if (window.outerWidth >= 1200) {
      this.setState({ isBigScreen: true });
    } else if (window.outerWidth < 1200 && window.outerWidth > 600) {
      this.setState({ isBigScreen: false });
    } else {
      this.setState({ isSmallScreen: true });
    }
  }

  selectFooterText(array) {
    const randomNum = Math.floor(Math.random() * array.length);
    this.setState({
      footerText: array[randomNum].quote,
      author: array[randomNum].author,
    });
    console.log(randomNum, array[randomNum]);
  }

  componentDidMount() {
    this.handleWindowResize();
    this.handleFirstTextarea();
    this.selectFooterText(quotes);
  }

  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.mainWrapper}>
          <div className={classes.flexContainerRow}>
            <div className={classes.box} id={classes.yellow}>
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
                <UserForm
                  name="say1"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />
                <UserForm
                  name="say2"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />{" "}
                <UserForm
                  name="say3"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className={classes.box} id={classes.orange}>
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
                <UserForm
                  name="seen1"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />
                <UserForm
                  name="seen2"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />{" "}
                <UserForm
                  name="seen3"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className={classes.box} id={classes.red}>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Star} alt="star icon" className={classes.icon} />
                  <div className={classes.headerContainer}>
                    <p>
                      3 of the interesting / weird things you thought about:
                    </p>
                  </div>
                </div>
                <UserForm
                  name="thought1"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />
                <UserForm
                  name="thought2"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />{" "}
                <UserForm
                  name="thought3"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.flexContainerRow}>
            <div className={classes.box} id={classes.darkgreen}>
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
                <UserForm
                  name="word1"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />
                <UserForm
                  name="word2"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />{" "}
                <UserForm
                  name="word  3"
                  content="☁ "
                  onInputChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className={classes.box} id={classes.blue}>
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
                <UserTextArea
                  name="word  3"
                  onInputChange={this.handleInputChange}
                  rows={this.state.isSmallScreen ? 6 : 8}
                  cols={this.state.isBigScreen ? 50 : 170}
                  style={classes.textarea}
                  content=""
                />
              </div>
            </div>
            <div className={classes.box} id={classes.purple}>
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Plus} alt="plus icon" className={classes.icon} />
                  <div className={classes.headerContainer}>
                    <p>1 thing you want to add:</p>
                  </div>
                </div>
                <UserTextArea
                  name="word  3"
                  onInputChange={this.handleInputChange}
                  rows={this.state.isSmallScreen ? 6 : 8}
                  cols={this.state.isBigScreen ? 50 : 170}
                  style={classes.textarea}
                  content=""
                />
              </div>
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <p className={classes.warningText}>
              ʕ•́ᴥ•̀ʔっ Don't forget to save!{" "}
            </p>
            <Button
              link="/calendar"
              name="(≧◡≦) Save"
              buttonStyle={classes.link}
            />
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerText}>
            <p>
              {this.state.footerText}
              <span className={classes.footerAuthor}>
                {" "}
                - {this.state.author}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserMainPage;
