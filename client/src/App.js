import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Error404 from "./components/404/404";
import LandingMain from "./components/LandingMain/LandingMain";
import NavbarLanding from "./components/NavbarLanding/NavbarLanding";
import NavbarUser from "./components/NavbarUser/NavbarUser";
import Calendar from "./containers/Calendar/Calendar";
import ConfirmEmail from "./containers/ConfirmEmail/ConfirmEmail";
import Login from "./containers/LoginForm/LoginForm";
import Reminders from "./containers/Reminders/Reminders";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Settings from "./containers/Settings/Settings";
import Signup from "./containers/SignUpForm/SignUpForm";
import UserMainPage from "./containers/UserMainPage/UserMainPage";
import UserContext from "./context/authContext";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [userChecked, setUserChecked] = useState(false);

  const isAuthenticated = userData !== null;

  useEffect(() => {
    fetch(`/me`, { credentials: "include" })
      .then((blob) => blob.json())
      .then((response) => {
        setUserData(response);
        setUserChecked(true);
      })
      .catch(() => {
        setUserChecked(true);
      });
  }, []);

  if (!userChecked) {
    return <div></div>;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        {isAuthenticated ? <NavbarUser /> : <NavbarLanding />}
        <Switch>
          <Route
            exact
            path="/"
            component={isAuthenticated ? UserMainPage : LandingMain}
          />
          <Route exact path="/signup" component={Signup} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/confirm" component={ConfirmEmail} />
          {isAuthenticated ? (
            <Route exact path="/calendar" component={Calendar} />
          ) : (
            <Redirect to="/login" />
          )}
          {isAuthenticated ? (
            <Route exact path="/today" component={UserMainPage} />
          ) : (
            <Redirect to="/login" />
          )}
          {isAuthenticated ? (
            <Route exact path="/reminders" component={Reminders} />
          ) : (
            <Redirect to="/login" />
          )}
          {isAuthenticated ? (
            <Route exact path="/settings" component={Settings} />
          ) : (
            <Redirect to="/login" />
          )}
          <Route path="/" component={Error404} />
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
