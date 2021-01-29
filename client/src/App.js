import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Error404 from "./components/404/404";
import LandingMain from "./components/LandingMain/LandingMain";
import NavbarUser from "./components/NavbarUser/NavbarUser";
import Calendar from "./containers/Calendar/Calendar";
import ConfirmEmail from "./containers/ConfirmEmail/ConfirmEmail";
import Login from "./containers/LoginForm/LoginForm";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Settings from "./containers/Settings/Settings";
import Signup from "./containers/SignUpForm/SignUpForm";
import UserMainPage from "./containers/UserMainPage/UserMainPage";
import UserContext from "./context/authContext";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsAuthenticated(true);
    }
  }, [userData]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        {/* {isAuthenticated ? <NavbarUser /> : <NavbarLanding />} */}
        <NavbarUser />
        <Switch>
          <Route
            exact
            path="/"
            component={isAuthenticated ? UserMainPage : LandingMain}
          />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/today" component={UserMainPage} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/confirm" component={ConfirmEmail} />
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
