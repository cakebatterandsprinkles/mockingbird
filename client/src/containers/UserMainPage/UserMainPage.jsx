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
import classes from "./UserMainPage.module.css";

const UserMainPage = () => {
  const [footerText, setFooterText] = useState("");
  const [author, setAuthor] = useState("");
  const [isBigScreen, setIsBigScreen] = useState(true);
  const [formData, setFormData] = useState(
    new Map([
      ["heard1", ""],
      ["heard2", ""],
      ["heard3", ""],
      ["saw1", ""],
      ["saw2", ""],
      ["saw3", ""],
      ["thought1", ""],
      ["thought2", ""],
      ["thought3", ""],
      ["words1", ""],
      ["words2", ""],
      ["words3", ""],
      ["newExperience", ""],
      ["extra", ""],
    ])
  );

  let history = useHistory();

  const handleInputChange = (e) => {
    setFormData(
      (prevFormData) =>
        new Map([...prevFormData.entries(), [e.target.name, e.target.value]])
    );
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
        setTimeout(() => history.push("/calendar"), 2000);
      });
  };

  const getEntries = () => {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    fetch(`/api/today?date=${todayString}`, { credentials: "include" })
      .then((blob) => blob.json())
      .then((response) => {
        if (response) {
          setFormData(
            new Map(
              Object.entries(response)
                .filter(
                  ([key, value]) =>
                    key !== "date" &&
                    (typeof value === "string" || Array.isArray(value))
                )
                .flatMap(([key, value]) => {
                  if (typeof value === "string") return [[key, value]];
                  else if (Array.isArray(value)) {
                    return value.map((item, index) => [
                      key + (index + 1),
                      item,
                    ]);
                  } else throw new Error("Unexpected value");
                })
            )
          );
        }
      });
  };

  const validateInput = () => {
    const formDataArr = Array.from(formData.values());
    for (const value of formData.values()) {
      if (
        value !== "" &&
        formDataArr.filter((item) => item === value).length > 1
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      toast.success("You have successfully saved your new journal entry!");
      const today = new Date();
      const todayString = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

      const entry = {
        heard: [
          formData.get("heard1"),
          formData.get("heard2"),
          formData.get("heard3"),
        ],
        saw: [formData.get("saw1"), formData.get("saw2"), formData.get("saw3")],
        thought: [
          formData.get("thought1"),
          formData.get("thought2"),
          formData.get("thought3"),
        ],
        words: [
          formData.get("words1"),
          formData.get("words2"),
          formData.get("words3"),
        ],
        extra: formData.get("extra"),
        newExperience: formData.get("newExperience"),
      };
      addEntry(entry, todayString);
    } else {
      toast.error("Journal entries have to be unique!");
    }
  };

  useEffect(() => {
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
            <div className={classes.box}>
              <div id={classes.yellow} className={classes.cardBackground} />
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
                <div>
                  <UserForm
                    name="heard1"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("heard1")}
                  />
                  <UserForm
                    name="heard2"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("heard2")}
                  />{" "}
                  <UserForm
                    name="heard3"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("heard3")}
                  />
                </div>
              </div>
            </div>
            <div className={classes.box}>
              <div id={classes.orange} className={classes.cardBackground} />
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
                <div>
                  <UserForm
                    name="saw1"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("saw1")}
                  />
                  <UserForm
                    name="saw2"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("saw2")}
                  />{" "}
                  <UserForm
                    name="saw3"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("saw3")}
                  />
                </div>
              </div>
            </div>
            <div className={classes.box}>
              <div id={classes.red} className={classes.cardBackground} />
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Star} alt="star icon" className={classes.icon} />
                  <div className={classes.headerContainer}>
                    <p>
                      3 of the interesting / weird things you thought about:
                    </p>
                  </div>
                </div>
                <div>
                  <UserForm
                    name="thought1"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("thought1")}
                  />
                  <UserForm
                    name="thought2"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("thought2")}
                  />{" "}
                  <UserForm
                    name="thought3"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("thought3")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.flexContainerRow}>
            <div className={classes.box}>
              <div id={classes.darkgreen} className={classes.cardBackground} />
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
                <div>
                  <UserForm
                    name="words1"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("words1")}
                  />
                  <UserForm
                    name="words2"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("words2")}
                  />{" "}
                  <UserForm
                    name="words3"
                    content="☁ "
                    onInputChange={handleInputChange}
                    value={formData.get("words3")}
                  />
                </div>
              </div>
            </div>
            <div className={classes.box}>
              <div id={classes.blue} className={classes.cardBackground} />
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
                  name="newExperience"
                  onInputChange={handleInputChange}
                  rows={isBigScreen ? 6 : 4}
                  cols={isBigScreen ? 50 : 170}
                  style={classes.textarea}
                  content=""
                  value={formData.get("newExperience")}
                />
              </div>
            </div>
            <div className={classes.box}>
              <div id={classes.purple} className={classes.cardBackground} />
              <div className={classes.sectionContainer}>
                <div className={classes.wrapper}>
                  <img src={Plus} alt="plus icon" className={classes.icon} />
                  <div className={classes.headerContainer}>
                    <p>1 thing you want to add:</p>
                  </div>
                </div>
                <UserTextArea
                  name="extra"
                  onInputChange={handleInputChange}
                  rows={isBigScreen ? 6 : 4}
                  cols={isBigScreen ? 50 : 170}
                  style={classes.textarea}
                  content=""
                  value={formData.get("extra")}
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
