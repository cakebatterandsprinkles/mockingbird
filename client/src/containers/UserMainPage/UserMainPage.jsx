import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Circle from "../../assets/circle.png";
import Pentagon from "../../assets/pentagon.png";
import Plus from "../../assets/plus.png";
import Rectangle from "../../assets/rectangle.png";
import Star from "../../assets/star.png";
import Triangle from "../../assets/triangle.png";
import UserForm from "../../components/UserForm/UserForm";
import UserTextArea from "../../components/UserTextArea/UserTextArea";
import quotes from "../../data/quotes.json";
import { setDate } from "../../util/date";
import classes from "./UserMainPage.module.css";

const UserMainPage = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [footerText, setFooterText] = useState("");
  const [author, setAuthor] = useState("");
  const [isBigScreen, setIsBigScreen] = useState(true);
  const [formData, setFormData] = useState({ say1: "", say2: "", say3: "" });
  let history = useHistory();

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleWindowResize = () => {
    window.addEventListener("resize", (e) => {
      if (e.target.outerWidth >= 1200) {
        setIsBigScreen(true);
      } else {
        setIsBigScreen(false);
      }
    });
  };

  const handleFirstTextarea = () => {
    if (window.outerWidth >= 1200) {
      setIsBigScreen(true);
    } else {
      setIsBigScreen(false);
    }
  };

  const selectFooterText = (array) => {
    const randomNum = Math.floor(Math.random() * array.length);
    setFooterText(array[randomNum].quote);
    setAuthor(array[randomNum].author);
  };

  const addEntry = (entry, date) => {
    fetch("/today", {
      method: "POST",
      body: JSON.stringify({ entry: entry, date: date }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((blob) => blob.json())
      .then((response) => {
        console.log(response);
      });
  };

  const getEntries = () => {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    fetch(`/today?date=${todayString}`, { credentials: "include" })
      .then((blob) => blob.json())
      .then((response) => {
        setFormData({
          say1: response.heard[0],
          say2: response.heard[1],
          say3: response.heard[2],
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("You have successfully saved your new journal entry!");
    const today = new Date();
    const todayString = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    const entry = { heard: [formData.say1, formData.say2, formData.say3] };
    addEntry(entry, todayString);
    setTimeout(() => history.push("/calendar"), 2000);
  };

  useEffect(() => {
    const date = setDate();
    setCurrentDate(date);
    getEntries();
    handleWindowResize();
    handleFirstTextarea();
    selectFooterText(quotes);
  }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainWrapper}>
        <form onSubmit={handleSubmit}>
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
                  onInputChange={handleInputChange}
                  value={formData.say1}
                />
                <UserForm
                  name="say2"
                  content="☁ "
                  onInputChange={handleInputChange}
                  value={formData.say2}
                />{" "}
                <UserForm
                  name="say3"
                  content="☁ "
                  onInputChange={handleInputChange}
                  value={formData.say3}
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
                  onInputChange={handleInputChange}
                />
                <UserForm
                  name="seen2"
                  content="☁ "
                  onInputChange={handleInputChange}
                />{" "}
                <UserForm
                  name="seen3"
                  content="☁ "
                  onInputChange={handleInputChange}
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
                  onInputChange={handleInputChange}
                />
                <UserForm
                  name="thought2"
                  content="☁ "
                  onInputChange={handleInputChange}
                />{" "}
                <UserForm
                  name="thought3"
                  content="☁ "
                  onInputChange={handleInputChange}
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
                  onInputChange={handleInputChange}
                />
                <UserForm
                  name="word2"
                  content="☁ "
                  onInputChange={handleInputChange}
                />{" "}
                <UserForm
                  name="word  3"
                  content="☁ "
                  onInputChange={handleInputChange}
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
                  onInputChange={handleInputChange}
                  rows={isBigScreen ? 8 : 6}
                  cols={isBigScreen ? 50 : 170}
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
                  onInputChange={handleInputChange}
                  rows={isBigScreen ? 8 : 6}
                  cols={isBigScreen ? 50 : 170}
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
            <button className={classes.link}>(≧◡≦) Save</button>
          </div>
        </form>
      </div>
      <div className={classes.footer}>
        <div className={classes.footerText}>
          <p>
            {footerText}
            <span className={classes.footerAuthor}> - {author}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserMainPage;
